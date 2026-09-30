/**
 * Orders / Checkout Routes - BioStorefront API (PostgreSQL backed)
 * Handles checkout initiation, payment simulation, order confirmation, and real-time inventory broadcast.
 */

const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const {
  getProductById,
  decrementStock,
  createOrder,
  getAllOrders,
  getOrderById,
  trackEvent,
} = require('../db/store');

let broadcast = null;
function setBroadcast(fn) {
  broadcast = fn;
}

function notifyClients(type, data) {
  if (broadcast) {
    try {
      broadcast(JSON.stringify({ type, data, timestamp: new Date().toISOString() }));
    } catch (err) {
      console.error('[WS Notify Error]', err);
    }
  }
}

// Duplicate order prevention: track pending payment sessions in-memory
const pendingPayments = new Map(); // sessionId -> { productId, quantity, amount, expiresAt }

// POST /api/orders/initiate - initiate checkout & create payment session
router.post('/initiate', async function(req, res) {
  try {
    const { productId, quantity } = req.body;
    if (!productId) {
      return res.status(400).json({ success: false, error: 'productId is required' });
    }

    const qty = parseInt(quantity, 10) || 1;
    const product = await getProductById(productId);

    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    if (product.stock < qty) {
      return res.status(409).json({
        success: false,
        error: product.stock === 0 ? 'Product is out of stock' : 'Insufficient stock available',
        availableStock: product.stock,
      });
    }

    // Create a payment session (expires in 10 minutes)
    const sessionId = uuidv4();
    pendingPayments.set(sessionId, {
      productId,
      quantity: qty,
      amount: product.price * qty,
      expiresAt: Date.now() + 10 * 60 * 1000,
    });

    await trackEvent('checkout_started');

    return res.json({
      success: true,
      data: {
        sessionId,
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
        },
        amount: product.price * qty,
        quantity: qty,
        paymentMode: 'SANDBOX_DEMO',
        message: 'Payment session created. Use demo payment flow.',
      },
    });
  } catch (err) {
    console.error('[Orders /initiate]', err);
    return res.status(500).json({ success: false, error: 'Failed to initiate checkout' });
  }
});

// POST /api/orders/confirm - confirm order after payment with atomic inventory decrement
router.post('/confirm', async function(req, res) {
  try {
    const {
      sessionId,
      customerName,
      customerPhone,
      address,
      paymentMethod,
      paymentId,
    } = req.body;

    // Validate required fields
    if (!customerName || !customerPhone || !address || !paymentMethod) {
      return res.status(400).json({
        success: false,
        error: 'customerName, customerPhone, address, paymentMethod are required',
      });
    }

    // Validate or create session
    let session = null;
    let productId = req.body.productId;
    let quantity = parseInt(req.body.quantity, 10) || 1;
    let amount = req.body.amount;

    if (sessionId && pendingPayments.has(sessionId)) {
      session = pendingPayments.get(sessionId);

      // Check session expiry
      if (Date.now() > session.expiresAt) {
        pendingPayments.delete(sessionId);
        return res.status(410).json({ success: false, error: 'Payment session expired. Please restart checkout.' });
      }

      productId = session.productId;
      quantity = session.quantity;
      amount = session.amount;
    }

    if (!productId) {
      return res.status(400).json({ success: false, error: 'productId is required' });
    }

    const product = await getProductById(productId);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    // Atomically decrement stock in PostgreSQL using row-level locking (ACID)
    const stockResult = await decrementStock(productId, quantity);
    if (!stockResult.success) {
      if (session) pendingPayments.delete(sessionId);
      return res.status(409).json({
        success: false,
        error: 'Product went out of stock. Cannot complete order.',
      });
    }

    // Create order in PostgreSQL
    const order = await createOrder({
      productId,
      productName: product.name,
      amount: amount || product.price * quantity,
      quantity,
      customerName,
      customerPhone,
      address,
      paymentMethod,
      paymentId: paymentId || ('DEMO_' + uuidv4().slice(0, 12).toUpperCase()),
    });

    // Cleanup session
    if (session) pendingPayments.delete(sessionId);

    // Broadcast real-time stock update to all connected clients
    notifyClients('STOCK_UPDATE', {
      productId,
      stock: stockResult.newStock,
      source: 'order_checkout',
      productName: product.name,
      orderId: order.id,
    });

    // Broadcast order confirmed notice
    notifyClients('ORDER_CONFIRMED', {
      orderId: order.id,
      productName: order.productName,
      customerName: order.customerName,
      message: `New order #${order.id} placed for ${order.productName}`,
    });

    return res.status(201).json({
      success: true,
      data: {
        orderId: order.id,
        paymentId: order.paymentId,
        productName: order.productName,
        amount: order.amount,
        status: order.status,
        remainingStock: stockResult.newStock,
        message: 'Order confirmed! Inventory updated.',
      },
    });
  } catch (err) {
    console.error('[Orders /confirm]', err);
    return res.status(500).json({ success: false, error: 'Failed to confirm order' });
  }
});

// GET /api/orders - list all orders (admin)
router.get('/', async function(req, res) {
  try {
    const orders = await getAllOrders();
    return res.json({ success: true, data: orders, count: orders.length });
  } catch (err) {
    console.error('[Orders GET]', err);
    return res.status(500).json({ success: false, error: 'Failed to fetch orders' });
  }
});

// GET /api/orders/:id - single order
router.get('/:id', async function(req, res) {
  try {
    const order = await getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }
    return res.json({ success: true, data: order });
  } catch (err) {
    console.error('[Orders GET/:id]', err);
    return res.status(500).json({ success: false, error: 'Failed to fetch order' });
  }
});

module.exports = router;
module.exports.setBroadcast = setBroadcast;
