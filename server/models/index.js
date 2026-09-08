const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String, trim: true },
  passwordHash: { type: String, required: true, select: false },
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  addresses: [{
    name: String,
    phone: String,
    house: String,
    street: String,
    city: String,
    state: String,
    pincode: String,
    addressType: { type: String, default: 'Home' },
    isDefault: { type: Boolean, default: false }
  }],
  isActive: { type: Boolean, default: true },
  lastLoginAt: { type: Date }
}, { timestamps: true });

// Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  description: { type: String },
  category: { type: String, required: true },
  subcategory: { type: String },
  brand: { type: String, required: true },
  sku: { type: String, required: true, unique: true, uppercase: true },
  price: { type: Number, required: true, min: 0 },
  discountPrice: { type: Number, min: 0 },
  stock: { type: Number, default: 0, min: 0 },
  lowStockThreshold: { type: Number, default: 3, min: 0 },
  images: [{ type: String }],
  specifications: { type: Map, of: String },
  features: [{ type: String }],
  warranty: { type: String },
  rating: { type: Number, default: 4.8 },
  reviewsCount: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  bestSeller: { type: Boolean, default: false },
  newArrival: { type: Boolean, default: false },
  status: { type: String, enum: ['Active', 'Inactive', 'Draft', 'Archived'], default: 'Active' },
  deletedAt: { type: Date }
}, { timestamps: true });

// Category Schema
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  description: { type: String },
  image: { type: String },
  subcategories: [{ type: String }],
  featured: { type: Boolean, default: false },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  sortOrder: { type: Number, default: 0 }
}, { timestamps: true });

// Brand Schema
const brandSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  logo: { type: String },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
}, { timestamps: true });

// Service Schema
const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  category: { type: String, required: true },
  startingPrice: { type: Number, required: true, min: 0 },
  duration: { type: String, default: '1-2 Hours' },
  image: { type: String },
  description: { type: String },
  commonProblems: [{ type: String }],
  process: [{ step: Number, title: String, desc: String }],
  benefits: [{ type: String }],
  faqs: [{ q: String, a: String }],
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
}, { timestamps: true });

// Technician Schema
const technicianSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  specialization: { type: String, required: true },
  status: { type: String, enum: ['Active', 'Inactive', 'On Leave'], default: 'Active' }
}, { timestamps: true });

// Order Schema
const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  customerDetails: {
    name: String,
    email: String,
    phone: String
  },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    sku: String,
    price: Number,
    quantity: Number
  }],
  shippingAddress: {
    name: String,
    phone: String,
    house: String,
    street: String,
    city: String,
    state: String,
    pincode: String
  },
  subtotal: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  shippingFee: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  total: { type: Number, required: true },
  couponCode: { type: String },
  paymentMethod: { type: String, required: true },
  paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Failed', 'Refunded'], default: 'Pending' },
  orderStatus: { type: String, enum: ['Confirmed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled', 'Returned'], default: 'Confirmed' }
}, { timestamps: true });

// Booking Schema
const bookingSchema = new mongoose.Schema({
  bookingId: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
  customerName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  productName: { type: String },
  brand: { type: String },
  model: { type: String },
  problemDescription: { type: String, required: true },
  productImage: { type: String },
  address: { type: String, required: true },
  aadhaarMasked: { type: String },
  bookingDate: { type: String, required: true },
  timeSlot: { type: String, required: true },
  paymentMethod: { type: String, default: 'Pay After Service' },
  paymentStatus: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' },
  bookingStatus: { type: String, enum: ['Pending', 'Confirmed', 'Technician Assigned', 'In Progress', 'Completed', 'Cancelled', 'Rescheduled'], default: 'Confirmed' },
  technician: {
    name: String,
    phone: String
  }
}, { timestamps: true });

// Coupon Schema
const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true },
  discountType: { type: String, enum: ['percentage', 'flat'], default: 'percentage' },
  discountValue: { type: Number, required: true },
  minimumOrder: { type: Number, default: 0 },
  maximumDiscount: { type: Number, default: 1000 },
  expiry: { type: String },
  usageLimit: { type: Number, default: 100 },
  usedCount: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
  description: { type: String }
}, { timestamps: true });

// Banner Schema
const bannerSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  description: { type: String },
  image: { type: String, required: true },
  cta: { type: String, default: 'Shop Now' },
  link: { type: String, default: '/products' },
  active: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 }
}, { timestamps: true });

// Review Schema
const reviewSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  verifiedPurchase: { type: Boolean, default: true },
  status: { type: String, enum: ['Approved', 'Pending', 'Hidden'], default: 'Approved' }
}, { timestamps: true });

// Inventory Log Schema
const inventoryLogSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  productName: { type: String },
  sku: { type: String },
  previousStock: { type: Number, required: true },
  newStock: { type: Number, required: true },
  difference: { type: Number, required: true },
  reason: { type: String, required: true },
  adminEmail: { type: String, required: true }
}, { timestamps: true });

// Audit Log Schema
const auditLogSchema = new mongoose.Schema({
  adminEmail: { type: String, required: true },
  action: { type: String, required: true },
  resource: { type: String, required: true },
  resourceId: { type: String },
  description: { type: String }
}, { timestamps: true });

module.exports = {
  User: mongoose.model('User', userSchema),
  Product: mongoose.model('Product', productSchema),
  Category: mongoose.model('Category', categorySchema),
  Brand: mongoose.model('Brand', brandSchema),
  Service: mongoose.model('Service', serviceSchema),
  Technician: mongoose.model('Technician', technicianSchema),
  Order: mongoose.model('Order', orderSchema),
  Booking: mongoose.model('Booking', bookingSchema),
  Coupon: mongoose.model('Coupon', couponSchema),
  Banner: mongoose.model('Banner', bannerSchema),
  Review: mongoose.model('Review', reviewSchema),
  InventoryLog: mongoose.model('InventoryLog', inventoryLogSchema),
  AuditLog: mongoose.model('AuditLog', auditLogSchema)
};
