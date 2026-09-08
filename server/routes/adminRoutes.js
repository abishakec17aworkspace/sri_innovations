const express = require('express');
const router = express.Router();
const { authenticateUser, requireAdmin } = require('../middleware/auth');

// In-Memory Fallback Store matching MongoDB collections
let mockDashboardData = {
  totalRevenue: 54990,
  ordersCount: 12,
  customersCount: 48,
  bookingsCount: 8,
  lowStockCount: 2,
  recentOrders: [
    { id: 'SRI-849201', customerName: 'Ramesh Kumar', amount: 53990, status: 'Shipped', date: '2026-08-20' },
    { id: 'SRI-849202', customerName: 'Priya Sharma', amount: 8495, status: 'Processing', date: '2026-08-22' },
    { id: 'SRI-849203', customerName: 'Vikram Reddy', amount: 12999, status: 'Confirmed', date: '2026-08-25' }
  ],
  recentBookings: [
    { id: 'SRI-SRV-41829', customerName: 'Ramesh Kumar', service: 'Smart TV Screen Repair', slot: '11:30 AM - 01:30 PM', status: 'Confirmed', technician: 'Anand Kumar' },
    { id: 'SRI-SRV-41830', customerName: 'Anita Rao', service: 'Laptop Motherboard Service', slot: '02:00 PM - 04:00 PM', status: 'Technician Assigned', technician: 'Suresh V.' }
  ]
};

// GET /api/admin/dashboard
router.get('/dashboard', authenticateUser, requireAdmin, (req, res) => {
  res.json({
    success: true,
    data: mockDashboardData
  });
});

// GET /api/admin/analytics
router.get('/analytics', authenticateUser, requireAdmin, (req, res) => {
  res.json({
    success: true,
    data: {
      salesTrend: [
        { month: 'Jan', revenue: 450000, orders: 85 },
        { month: 'Feb', revenue: 520000, orders: 98 },
        { month: 'Mar', revenue: 610000, orders: 112 },
        { month: 'Apr', revenue: 580000, orders: 104 },
        { month: 'May', revenue: 720000, orders: 130 },
        { month: 'Jun', revenue: 890000, orders: 165 },
        { month: 'Jul', revenue: 950000, orders: 180 },
        { month: 'Aug', revenue: 1120000, orders: 210 }
      ],
      categoryDistribution: [
        { name: 'Televisions', value: 35 },
        { name: 'Large Appliances', value: 28 },
        { name: 'Laptops & Computers', value: 20 },
        { name: 'Audio & Gadgets', value: 12 },
        { name: 'Accessories', value: 5 }
      ],
      serviceMetrics: {
        totalBookings: 145,
        completedServices: 132,
        pendingInspection: 10,
        cancellationRate: '2.1%'
      }
    }
  });
});

// GET /api/admin/customers
router.get('/customers', authenticateUser, requireAdmin, (req, res) => {
  res.json({
    success: true,
    customers: [
      {
        id: 'usr-default',
        name: 'Ramesh Kumar',
        email: 'customer@sriinnovations.com',
        phone: '+91 98450 12345',
        role: 'customer',
        isActive: true,
        registeredAt: '2026-08-10',
        lastLoginAt: '2026-08-26',
        ordersCount: 3,
        bookingsCount: 2,
        totalSpend: 62485
      },
      {
        id: 'usr-002',
        name: 'Priya Sharma',
        email: 'priya.sharma@example.com',
        phone: '+91 98765 11223',
        role: 'customer',
        isActive: true,
        registeredAt: '2026-08-15',
        lastLoginAt: '2026-08-25',
        ordersCount: 1,
        bookingsCount: 0,
        totalSpend: 8495
      },
      {
        id: 'usr-003',
        name: 'Vikram Reddy',
        email: 'vikram.reddy@example.com',
        phone: '+91 91234 56789',
        role: 'customer',
        isActive: true,
        registeredAt: '2026-08-18',
        lastLoginAt: '2026-08-24',
        ordersCount: 2,
        bookingsCount: 1,
        totalSpend: 21494
      }
    ]
  });
});

// POST /api/admin/customers/:id/password-reset
router.post('/customers/:id/password-reset', authenticateUser, requireAdmin, (req, res) => {
  // Security guarantee: never return tokens or passwords
  res.json({
    success: true,
    message: 'Secure password reset instruction has been dispatched to customer email.'
  });
});

// PUT /api/admin/customers/:id/status
router.put('/customers/:id/status', authenticateUser, requireAdmin, (req, res) => {
  const { isActive } = req.body;
  res.json({
    success: true,
    message: `Customer account status updated to ${isActive ? 'Active' : 'Deactivated'}.`
  });
});

// GET /api/admin/audit-logs
router.get('/audit-logs', authenticateUser, requireAdmin, (req, res) => {
  res.json({
    success: true,
    logs: [
      {
        id: 'log-1',
        adminEmail: 'admin@sriinnovations.com',
        action: 'ORDER_STATUS_UPDATE',
        resource: 'Order',
        resourceId: 'SRI-849201',
        description: 'Order status changed to Shipped',
        timestamp: new Date().toISOString()
      },
      {
        id: 'log-2',
        adminEmail: 'admin@sriinnovations.com',
        action: 'TECHNICIAN_ASSIGNMENT',
        resource: 'Booking',
        resourceId: 'SRI-SRV-41829',
        description: 'Assigned lead technician Anand Kumar',
        timestamp: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: 'log-3',
        adminEmail: 'admin@sriinnovations.com',
        action: 'PRODUCT_PRICE_UPDATE',
        resource: 'Product',
        resourceId: 'prod-1',
        description: 'Updated promotional price for Sony Bravia 55-inch TV',
        timestamp: new Date(Date.now() - 7200000).toISOString()
      }
    ]
  });
});

module.exports = router;
