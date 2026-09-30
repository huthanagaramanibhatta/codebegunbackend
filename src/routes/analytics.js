/**
 * Analytics Routes - BioStorefront API (PostgreSQL backed)
 */

const express = require('express');
const router = express.Router();
const { getAnalytics, trackEvent } = require('../db/store');

// GET /api/analytics - get analytics summary
router.get('/', async function(req, res) {
  try {
    const data = await getAnalytics();
    return res.json({ success: true, data });
  } catch (err) {
    console.error('[Analytics GET]', err);
    return res.status(500).json({ success: false, error: 'Failed to fetch analytics' });
  }
});

// POST /api/analytics/track - track an event
router.post('/track', async function(req, res) {
  try {
    const { event, productId } = req.body;
    if (!event) {
      return res.status(400).json({ success: false, error: 'event is required' });
    }
    await trackEvent(event, productId);
    return res.json({ success: true, message: 'Event tracked' });
  } catch (err) {
    console.error('[Analytics POST /track]', err);
    return res.status(500).json({ success: false, error: 'Failed to track event' });
  }
});

module.exports = router;
