/**
 * Authentication Routes - BioStorefront API (PostgreSQL backed)
 */

const express = require('express');
const router = express.Router();
const { registerUser, authenticateUser } = require('../db/store');

// POST /api/auth/register - create new user account
router.post('/register', async function(req, res) {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, error: 'Full name, email, and password are required' });
    }

    if (password.length < 4) {
      return res.status(400).json({ success: false, error: 'Password must be at least 4 characters long' });
    }

    const user = await registerUser({ name, email, password, role });
    return res.status(201).json({
      success: true,
      message: 'Account created successfully! Please sign in with your email and password.',
      user,
    });
  } catch (err) {
    console.error('[Auth Register Error]', err.message);
    return res.status(400).json({ success: false, error: err.message || 'Registration failed' });
  }
});

// POST /api/auth/login - verify credentials and sign in
router.post('/login', async function(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required' });
    }

    const user = await authenticateUser(email, password);
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    return res.json({
      success: true,
      message: 'Signed in successfully',
      user,
    });
  } catch (err) {
    console.error('[Auth Login Error]', err.message);
    return res.status(500).json({ success: false, error: 'Login authentication failed' });
  }
});

module.exports = router;
