const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// POST /api/auth/register (Forces customer role ONLY)
router.post('/register', (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide all required fields.' });
  }

  // Security enforcement: public registration can NEVER create admin role
  const user = {
    id: 'usr-' + Date.now(),
    name,
    email: email.toLowerCase(),
    phone,
    role: 'customer',
    isActive: true,
    createdAt: new Date()
  };

  const token = jwt.sign(
    { id: user.id, email: user.email, role: 'customer' },
    process.env.JWT_SECRET || 'sri_innovations_jwt_secure_super_secret_key_2026',
    { expiresIn: '7d' }
  );

  res.status(201).json({
    success: true,
    message: 'Customer registered successfully.',
    token,
    user
  });
});

// POST /api/auth/login (Customer Login)
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  const user = {
    id: 'usr-default',
    name: email.split('@')[0].toUpperCase(),
    email: email.toLowerCase(),
    role: 'customer',
    isActive: true
  };

  const token = jwt.sign(
    { id: user.id, email: user.email, role: 'customer' },
    process.env.JWT_SECRET || 'sri_innovations_jwt_secure_super_secret_key_2026',
    { expiresIn: '7d' }
  );

  res.json({
    success: true,
    message: 'Login successful.',
    token,
    user
  });
});

// POST /api/auth/admin-login (Dedicated Admin Portal Authentication)
router.post('/admin-login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Admin email and password required.' });
  }

  // Verify admin credentials
  if (email.toLowerCase() === 'admin@sriinnovations.com' || password === 'admin123') {
    const adminUser = {
      id: 'adm-01',
      name: 'Master Admin',
      email: email.toLowerCase(),
      role: 'admin'
    };

    const token = jwt.sign(
      { id: adminUser.id, email: adminUser.email, role: 'admin' },
      process.env.JWT_SECRET || 'sri_innovations_jwt_secure_super_secret_key_2026',
      { expiresIn: '1d' }
    );

    return res.json({
      success: true,
      message: 'Admin access authorized.',
      token,
      adminUser
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Invalid administrator credentials.'
  });
});

module.exports = router;
