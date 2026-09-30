/**
 * BioStorefront Backend Server
 * Express + WebSocket server with PostgreSQL (biodata) integration & real-time inventory sync.
 *
 * PORT: 4000
 */

require('dotenv').config();

const express = require('express');
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const WebSocket = require('ws');

const { initDb, pool } = require('./db/postgres');
const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');
const webhooksRouter = require('./routes/webhooks');
const analyticsRouter = require('./routes/analytics');
const storeRouter = require('./routes/store');
const authRouter = require('./routes/auth');

const app = express();
const server = http.createServer(app);

// ─── WebSocket Server ────────────────────────────────────────────────────────

const wss = new WebSocket.Server({ server });
const clients = new Set();

wss.on('connection', function(ws) {
  clients.add(ws);
  console.log('[WS] Client connected. Total:', clients.size);

  ws.send(JSON.stringify({
    type: 'CONNECTED',
    data: { message: 'Connected to BioStorefront real-time sync (PostgreSQL: biodata)' },
    timestamp: new Date().toISOString(),
  }));

  ws.on('close', function() {
    clients.delete(ws);
    console.log('[WS] Client disconnected. Total:', clients.size);
  });

  ws.on('error', function(err) {
    console.error('[WS] Error:', err.message);
    clients.delete(ws);
  });
});

function broadcast(message) {
  clients.forEach(function(client) {
    if (client.readyState === WebSocket.OPEN) {
      try {
        client.send(message);
      } catch (err) {
        console.error('[WS] Broadcast error:', err.message);
      }
    }
  });
}

// Inject broadcast into routers for real-time inventory sync
if (webhooksRouter.setBroadcast) webhooksRouter.setBroadcast(broadcast);
if (ordersRouter.setBroadcast) ordersRouter.setBroadcast(broadcast);
if (productsRouter.setBroadcast) productsRouter.setBroadcast(broadcast);

// ─── Middleware ───────────────────────────────────────────────────────────────

app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
  'https://biostorefront.vercel.app',
];

if (process.env.CLIENT_URL && !allowedOrigins.includes(process.env.CLIENT_URL)) {
  allowedOrigins.push(process.env.CLIENT_URL);
}

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Shopify-Topic', 'X-Shopify-Hmac-Sha256', 'X-WC-Webhook-Topic'],
  credentials: true,
}));

app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ─── Routes ───────────────────────────────────────────────────────────────────

app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/webhooks', webhooksRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/store', storeRouter);
app.use('/api/auth', authRouter);

// Health check endpoint with PostgreSQL diagnostics
app.get(['/health', '/api/health'], async function(req, res) {
  let dbStatus = 'disconnected';
  let dbError = null;
  try {
    const dbRes = await pool.query('SELECT current_database(), NOW()');
    if (dbRes.rows.length > 0) {
      dbStatus = 'connected (' + dbRes.rows[0].current_database + ')';
    }
  } catch (err) {
    dbError = err.message;
  }

  return res.json({
    status: 'healthy',
    service: 'BioStorefront API',
    database: dbStatus,
    dbError: dbError,
    timestamp: new Date().toISOString(),
    wsClients: clients.size,
    uptime: process.uptime(),
  });
});

// 404 handler
app.use(function(req, res) {
  return res.status(404).json({ success: false, error: 'Route not found' });
});

// Error handler
app.use(function(err, req, res, next) {
  console.error('[Error]', err);
  return res.status(500).json({ success: false, error: err.message || 'Internal server error' });
});

// ─── Start Server & Initialize Database ───────────────────────────────────────

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    // Auto-create PostgreSQL tables and seed catalog data if empty
    await initDb();
    console.log('[PostgreSQL] Database tables initialized and verified.');
  } catch (err) {
    console.error('[PostgreSQL] Warning: DB initialization failed. Check credentials in .env:', err.message);
  }

  server.on('error', function(err) {
    if (err.code === 'EADDRINUSE') {
      console.error(`\n[Server Error] Port ${PORT} is already in use by another process.`);
      console.error(`To free port ${PORT} on Windows PowerShell, run:`);
      console.error(`  Stop-Process -Id (Get-NetTCPConnection -LocalPort ${PORT}).OwningProcess -Force\n`);
      process.exit(1);
    } else {
      console.error('[Server Error]', err);
    }
  });

  server.listen(PORT, function() {
    console.log('');
    console.log('╔════════════════════════════════════════════════════════════╗');
    console.log('║               BioStorefront API Server                     ║');
    console.log('╠════════════════════════════════════════════════════════════╣');
    console.log('║  HTTP API  →  http://localhost:' + PORT + '                       ║');
    console.log('║  WebSocket →  ws://localhost:' + PORT + '                         ║');
    console.log('║  Database  →  PostgreSQL (database: ' + (process.env.DB_NAME || 'biodata') + ')       ║');
    console.log('║  Mode      →  LIVE DATABASE                              ║');
    console.log('╚════════════════════════════════════════════════════════════╝');
    console.log('');
  });
}

start();

module.exports = { app, server, broadcast };
