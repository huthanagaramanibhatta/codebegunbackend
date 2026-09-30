/**
 * Product Routes - BioStorefront API (PostgreSQL backed)
 */

const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  setStock,
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

// GET /api/products - list all products with filtering & search
router.get('/', async function(req, res) {
  try {
    const { category, search, featured } = req.query;
    const prods = await getAllProducts({ category, search, featured });

    // Track general storefront visitor count
    await trackEvent('visitor');

    return res.json({ success: true, data: prods, count: prods.length });
  } catch (err) {
    console.error('[Products GET]', err);
    return res.status(500).json({ success: false, error: 'Failed to fetch products' });
  }
});

// GET /api/products/:id - single product
router.get('/:id', async function(req, res) {
  try {
    const product = await getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    await trackEvent('product_view', req.params.id);
    return res.json({ success: true, data: product });
  } catch (err) {
    console.error('[Products GET/:id]', err);
    return res.status(500).json({ success: false, error: 'Failed to fetch product' });
  }
});

// POST /api/products - add product (admin)
router.post('/', async function(req, res) {
  try {
    const { name, price, stock, category } = req.body;
    if (!name || price === undefined || stock === undefined || !category) {
      return res.status(400).json({ success: false, error: 'name, price, stock, category are required' });
    }
    const product = await addProduct(req.body);
    return res.status(201).json({ success: true, data: product });
  } catch (err) {
    console.error('[Products POST]', err);
    return res.status(500).json({ success: false, error: 'Failed to add product' });
  }
});

// PUT /api/products/:id - update product (admin)
router.put('/:id', async function(req, res) {
  try {
    const product = await updateProduct(req.params.id, req.body);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    // Broadcast stock update if stock changed
    if (req.body.stock !== undefined) {
      notifyClients('STOCK_UPDATE', {
        productId: product.id,
        stock: product.stock,
        source: 'admin_edit',
        productName: product.name,
      });
    }

    return res.json({ success: true, data: product });
  } catch (err) {
    console.error('[Products PUT]', err);
    return res.status(500).json({ success: false, error: 'Failed to update product' });
  }
});

// DELETE /api/products/:id - delete product (admin)
router.delete('/:id', async function(req, res) {
  try {
    const deleted = await deleteProduct(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    return res.json({ success: true, message: 'Product deleted' });
  } catch (err) {
    console.error('[Products DELETE]', err);
    return res.status(500).json({ success: false, error: 'Failed to delete product' });
  }
});

// PATCH /api/products/:id/stock - update stock (admin)
router.patch('/:id/stock', async function(req, res) {
  try {
    const { stock } = req.body;
    if (stock === undefined || stock === null || isNaN(stock)) {
      return res.status(400).json({ success: false, error: 'stock value required' });
    }
    const result = await setStock(req.params.id, parseInt(stock, 10));
    if (!result.success) {
      return res.status(404).json({ success: false, error: result.reason });
    }

    // Broadcast stock change to all active WebSocket clients
    notifyClients('STOCK_UPDATE', {
      productId: req.params.id,
      stock: result.newStock,
      source: 'admin_patch',
      productName: result.product ? result.product.name : req.params.id,
    });

    return res.json({ success: true, data: { productId: req.params.id, stock: result.newStock } });
  } catch (err) {
    console.error('[Products PATCH stock]', err);
    return res.status(500).json({ success: false, error: 'Failed to update stock' });
  }
});

// POST /api/products/:id/track - track product event
router.post('/:id/track', async function(req, res) {
  try {
    const { event } = req.body;
    if (event) {
      await trackEvent(event, req.params.id);
    }
    return res.json({ success: true });
  } catch (err) {
    return res.json({ success: false });
  }
});

module.exports = router;
module.exports.setBroadcast = setBroadcast;
