/**
 * Store Profile Route - BioStorefront API (PostgreSQL backed)
 */

const express = require('express');
const router = express.Router();
const { getStoreProfile, updateStoreProfile } = require('../db/store');

// GET /api/store - get store profile
router.get('/', async function(req, res) {
  try {
    const profile = await getStoreProfile();
    return res.json({ success: true, data: profile });
  } catch (err) {
    console.error('[Store GET]', err);
    return res.status(500).json({ success: false, error: 'Failed to fetch store profile' });
  }
});

// PUT /api/store - update store profile (admin)
router.put('/', async function(req, res) {
  try {
    const updated = await updateStoreProfile(req.body);
    return res.json({ success: true, data: updated, message: 'Store profile updated' });
  } catch (err) {
    console.error('[Store PUT]', err);
    return res.status(500).json({ success: false, error: 'Failed to update store profile' });
  }
});

module.exports = router;
