/**
 * Webhook Routes - BioStorefront API (PostgreSQL backed)
 * Simulates Shopify / WooCommerce webhook receivers and internal admin simulator.
 */

const express = require('express');
const router = express.Router();
const { setStock, getProductById, updateProduct } = require('../db/store');

// WebSocket broadcast function (injected from main server)
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

// ─── SHOPIFY WEBHOOK ─────────────────────────────────────────────────────────

router.post('/shopify', async function(req, res) {
  try {
    const topic = req.headers['x-shopify-topic'] || 'inventory_levels/update';
    const body = req.body;

    console.log('[Webhook Shopify]', topic, JSON.stringify(body).slice(0, 200));

    // Handle inventory update
    if (topic === 'inventory_levels/update' || topic === 'products/update') {
      const productId = body.productId || body.product_id;
      const newStock = body.available !== undefined ? body.available : body.stock;

      if (productId && newStock !== undefined) {
        const result = await setStock(productId, parseInt(newStock, 10));
        if (result.success) {
          const product = await getProductById(productId);
          notifyClients('STOCK_UPDATE', {
            productId,
            stock: result.newStock,
            source: 'shopify',
            productName: product ? product.name : productId,
          });
          return res.json({
            success: true,
            message: 'Inventory updated from Shopify webhook in PostgreSQL',
            productId,
            newStock: result.newStock,
          });
        }
      }
    }

    // Acknowledge other webhook types
    return res.json({ success: true, message: 'Webhook received', topic });
  } catch (err) {
    console.error('[Webhook Shopify]', err);
    return res.status(500).json({ success: false, error: 'Webhook processing failed' });
  }
});

// ─── WOOCOMMERCE WEBHOOK ──────────────────────────────────────────────────────

router.post('/woocommerce', async function(req, res) {
  try {
    const topic = req.headers['x-wc-webhook-topic'] || 'product.updated';
    const body = req.body;

    console.log('[Webhook WooCommerce]', topic, JSON.stringify(body).slice(0, 200));

    if (topic === 'product.updated' || topic === 'product.created') {
      const productId = body.productId || body.id;
      const newStock = body.stock_quantity !== undefined ? body.stock_quantity : body.stock;

      if (productId && newStock !== undefined) {
        const result = await setStock(productId, parseInt(newStock, 10));
        if (result.success) {
          const product = await getProductById(productId);
          notifyClients('STOCK_UPDATE', {
            productId,
            stock: result.newStock,
            source: 'woocommerce',
            productName: product ? product.name : productId,
          });
          return res.json({
            success: true,
            message: 'Inventory updated from WooCommerce webhook in PostgreSQL',
            productId,
            newStock: result.newStock,
          });
        }
      }
    }

    return res.json({ success: true, message: 'Webhook received', topic });
  } catch (err) {
    console.error('[Webhook WooCommerce]', err);
    return res.status(500).json({ success: false, error: 'Webhook processing failed' });
  }
});

// ─── INTERNAL WEBHOOK SIMULATOR ──────────────────────────────────────────────

router.post('/simulate', async function(req, res) {
  try {
    const { productId, stock, source, productName, productUpdates } = req.body;

    if (!productId) {
      return res.status(400).json({ success: false, error: 'productId is required' });
    }

    // Update product fields if provided
    if (productUpdates && typeof productUpdates === 'object') {
      await updateProduct(productId, productUpdates);
    }

    // Update stock if provided
    let stockResult = { success: true, newStock: null };
    if (stock !== undefined && stock !== null) {
      stockResult = await setStock(productId, parseInt(stock, 10));
      if (!stockResult.success) {
        return res.status(404).json({ success: false, error: stockResult.reason });
      }
    }

    const product = await getProductById(productId);
    const payload = {
      productId,
      stock: stockResult.newStock !== null ? stockResult.newStock : (product ? product.stock : null),
      source: source || 'simulator',
      productName: productName || (product ? product.name : productId),
    };

    notifyClients('STOCK_UPDATE', payload);

    console.log('[Webhook Simulator]', payload);

    return res.json({
      success: true,
      message: 'Webhook simulated successfully',
      data: payload,
    });
  } catch (err) {
    console.error('[Webhook Simulate]', err);
    return res.status(500).json({ success: false, error: 'Simulation failed' });
  }
});

module.exports = router;
module.exports.setBroadcast = setBroadcast;
