import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, MapPin, CreditCard, Truck, CheckCircle2, 
  ArrowRight, User, AlertCircle, Lock
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { STORE_CONFIG } from '../config/constants';
import { formatCurrency } from '../utils/helpers';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, cartSubtotal, appliedCoupon, placeOrder } = useStore();
  const { user, addAddress } = useAuth();

  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('UPI / Razorpay'); // 'UPI / Razorpay' | 'Card' | 'COD'
  const [isProcessing, setIsProcessing] = useState(false);

  // New address quick form
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [newAddr, setNewAddr] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    house: '',
    street: '',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560001',
    addressType: 'Home',
    isDefault: true
  });

  const discountAmount = appliedCoupon ? appliedCoupon.calculatedDiscount : 0;
  const shippingFee = cartSubtotal >= STORE_CONFIG.shipping.freeThreshold ? 0 : STORE_CONFIG.shipping.standardFee;
  const taxAmount = Math.round((cartSubtotal - discountAmount) * (STORE_CONFIG.taxRatePercentage / 100));
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  const addresses = user?.addresses || [
    {
      id: 'addr-default',
      name: user?.name || 'Ramesh Kumar',
      phone: user?.phone || '+91 98450 12345',
      house: 'Flat 402, Green Valley Apartments',
      street: '14th Cross, 8th Main, Indiranagar',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560038',
      addressType: 'Home',
      isDefault: true
    }
  ];

  const handleCreateOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      navigate('/cart');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const order = placeOrder({
        user: { name: user?.name || 'Guest User', email: user?.email || 'customer@sriinnovations.com' },
        items: cart,
        subtotal: cartSubtotal,
        discount: discountAmount,
        shippingFee: shippingFee,
        tax: taxAmount,
        total: finalTotal,
        paymentMethod: paymentMethod,
        paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Paid',
        shippingAddress: addresses[selectedAddressIndex] || addresses[0]
      });

      setIsProcessing(false);
      navigate(`/order-success/${order.id}`);
    }, 1200);
  };

  const handleAddNewAddress = (e) => {
    e.preventDefault();
    addAddress(newAddr);
    setShowAddAddressModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Secure Multi-Step Checkout
          </h1>
          <p className="text-xs text-slate-500 mt-1">Review shipping address and choose secure payment method</p>
        </div>
        <div className="flex items-center gap-1 text-xs text-emerald-600 font-bold bg-emerald-50 px-3 py-1.5 rounded-full">
          <Lock className="w-3.5 h-3.5" /> 256-Bit SSL Encrypted
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Checkout Steps (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Step 1: Shipping Address Selection */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-primary" /> 1. Delivery Address
              </h3>
              <button
                type="button"
                onClick={() => setShowAddAddressModal(true)}
                className="text-xs text-brand-accent font-bold hover:underline"
              >
                + Add New Address
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {addresses.map((addr, idx) => (
                <div
                  key={addr.id || idx}
                  onClick={() => setSelectedAddressIndex(idx)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedAddressIndex === idx
                      ? 'border-brand-primary bg-blue-50/40 ring-2 ring-brand-primary/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-start text-xs font-bold text-slate-900 mb-1">
                    <span>{addr.name}</span>
                    <span className="bg-slate-200 text-slate-700 text-[10px] px-2 py-0.5 rounded">
                      {addr.addressType}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">{addr.house}, {addr.street}</p>
                  <p className="text-xs text-slate-600">{addr.city}, {addr.state} - {addr.pincode}</p>
                  <p className="text-xs text-slate-500 font-mono mt-2">Phone: {addr.phone}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Step 2: Payment Method */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <CreditCard className="w-4 h-4 text-brand-primary" /> 2. Select Payment Method
            </h3>

            <div className="space-y-3">
              <label className={`p-4 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                paymentMethod === 'UPI / Razorpay' ? 'border-brand-primary bg-blue-50/40 ring-1 ring-brand-primary' : 'border-slate-200'
              }`}>
                <input
                  type="radio"
                  name="payment"
                  value="UPI / Razorpay"
                  checked={paymentMethod === 'UPI / Razorpay'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="accent-brand-primary"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">UPI Instant Payment (GPay, PhonePe, Paytm, BHIM)</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">Recommended</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">Zero extra fees, instant verification</p>
                </div>
              </label>

              <label className={`p-4 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                paymentMethod === 'Card' ? 'border-brand-primary bg-blue-50/40 ring-1 ring-brand-primary' : 'border-slate-200'
              }`}>
                <input
                  type="radio"
                  name="payment"
                  value="Card"
                  checked={paymentMethod === 'Card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="accent-brand-primary"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900">Credit / Debit Card & Net Banking</span>
                  <p className="text-[11px] text-slate-500 mt-0.5">Visa, MasterCard, RuPay & all major banks</p>
                </div>
              </label>

              <label className={`p-4 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                paymentMethod === 'COD' ? 'border-brand-primary bg-blue-50/40 ring-1 ring-brand-primary' : 'border-slate-200'
              }`}>
                <input
                  type="radio"
                  name="payment"
                  value="COD"
                  checked={paymentMethod === 'COD'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="accent-brand-primary"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900">Cash on Delivery / Pay at Store</span>
                  <p className="text-[11px] text-slate-500 mt-0.5">Pay in cash or UPI when order is handed over</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Order Summary Column (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
            <h3 className="font-extrabold text-base text-slate-900 border-b border-slate-100 pb-3">
              Items in Order ({cart.length})
            </h3>

            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {cart.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-700">{quantity}x</span>
                    <span className="text-slate-800 line-clamp-1 max-w-[150px]">{product.name}</span>
                  </div>
                  <span className="font-extrabold text-slate-900">
                    {formatCurrency((product.discountPrice || product.price) * quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>{formatCurrency(cartSubtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount</span>
                  <span>- {formatCurrency(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span>{shippingFee === 0 ? 'FREE' : formatCurrency(shippingFee)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Estimated GST</span>
                <span>{formatCurrency(taxAmount)}</span>
              </div>
              <div className="pt-3 border-t border-slate-200 flex justify-between text-base font-extrabold text-slate-900">
                <span>Total Due</span>
                <span className="text-brand-primary">{formatCurrency(finalTotal)}</span>
              </div>
            </div>

            <button
              onClick={handleCreateOrder}
              disabled={isProcessing}
              className="w-full bg-brand-accent hover:bg-brand-accent-hover text-white font-extrabold py-3.5 rounded-xl text-xs sm:text-sm transition-all shadow-accent flex items-center justify-center gap-2"
            >
              {isProcessing ? 'Processing Secure Payment...' : 'Place Order & Pay Now'}
            </button>
          </div>
        </div>

      </div>

      {/* Quick Add Address Modal */}
      {showAddAddressModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <form onSubmit={handleAddNewAddress} className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4">
            <h3 className="font-bold text-sm text-slate-900">Add New Delivery Address</h3>
            <div className="space-y-3 text-xs">
              <input
                type="text"
                placeholder="Receiver Full Name"
                required
                value={newAddr.name}
                onChange={(e) => setNewAddr({ ...newAddr, name: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                required
                value={newAddr.phone}
                onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300"
              />
              <input
                type="text"
                placeholder="Flat / House No. / Building"
                required
                value={newAddr.house}
                onChange={(e) => setNewAddr({ ...newAddr, house: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300"
              />
              <input
                type="text"
                placeholder="Street / Area / Landmark"
                required
                value={newAddr.street}
                onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="City"
                  value={newAddr.city}
                  onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                  className="p-2.5 rounded-xl border border-slate-300"
                />
                <input
                  type="text"
                  placeholder="Pincode"
                  required
                  value={newAddr.pincode}
                  onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                  className="p-2.5 rounded-xl border border-slate-300"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddAddressModal(false)}
                className="px-4 py-2 rounded-xl text-xs text-slate-600 hover:bg-slate-100 font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-brand-primary text-white px-4 py-2 rounded-xl text-xs font-bold"
              >
                Save Address
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
