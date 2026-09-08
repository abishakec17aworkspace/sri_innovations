import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, ShoppingBag, Package, Wrench, Users,
  Tag, Image, Bell, Settings, FileText, LogOut, Plus,
  Trash2, Edit, CheckCircle2, TrendingUp, AlertTriangle, ShieldCheck, ChevronRight,
  Layers, Award, Percent, DollarSign, RotateCcw, MessageSquare, Sliders, UserCheck,
  Search, Filter, Download, Eye, ExternalLink, HelpCircle, ArrowRight, X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import { formatCurrency, formatDate } from '../utils/helpers';

export const AdminDashboard = () => {
  const { adminUser, logoutAdmin } = useAuth();
  const {
    products, services, orders, bookings, coupons,
    addProduct, updateProduct, deleteProduct,
    addService, updateService, deleteService,
    updateOrderStatus, updateBookingStatus
  } = useStore();
  const navigate = useNavigate();

  // Active section selector
  const [activeTab, setActiveTab] = useState('overview'); // overview, products, categories, brands, inventory, orders, payments, returns, customers, reviews, services, bookings, technicians, coupons, banners, notifications, analytics, settings, audit

  // Date range filter
  const [dateRange, setDateRange] = useState('30 Days');

  // Search & Filter queries
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  // Modals
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [showAddCouponModal, setShowAddCouponModal] = useState(false);
  const [showStockModal, setShowStockModal] = useState(null);
  const [stockAdjustment, setStockAdjustment] = useState({ amount: 5, reason: 'New Inventory Restock' });

  // Add Product Form State
  const [newProd, setNewProd] = useState({
    name: '',
    category: 'televisions',
    subcategory: 'Smart TV',
    brand: 'Sony',
    sku: 'SRI-PROD-' + Math.floor(1000 + Math.random() * 9000),
    price: 19999,
    discountPrice: 16999,
    stock: 15,
    lowStockThreshold: 3,
    rating: 4.8,
    reviewsCount: 1,
    featured: true,
    bestSeller: false,
    newArrival: true,
    status: 'Active',
    description: 'High-performance electronics hardware equipped with complete brand guarantee.',
    images: ['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80']
  });

  // Add Service Form State
  const [newSrv, setNewSrv] = useState({
    name: '',
    category: 'Television & Audio',
    startingPrice: 499,
    duration: '1-3 Hours',
    description: 'Certified hardware testing, part replacement, and motherboard soldering.',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
    commonProblems: ['Power failure', 'Display issue', 'Component burnout'],
    status: 'Active'
  });

  // Add Coupon Form State
  const [newCpn, setNewCpn] = useState({
    code: '',
    discountType: 'percentage',
    discountValue: 10,
    minimumOrder: 999,
    maximumDiscount: 1000,
    active: true,
    description: 'Special seasonal promotional discount'
  });

  // Mock Technicians
  const [technicians, setTechnicians] = useState([
    { id: 'tech-1', name: 'Anand Kumar', phone: '+91 98765 00011', specialization: 'Smart TV & Audio PCB', status: 'Active', workload: '2 Active' },
    { id: 'tech-2', name: 'Suresh V.', phone: '+91 98765 00022', specialization: 'Laptops & Motherboards', status: 'Active', workload: '1 Active' },
    { id: 'tech-3', name: 'Manish Patel', phone: '+91 98765 00033', specialization: 'Refrigerators & Gas Charging', status: 'Active', workload: '3 Active' },
    { id: 'tech-4', name: 'Deepak Roy', phone: '+91 98765 00044', specialization: 'Washing Machines & Motors', status: 'Active', workload: '0 Active' }
  ]);

  // Mock Registered Customers
  const [customers, setCustomers] = useState([
    { id: 'usr-1', name: 'Ramesh Kumar', email: 'customer@sriinnovations.com', phone: '+91 98450 12345', registered: '10 Aug 2026', orders: 3, bookings: 2, totalSpend: 62485, active: true },
    { id: 'usr-2', name: 'Priya Sharma', email: 'priya.sharma@example.com', phone: '+91 98765 11223', registered: '15 Aug 2026', orders: 1, bookings: 0, totalSpend: 8495, active: true },
    { id: 'usr-3', name: 'Vikram Reddy', email: 'vikram.reddy@example.com', phone: '+91 91234 56789', registered: '18 Aug 2026', orders: 2, bookings: 1, totalSpend: 21494, active: true },
    { id: 'usr-4', name: 'Ananya Deshmukh', email: 'ananya.d@example.com', phone: '+91 94455 66778', registered: '21 Aug 2026', orders: 1, bookings: 1, totalSpend: 36490, active: true }
  ]);

  // Notifications State
  const [notifications, setNotifications] = useState([
    { id: 'notif-1', title: 'New Customer Order Placed', desc: 'Order #SRI-849201 for ₹53,990 by Ramesh Kumar', time: '10 mins ago', read: false },
    { id: 'notif-2', title: 'Doorstep Service Scheduled', desc: 'Booking #SRI-SRV-41829 for TV Screen Repair', time: '1 hour ago', read: false },
    { id: 'notif-3', title: 'Low Stock Alert Triggered', desc: 'Samsung 653L Refrigerator stock reached threshold (8 remaining)', time: '3 hours ago', read: true }
  ]);

  // Inventory Stock Log History
  const [inventoryLogs, setInventoryLogs] = useState([
    { id: 'inv-1', product: 'Sony Bravia 55-inch 4K TV', sku: 'SRI-SNY-55TV', change: '+5 Units', reason: 'Factory Consignment Received', admin: 'admin@sriinnovations.com', date: '2026-08-25' },
    { id: 'inv-2', product: 'boAt Stone 1500 Speaker', sku: 'SRI-BOAT-S1500', change: '-2 Units', reason: 'In-Store Physical Display Demo', admin: 'admin@sriinnovations.com', date: '2026-08-24' }
  ]);

  // Calculate Aggregates
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalOrders = orders.length;
  const totalBookings = bookings.length;
  const lowStockCount = products.filter(p => p.stock <= (p.lowStockThreshold || 3)).length;
  const unreadNotifs = notifications.filter(n => !n.read).length;

  // Handlers
  const handleCreateProduct = (e) => {
    e.preventDefault();
    addProduct(newProd);
    setShowAddProductModal(false);
    alert(`Product "${newProd.name}" added and published to customer storefront!`);
  };

  const handleCreateService = (e) => {
    e.preventDefault();
    addService({
      ...newSrv,
      slug: newSrv.name.toLowerCase().replace(/\s+/g, '-'),
      rating: 4.9,
      reviewsCount: 1
    });
    setShowAddServiceModal(false);
    alert(`Service "${newSrv.name}" created and open for bookings!`);
  };

  const handleStockUpdate = (e) => {
    e.preventDefault();
    if (!showStockModal) return;
    const newStockVal = Number(showStockModal.stock) + Number(stockAdjustment.amount);
    updateProduct(showStockModal.id, { stock: Math.max(0, newStockVal) });
    setInventoryLogs(prev => [
      {
        id: 'inv-' + Date.now(),
        product: showStockModal.name,
        sku: showStockModal.sku,
        change: `${stockAdjustment.amount > 0 ? '+' : ''}${stockAdjustment.amount} Units`,
        reason: stockAdjustment.reason,
        admin: adminUser?.email || 'admin@sriinnovations.com',
        date: new Date().toISOString().split('T')[0]
      },
      ...prev
    ]);
    setShowStockModal(null);
  };

  const handleCustomerResetPassword = (email) => {
    alert(`Secure password reset email link has been generated and dispatched to ${email}. No passwords or tokens are displayed.`);
  };

  const handleToggleCustomerStatus = (id) => {
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, active: !c.active } : c));
  };

  const exportDataAsCSV = (filename, rows) => {
    const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${filename}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row font-sans">

      {/* 1. PROFESSIONAL ADMIN SIDEBAR */}
      <aside className="w-full lg:w-72 bg-brand-secondary text-slate-300 p-6 flex flex-col justify-between shrink-0 border-r border-slate-800">
        <div className="space-y-6">

          {/* Logo Brand Header */}
          <Link to="/admin/dashboard" className="flex items-center gap-3 bg-white p-3 rounded-2xl shadow-sm">
            <img src="/logo.png" alt="Sri Innovations" className="h-10 w-auto object-contain" />
          </Link>

          <div className="px-2 pb-2 border-b border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase font-extrabold tracking-wider text-brand-accent">Executive Portal</p>
              <p className="text-xs font-bold text-white line-clamp-1">{adminUser?.name || 'Administrator'}</p>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" title="Online" />
          </div>

          {/* Nav Categories */}
          <nav className="space-y-6 text-xs max-h-[calc(100vh-280px)] overflow-y-auto pr-1">

            {/* Core Overview */}
            <div className="space-y-1">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'overview' ? 'bg-brand-primary text-white shadow-brand' : 'hover:bg-slate-800 text-slate-300'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <LayoutDashboard className="w-4 h-4 text-brand-accent" /> Dashboard
                </div>
              </button>

              <button
                onClick={() => setActiveTab('analytics')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'analytics' ? 'bg-brand-primary text-white shadow-brand' : 'hover:bg-slate-800 text-slate-300'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-4 h-4 text-brand-accent" /> Sales & Analytics
                </div>
              </button>
            </div>

            {/* CATALOG SECTION */}
            <div className="space-y-1">
              <p className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Catalog</p>
              <button
                onClick={() => setActiveTab('products')}
                className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl font-semibold transition-all ${activeTab === 'products' ? 'bg-brand-primary text-white font-bold' : 'hover:bg-slate-800 text-slate-300'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-4 h-4 text-brand-accent" /> Products
                </div>
                <span className="bg-slate-800 px-2 py-0.5 rounded-full text-[10px] font-mono">{products.length}</span>
              </button>

              <button
                onClick={() => setActiveTab('inventory')}
                className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl font-semibold transition-all ${activeTab === 'inventory' ? 'bg-brand-primary text-white font-bold' : 'hover:bg-slate-800 text-slate-300'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-4 h-4 text-brand-accent" /> Inventory & Stock
                </div>
                {lowStockCount > 0 && (
                  <span className="bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full text-[10px] font-bold animate-pulse">
                    {lowStockCount} Low
                  </span>
                )}
              </button>
            </div>

            {/* SALES SECTION */}
            <div className="space-y-1">
              <p className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Commerce Sales</p>
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl font-semibold transition-all ${activeTab === 'orders' ? 'bg-brand-primary text-white font-bold' : 'hover:bg-slate-800 text-slate-300'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Package className="w-4 h-4 text-brand-accent" /> Orders
                </div>
                <span className="bg-slate-800 px-2 py-0.5 rounded-full text-[10px] font-mono">{orders.length}</span>
              </button>

              <button
                onClick={() => setActiveTab('payments')}
                className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl font-semibold transition-all ${activeTab === 'payments' ? 'bg-brand-primary text-white font-bold' : 'hover:bg-slate-800 text-slate-300'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <DollarSign className="w-4 h-4 text-brand-accent" /> Payments Gateway
                </div>
              </button>
            </div>

            {/* SERVICES SECTION */}
            <div className="space-y-1">
              <p className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Service Operations</p>
              <button
                onClick={() => setActiveTab('services')}
                className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl font-semibold transition-all ${activeTab === 'services' ? 'bg-brand-primary text-white font-bold' : 'hover:bg-slate-800 text-slate-300'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Wrench className="w-4 h-4 text-brand-accent" /> Repair Services
                </div>
                <span className="bg-slate-800 px-2 py-0.5 rounded-full text-[10px] font-mono">{services.length}</span>
              </button>

              <button
                onClick={() => setActiveTab('bookings')}
                className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl font-semibold transition-all ${activeTab === 'bookings' ? 'bg-brand-primary text-white font-bold' : 'hover:bg-slate-800 text-slate-300'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <UserCheck className="w-4 h-4 text-brand-accent" /> Doorstep Bookings
                </div>
                <span className="bg-brand-accent text-white px-2 py-0.5 rounded-full text-[10px] font-bold">{bookings.length}</span>
              </button>

              <button
                onClick={() => setActiveTab('technicians')}
                className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl font-semibold transition-all ${activeTab === 'technicians' ? 'bg-brand-primary text-white font-bold' : 'hover:bg-slate-800 text-slate-300'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-brand-accent" /> Technicians Team
                </div>
              </button>
            </div>

            {/* CUSTOMER DIRECTORY */}
            <div className="space-y-1">
              <p className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Users & Marketing</p>
              <button
                onClick={() => setActiveTab('customers')}
                className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl font-semibold transition-all ${activeTab === 'customers' ? 'bg-brand-primary text-white font-bold' : 'hover:bg-slate-800 text-slate-300'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-brand-accent" /> Customers
                </div>
                <span className="bg-slate-800 px-2 py-0.5 rounded-full text-[10px] font-mono">{customers.length}</span>
              </button>

              <button
                onClick={() => setActiveTab('coupons')}
                className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl font-semibold transition-all ${activeTab === 'coupons' ? 'bg-brand-primary text-white font-bold' : 'hover:bg-slate-800 text-slate-300'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Tag className="w-4 h-4 text-brand-accent" /> Coupons & Deals
                </div>
                <span className="bg-slate-800 px-2 py-0.5 rounded-full text-[10px] font-mono">{coupons.length}</span>
              </button>
            </div>

            {/* GOVERNANCE */}
            <div className="space-y-1">
              <p className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Security & Logs</p>
              <button
                onClick={() => setActiveTab('audit')}
                className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl font-semibold transition-all ${activeTab === 'audit' ? 'bg-brand-primary text-white font-bold' : 'hover:bg-slate-800 text-slate-300'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-brand-accent" /> System Audit Logs
                </div>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl font-semibold transition-all ${activeTab === 'settings' ? 'bg-brand-primary text-white font-bold' : 'hover:bg-slate-800 text-slate-300'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Settings className="w-4 h-4 text-brand-accent" /> Store Settings
                </div>
              </button>
            </div>

          </nav>
        </div>

        {/* Bottom Exit Links */}
        <div className="pt-4 border-t border-slate-800 space-y-2">
          <Link
            to="/"
            className="flex items-center justify-between text-xs text-slate-400 hover:text-white px-3 py-2 rounded-xl hover:bg-slate-800 transition-colors"
          >
            <span>Visit Customer Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={() => {
              logoutAdmin();
              navigate('/admin/login');
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-rose-500/10 text-rose-400 hover:bg-rose-600 hover:text-white rounded-xl text-xs font-bold transition-all"
          >
            <LogOut className="w-4 h-4" /> Secure Staff Logout
          </button>
        </div>
      </aside>

      {/* 2. ADMIN MAIN CONTAINER */}
      <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden">

        {/* TOP ADMIN HEADER */}
        <header className="bg-white border-b border-slate-200 px-6 sm:px-10 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-400">Admin</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">{activeTab}</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Filter by timeframe */}
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-primary"
            >
              <option value="Today">Today</option>
              <option value="7 Days">Last 7 Days</option>
              <option value="30 Days">Last 30 Days</option>
              <option value="90 Days">Last 90 Days</option>
              <option value="This Year">This Year</option>
            </select>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setActiveTab('notifications')}
                className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 relative transition-colors"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifs > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {unreadNotifs}
                  </span>
                )}
              </button>
            </div>

            {/* Admin Avatar */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-brand-primary text-white font-extrabold text-xs flex items-center justify-center">
                A
              </div>
              <div className="hidden sm:block text-left text-xs">
                <p className="font-bold text-slate-900 leading-tight">Sri Admin</p>
                <p className="text-[10px] text-slate-400 font-mono">Full Access</p>
              </div>
            </div>
          </div>
        </header>

        {/* 3. DYNAMIC CONTENT WORKSPACE */}
        <div className="p-6 sm:p-10 space-y-8 flex-1">

          {/* ======================================================== */}
          {/* TAB: OVERVIEW / DASHBOARD */}
          {/* ======================================================== */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-200">

              {/* Top Banner */}
              <div className="bg-gradient-to-r from-brand-secondary via-brand-primary to-brand-primary-light rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-brand">
                <div className="space-y-1">
                  <span className="bg-brand-accent text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full">
                    Live System Synchronized
                  </span>
                  <h2 className="text-2xl font-extrabold text-white">Sri Innovations Commercial Headquarters</h2>
                  <p className="text-xs text-slate-200">Dual Module Engine: E-Commerce Product Orders & Doorstep Electronics Care Hub.</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowAddProductModal(true)}
                    className="bg-brand-accent hover:bg-brand-accent-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-accent flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" /> Add Product
                  </button>
                  <button
                    onClick={() => setShowAddServiceModal(true)}
                    className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-white/20 transition-all flex items-center gap-1.5"
                  >
                    <Wrench className="w-4 h-4 text-brand-accent" /> Add Service
                  </button>
                </div>
              </div>

              {/* KPI Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Gross Sales Revenue</span>
                  <p className="text-2xl font-extrabold text-brand-primary">{formatCurrency(totalRevenue)}</p>
                  <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" /> +14.8% vs previous month
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Customer Orders</span>
                  <p className="text-2xl font-extrabold text-slate-900">{totalOrders}</p>
                  <p className="text-[11px] text-slate-500">
                    {orders.filter(o => o.orderStatus === 'Confirmed').length} pending dispatch
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Doorstep Service Bookings</span>
                  <p className="text-2xl font-extrabold text-brand-accent">{totalBookings}</p>
                  <p className="text-[11px] text-slate-500">100% technician coverage</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Inventory Catalog Status</span>
                  <p className="text-2xl font-extrabold text-slate-900">{products.length} Products</p>
                  <p className={`text-[11px] font-bold ${lowStockCount > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {lowStockCount} items below threshold
                  </p>
                </div>
              </div>

              {/* Two Column Section: Recent Orders & Recent Bookings */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Recent Orders */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                      <Package className="w-4 h-4 text-brand-primary" /> Recent E-Commerce Orders
                    </h3>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-xs font-bold text-brand-primary hover:underline"
                    >
                      View All Orders →
                    </button>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {orders.slice(0, 4).map((o) => (
                      <div key={o.id} className="py-3 flex items-center justify-between text-xs">
                        <div>
                          <strong className="text-brand-primary font-mono block font-bold">{o.id}</strong>
                          <span className="text-slate-800 font-semibold">{o.shippingAddress?.name}</span>
                          <p className="text-slate-400 text-[10px]">{formatDate(o.createdAt)} • {o.items?.length || 1} Item(s)</p>
                        </div>
                        <div className="text-right">
                          <span className="font-extrabold text-slate-900 block">{formatCurrency(o.total)}</span>
                          <span className="inline-block bg-blue-50 text-brand-primary text-[10px] font-bold px-2 py-0.5 rounded-full mt-0.5">
                            {o.orderStatus}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Bookings */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-brand-accent" /> Recent Doorstep Service Appointments
                    </h3>
                    <button
                      onClick={() => setActiveTab('bookings')}
                      className="text-xs font-bold text-brand-accent hover:underline"
                    >
                      Manage Bookings →
                    </button>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {bookings.slice(0, 4).map((b) => (
                      <div key={b.id} className="py-3 flex items-center justify-between text-xs">
                        <div>
                          <strong className="text-brand-accent font-mono block font-bold">{b.id}</strong>
                          <span className="text-slate-800 font-bold">{b.service?.name}</span>
                          <p className="text-slate-400 text-[10px]">Customer: {b.customerName} • {b.bookingDate}</p>
                        </div>
                        <div className="text-right">
                          <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-full">
                            {b.bookingStatus}
                          </span>
                          <p className="text-[10px] text-slate-500 font-mono mt-1">{b.timeSlot}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ======================================================== */}
          {/* TAB: PRODUCTS MANAGEMENT */}
          {/* ======================================================== */}
          {activeTab === 'products' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">Products Catalog Management</h2>
                  <p className="text-xs text-slate-500">Live storefront synchronization for inventory, specs, and pricing</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => exportDataAsCSV('sri_products', [
                      ['ID', 'Name', 'Brand', 'Category', 'SKU', 'MRP', 'Discount Price', 'Stock', 'Status'],
                      ...products.map(p => [p.id, `"${p.name}"`, p.brand, p.category, p.sku, p.price, p.discountPrice, p.stock, p.status || 'Active'])
                    ])}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" /> Export CSV
                  </button>
                  <button
                    onClick={() => setShowAddProductModal(true)}
                    className="bg-brand-accent hover:bg-brand-accent-hover text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-accent"
                  >
                    <Plus className="w-4 h-4" /> Add Product
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                      <tr>
                        <th className="p-3.5">Product Title & Brand</th>
                        <th className="p-3.5">Category</th>
                        <th className="p-3.5">SKU</th>
                        <th className="p-3.5">Price / MRP</th>
                        <th className="p-3.5">Stock Status</th>
                        <th className="p-3.5">Visibility</th>
                        <th className="p-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {products.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3.5 flex items-center gap-3">
                            <img src={p.images?.[0]} alt="" className="w-10 h-10 object-contain rounded-lg border border-slate-100 bg-white p-1" />
                            <div>
                              <strong className="text-slate-900 block line-clamp-1 max-w-[220px]">{p.name}</strong>
                              <span className="text-[10px] text-brand-primary-light font-bold uppercase">{p.brand}</span>
                            </div>
                          </td>
                          <td className="p-3.5 capitalize font-medium text-slate-700">{p.category.replace('-', ' ')}</td>
                          <td className="p-3.5 font-mono text-slate-500">{p.sku}</td>
                          <td className="p-3.5">
                            <strong className="text-slate-900 font-extrabold">{formatCurrency(p.discountPrice || p.price)}</strong>
                            {p.discountPrice && <span className="block text-[10px] text-slate-400 line-through">{formatCurrency(p.price)}</span>}
                          </td>
                          <td className="p-3.5">
                            <button
                              onClick={() => setShowStockModal(p)}
                              className={`font-bold px-2 py-0.5 rounded text-[11px] ${p.stock <= (p.lowStockThreshold || 3) ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-700'
                                }`}
                            >
                              {p.stock} In Stock ✏️
                            </button>
                          </td>
                          <td className="p-3.5">
                            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                              {p.status || 'Active'}
                            </span>
                          </td>
                          <td className="p-3.5 text-right space-x-1.5">
                            <button
                              onClick={() => {
                                const newPrice = prompt('Enter new selling price (₹):', p.discountPrice || p.price);
                                if (newPrice && !isNaN(newPrice)) {
                                  updateProduct(p.id, { discountPrice: Number(newPrice) });
                                }
                              }}
                              className="p-1.5 text-slate-600 hover:text-brand-primary hover:bg-slate-100 rounded-lg"
                              title="Edit Price"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Are you sure you want to remove "${p.name}" from storefront?`)) {
                                  deleteProduct(p.id);
                                }
                              }}
                              className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg"
                              title="Delete Product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB: INVENTORY & STOCK */}
          {/* ======================================================== */}
          {activeTab === 'inventory' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">Inventory & Threshold Controls</h2>
                  <p className="text-xs text-slate-500">Track current reserves, threshold limits, and historical stock movements</p>
                </div>
              </div>

              {/* Low Stock Watchlist */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" /> Stock Status Watchlist
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.map((p) => (
                    <div key={p.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
                      <div>
                        <strong className="block text-slate-900 line-clamp-1">{p.name}</strong>
                        <p className="text-slate-500 font-mono text-[10px]">SKU: {p.sku}</p>
                        <p className="text-slate-600 mt-1">Current Stock: <strong className="text-brand-primary">{p.stock} units</strong></p>
                      </div>
                      <button
                        onClick={() => setShowStockModal(p)}
                        className="bg-brand-primary text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-brand-primary-light"
                      >
                        Adjust
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inventory History Log */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                <h3 className="font-extrabold text-sm text-slate-900">Stock Adjustment Audit Log</h3>
                <div className="divide-y divide-slate-100 text-xs">
                  {inventoryLogs.map((log) => (
                    <div key={log.id} className="py-3 flex items-center justify-between">
                      <div>
                        <strong className="text-slate-900">{log.product}</strong>
                        <p className="text-slate-500 text-[11px]">Reason: {log.reason} • By: {log.admin}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-brand-primary">{log.change}</span>
                        <p className="text-slate-400 text-[10px]">{log.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB: CUSTOMER ORDERS */}
          {/* ======================================================== */}
          {activeTab === 'orders' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">Customer Order Processing</h2>
                  <p className="text-xs text-slate-500">Live order lifecycle updater with printable GST invoices</p>
                </div>
                <button
                  onClick={() => exportDataAsCSV('sri_orders', [
                    ['Order ID', 'Customer Name', 'Phone', 'Subtotal', 'Tax', 'Total', 'Payment Mode', 'Status', 'Date'],
                    ...orders.map(o => [o.id, `"${o.shippingAddress?.name}"`, o.shippingAddress?.phone, o.subtotal, o.tax, o.total, o.paymentMethod, o.orderStatus, o.createdAt])
                  ])}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> Export Orders CSV
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                      <tr>
                        <th className="p-3.5">Order ID</th>
                        <th className="p-3.5">Customer & Contact</th>
                        <th className="p-3.5">Order Total</th>
                        <th className="p-3.5">Payment Status</th>
                        <th className="p-3.5">Order Status</th>
                        <th className="p-3.5 text-right">Lifecycle Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {orders.map((o) => (
                        <tr key={o.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3.5 font-mono font-bold text-brand-primary">{o.id}</td>
                          <td className="p-3.5">
                            <strong className="text-slate-900 block">{o.shippingAddress?.name}</strong>
                            <span className="text-slate-500 text-[10px]">{o.shippingAddress?.phone}</span>
                          </td>
                          <td className="p-3.5 font-extrabold text-slate-900">{formatCurrency(o.total)}</td>
                          <td className="p-3.5">
                            <span className="text-slate-700">{o.paymentMethod}</span>
                            <span className="block text-[10px] font-bold text-emerald-600">{o.paymentStatus}</span>
                          </td>
                          <td className="p-3.5">
                            <span className="bg-blue-50 text-brand-primary font-bold px-2.5 py-0.5 rounded-full text-[10px]">
                              {o.orderStatus}
                            </span>
                          </td>
                          <td className="p-3.5 text-right">
                            <select
                              value={o.orderStatus}
                              onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                              className="text-xs bg-white border border-slate-300 rounded-lg p-1.5 font-bold text-slate-800 focus:ring-2 focus:ring-brand-primary"
                            >
                              <option value="Confirmed">Confirmed</option>
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Out for Delivery">Out for Delivery</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB: DOORSTEP SERVICE BOOKINGS */}
          {/* ======================================================== */}
          {activeTab === 'bookings' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">Doorstep Hardware & Repair Bookings</h2>
                  <p className="text-xs text-slate-500">Technician dispatch scheduling, masked Aadhaar inspection, and progress tracking</p>
                </div>
                <button
                  onClick={() => exportDataAsCSV('sri_bookings', [
                    ['Booking ID', 'Service', 'Appliance', 'Customer', 'Phone', 'Date', 'Time Slot', 'Technician', 'Status'],
                    ...bookings.map(b => [b.id, `"${b.service?.name}"`, `"${b.productName}"`, `"${b.customerName}"`, b.phone, b.bookingDate, b.timeSlot, `"${b.technician?.name}"`, b.bookingStatus])
                  ])}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> Export Bookings CSV
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                      <tr>
                        <th className="p-3.5">Booking ID</th>
                        <th className="p-3.5">Service & Equipment</th>
                        <th className="p-3.5">Customer & Identity</th>
                        <th className="p-3.5">Scheduled Slot</th>
                        <th className="p-3.5">Assigned Technician</th>
                        <th className="p-3.5 text-right">Status Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {bookings.map((b) => (
                        <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3.5 font-mono font-bold text-brand-accent">{b.id}</td>
                          <td className="p-3.5">
                            <strong className="text-slate-900 block">{b.service?.name}</strong>
                            <span className="text-slate-500 text-[10px]">{b.productName} ({b.brand} {b.model})</span>
                          </td>
                          <td className="p-3.5">
                            <strong className="text-slate-900 block">{b.customerName} ({b.phone})</strong>
                            <span className="text-emerald-700 font-mono text-[10px] font-semibold">{b.aadhaarMasked || 'XXXX XXXX 8912'}</span>
                          </td>
                          <td className="p-3.5 font-semibold text-slate-700">
                            {b.bookingDate}
                            <span className="block text-[10px] text-slate-500">{b.timeSlot}</span>
                          </td>
                          <td className="p-3.5 text-slate-800 font-bold">
                            {b.technician?.name || 'Unassigned'}
                          </td>
                          <td className="p-3.5 text-right">
                            <select
                              value={b.bookingStatus}
                              onChange={(e) => updateBookingStatus(b.id, e.target.value)}
                              className="text-xs bg-white border border-slate-300 rounded-lg p-1.5 font-bold text-slate-800 focus:ring-2 focus:ring-brand-primary"
                            >
                              <option value="Confirmed">Confirmed</option>
                              <option value="Technician Assigned">Technician Assigned</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB: CUSTOMER MANAGEMENT */}
          {/* ======================================================== */}
          {activeTab === 'customers' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
                <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Data Protection & Customer Privacy Standard:</strong>
                  <span>
                    Customer passwords, authentication hashes, and raw credentials are encrypted via bcrypt and cannot be viewed by any administrator. You may only trigger secure password-reset tokens sent to the verified customer email address.
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="font-extrabold text-sm text-slate-900">Registered Customer Accounts ({customers.length})</h3>
                  <button
                    onClick={() => exportDataAsCSV('sri_customers', [
                      ['Customer Name', 'Email', 'Phone', 'Registered Date', 'Orders', 'Bookings', 'Total Spend', 'Status'],
                      ...customers.map(c => [`"${c.name}"`, c.email, c.phone, c.registered, c.orders, c.bookings, c.totalSpend, c.active ? 'Active' : 'Disabled'])
                    ])}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" /> Export Customers
                  </button>
                </div>

                <div className="divide-y divide-slate-100 text-xs">
                  {customers.map((c) => (
                    <div key={c.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                      <div>
                        <strong className="text-slate-900 text-sm block font-bold">{c.name}</strong>
                        <p className="text-slate-500">{c.email} • {c.phone}</p>
                        <p className="text-slate-400 text-[10px] mt-0.5">
                          Registered: {c.registered} • Total Purchases: {formatCurrency(c.totalSpend)} ({c.orders} Orders, {c.bookings} Bookings)
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCustomerResetPassword(c.email)}
                          className="bg-brand-primary hover:bg-brand-primary-light text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-all"
                        >
                          Send Password Reset
                        </button>
                        <button
                          onClick={() => handleToggleCustomerStatus(c.id)}
                          className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all ${c.active ? 'border-rose-200 text-rose-600 hover:bg-rose-50' : 'border-emerald-200 text-emerald-600 hover:bg-emerald-50'
                            }`}
                        >
                          {c.active ? 'Disable Account' : 'Activate Account'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB: TECHNICIANS TEAM */}
          {/* ======================================================== */}
          {activeTab === 'technicians' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">Certified Technicians Fleet</h2>
                  <p className="text-xs text-slate-500">Manage field hardware engineers, service specializations, and active workload</p>
                </div>
                <button
                  onClick={() => {
                    const name = prompt('Enter Technician Full Name:');
                    const spec = prompt('Enter Specialization (e.g. Smart TV, Motherboard, Refrigerator):');
                    const phone = prompt('Enter Phone Number:');
                    if (name && spec) {
                      setTechnicians(prev => [...prev, { id: 'tech-' + Date.now(), name, phone: phone || '+91 98765 00000', specialization: spec, status: 'Active', workload: '0 Active' }]);
                    }
                  }}
                  className="bg-brand-accent hover:bg-brand-accent-hover text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-accent"
                >
                  <Plus className="w-4 h-4" /> Add Technician
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {technicians.map((t) => (
                  <div key={t.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-full bg-brand-primary text-white font-bold flex items-center justify-center text-sm">
                        {t.name.charAt(0)}
                      </div>
                      <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {t.status}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{t.name}</h4>
                      <p className="text-xs text-brand-primary font-semibold">{t.specialization}</p>
                      <p className="text-slate-500 text-[11px] font-mono mt-1">{t.phone}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-500">Current Workload:</span>
                      <strong className="text-brand-accent">{t.workload}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB: COUPONS & MARKETING */}
          {/* ======================================================== */}
          {activeTab === 'coupons' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">Discount Coupons & Promotional Deals</h2>
                  <p className="text-xs text-slate-500">Create percentage discounts, flat cart discounts, and minimum order rules</p>
                </div>
                <button
                  onClick={() => setShowAddCouponModal(true)}
                  className="bg-brand-accent hover:bg-brand-accent-hover text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-accent"
                >
                  <Plus className="w-4 h-4" /> Create Coupon
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {coupons.map((c) => (
                  <div key={c.code} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="bg-brand-primary/10 text-brand-primary font-mono text-sm font-extrabold px-3 py-1 rounded-xl">
                        {c.code}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.active ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                        {c.active ? 'Active' : 'Disabled'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600">{c.description}</p>

                    <div className="pt-2 border-t border-slate-100 text-xs space-y-1 text-slate-600">
                      <p>Discount: <strong className="text-slate-900">{c.discountType === 'percentage' ? `${c.discountValue}% OFF` : `₹${c.discountValue} FLAT`}</strong></p>
                      <p>Min Order: <strong>{formatCurrency(c.minimumOrder)}</strong></p>
                      <p>Redemptions: <strong>{c.usedCount} times used</strong></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB: AUDIT LOGS */}
          {/* ======================================================== */}
          {activeTab === 'audit' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm animate-in fade-in duration-200">
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-brand-primary" /> Immutable Staff Audit Trail
              </h3>
              <p className="text-xs text-slate-500">Every destructive or status change is securely recorded with timestamp.</p>

              <div className="divide-y divide-slate-100 text-xs">
                <div className="py-3 flex items-center justify-between">
                  <div>
                    <strong className="text-slate-900">Admin (admin@sriinnovations.com)</strong> updated Order <strong>SRI-849201</strong> status to "Shipped".
                  </div>
                  <span className="text-slate-400 text-[10px]">Today, 10:45 AM</span>
                </div>
                <div className="py-3 flex items-center justify-between">
                  <div>
                    <strong className="text-slate-900">System</strong> confirmed Doorstep Booking <strong>SRI-SRV-41829</strong>.
                  </div>
                  <span className="text-slate-400 text-[10px]">22 Aug 2026, 02:15 PM</span>
                </div>
                <div className="py-3 flex items-center justify-between">
                  <div>
                    <strong className="text-slate-900">Admin</strong> modified stock threshold for <strong>Prestige 750W Mixer Grinder</strong>.
                  </div>
                  <span className="text-slate-400 text-[10px]">20 Aug 2026, 11:30 AM</span>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB: STORE SETTINGS */}
          {/* ======================================================== */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 max-w-3xl animate-in fade-in duration-200">
              <h3 className="font-extrabold text-base text-slate-900 border-b border-slate-100 pb-3">
                Sri Innovations Store & Hub Settings
              </h3>

              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Store Legal Name</label>
                    <input type="text" defaultValue="Sri Innovations" className="w-full p-2.5 rounded-xl border border-slate-300" />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Customer Helpline</label>
                    <input type="text" defaultValue="+91 98765 43210" className="w-full p-2.5 rounded-xl border border-slate-300" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Support Email</label>
                    <input type="email" defaultValue="support@sriinnovations.com" className="w-full p-2.5 rounded-xl border border-slate-300" />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Google Maps Direction URL</label>
                    <input type="text" defaultValue="https://maps.app.goo.gl/MLFdoXzyzq3AMzDZ7" className="w-full p-2.5 rounded-xl border border-slate-300" />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => alert('Store settings saved successfully!')}
                  className="bg-brand-primary hover:bg-brand-primary-light text-white font-bold px-6 py-2.5 rounded-xl text-xs"
                >
                  Save Business Settings
                </button>
              </div>
            </div>
          )}

        </div>

      </main>

      {/* MODAL: ADD PRODUCT */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleCreateProduct} className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3">Add Product to Storefront</h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={newProd.name}
                  onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                  placeholder="e.g. LG UltraGear 27-inch 144Hz Gaming Monitor"
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={newProd.category}
                    onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-semibold"
                  >
                    <option value="televisions">Televisions</option>
                    <option value="large-appliances">Large Appliances</option>
                    <option value="small-appliances">Small Appliances</option>
                    <option value="computers-laptops">Computers & Laptops</option>
                    <option value="mobiles-accessories">Mobiles & Accessories</option>
                    <option value="audio">Audio & Gadgets</option>
                    <option value="gaming">Gaming</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Brand Name *</label>
                  <input
                    type="text"
                    required
                    value={newProd.brand}
                    onChange={(e) => setNewProd({ ...newProd, brand: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">MRP (₹) *</label>
                  <input
                    type="number"
                    required
                    value={newProd.price}
                    onChange={(e) => setNewProd({ ...newProd, price: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Discount Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={newProd.discountPrice}
                    onChange={(e) => setNewProd({ ...newProd, discountPrice: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Initial Stock *</label>
                  <input
                    type="number"
                    required
                    value={newProd.stock}
                    onChange={(e) => setNewProd({ ...newProd, stock: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Upload Product Photos (JPEG / PNG / WebP)</label>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer bg-brand-primary hover:bg-brand-primary-light text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2 shadow-sm">
                      <Plus className="w-4 h-4" />
                      <span>Choose Image File...</span>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            if (file.size > 5 * 1024 * 1024) {
                              alert('File size exceeds 5MB limit.');
                              return;
                            }
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setNewProd(prev => ({
                                ...prev,
                                images: [reader.result, ...(prev.images.filter(img => !img.startsWith('http')))]
                              }));
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                    <span className="text-[11px] text-slate-400">Max file size 5MB (Upload from PC or mobile)</span>
                  </div>

                  {/* Image Previews */}
                  {newProd.images && newProd.images.length > 0 && (
                    <div className="flex flex-wrap gap-3 pt-1">
                      {newProd.images.map((imgSrc, idx) => (
                        <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 p-1 group shadow-xs">
                          <img src={imgSrc} alt="Preview" className="w-full h-full object-contain" />
                          <button
                            type="button"
                            onClick={() => {
                              setNewProd(prev => ({
                                ...prev,
                                images: prev.images.filter((_, i) => i !== idx)
                              }));
                            }}
                            className="absolute top-1 right-1 bg-rose-600 text-white rounded-full p-1 shadow-md hover:bg-rose-700 transition-colors"
                            title="Remove image"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Product Description</label>
                <textarea
                  rows={2}
                  value={newProd.description}
                  onChange={(e) => setNewProd({ ...newProd, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowAddProductModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-brand-primary hover:bg-brand-primary-light text-white font-bold px-6 py-2.5 rounded-xl text-xs"
              >
                Publish to Store
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL: STOCK ADJUSTMENT */}
      {showStockModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <form onSubmit={handleStockUpdate} className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
              Adjust Inventory Stock
            </h3>
            <p className="text-xs text-slate-600">Product: <strong>{showStockModal.name}</strong></p>
            <p className="text-xs text-slate-500">Current Stock: <strong className="text-brand-primary">{showStockModal.stock}</strong></p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Stock Quantity Change (+/-)</label>
                <input
                  type="number"
                  required
                  value={stockAdjustment.amount}
                  onChange={(e) => setStockAdjustment({ ...stockAdjustment, amount: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-bold"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Reason for Adjustment</label>
                <select
                  value={stockAdjustment.reason}
                  onChange={(e) => setStockAdjustment({ ...stockAdjustment, reason: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                >
                  <option value="New Purchase Consignment">New Purchase Consignment</option>
                  <option value="Manual Count Correction">Manual Count Correction</option>
                  <option value="Damaged Stock Write-off">Damaged Stock Write-off</option>
                  <option value="Customer Return Restock">Customer Return Restock</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowStockModal(null)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-brand-primary text-white px-4 py-1.5 rounded-xl text-xs font-bold"
              >
                Apply Update
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};

export const AdminLoginPage = () => {
  const [email, setEmail] = useState('admin@sriinnovations.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const { loginAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      loginAdmin(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900/95 backdrop-blur-sm flex items-center justify-center p-4 relative">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl space-y-6 relative animate-in fade-in zoom-in-95 duration-200">

        {/* Close Button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          title="Close Admin Login & Return to Store"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2 pt-2">
          <img src="/logo.png" alt="Sri Innovations" className="h-12 w-auto object-contain mx-auto" />
          <h1 className="text-xl font-extrabold text-slate-900">Sri Innovations Administrator Portal</h1>
          <p className="text-xs text-slate-500">Authorized staff authentication & executive business control</p>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Admin Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-primary"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Admin Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-primary"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-brand-primary hover:bg-brand-primary-light text-white font-bold py-3 rounded-xl text-xs transition-all shadow-brand"
          >
            Access Business Control Center
          </button>
        </form>

        <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500 text-center">
          Default Dev Credentials: <strong className="text-slate-800">admin@sriinnovations.com</strong> / <strong className="text-slate-800">admin123</strong>
        </div>
      </div>
    </div>
  );
};
