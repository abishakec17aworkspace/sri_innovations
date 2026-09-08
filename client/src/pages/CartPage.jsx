import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingCart, ArrowRight, Tag, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { STORE_CONFIG } from '../config/constants';
import { formatCurrency } from '../utils/helpers';

export const CartPage = () => {
  const { 
    cart, updateCartQuantity, removeFromCart, clearCart, 
    cartSubtotal, appliedCoupon, applyCouponCode, removeCoupon 
  } = useStore();
  
  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState(null);
  const navigate = useNavigate();

  const discountAmount = appliedCoupon ? appliedCoupon.calculatedDiscount : 0;
  const shippingFee = cartSubtotal >= STORE_CONFIG.shipping.freeThreshold || cartSubtotal === 0 ? 0 : STORE_CONFIG.shipping.standardFee;
  const taxAmount = Math.round((cartSubtotal - discountAmount) * (STORE_CONFIG.taxRatePercentage / 100));
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCouponCode(couponInput, cartSubtotal);
    setCouponMessage(res);
    if (res.success) {
      setCouponInput('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
          <ShoppingCart className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900">Your Cart is Empty</h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
          Explore our wide selection of 4K TVs, refrigerators, computers, laptops, and audio gear.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primary-light text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm transition-all shadow-brand"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Shopping Cart ({cart.reduce((a, b) => a + b.quantity, 0)} Items)
        </h1>
        <button
          onClick={clearCart}
          className="text-xs text-rose-600 hover:underline font-bold"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart Items Table (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 shadow-sm justify-between"
            >
              {/* Image & Title */}
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="w-20 h-20 object-contain p-2 bg-slate-50 rounded-xl border border-slate-100 shrink-0"
                />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-primary-light">{product.brand}</span>
                  <Link to={`/products/${product.id}`} className="block">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2 hover:text-brand-primary">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-xs font-extrabold text-slate-900 mt-1">
                    {formatCurrency(product.discountPrice || product.price)}
                  </p>
                </div>
              </div>

              {/* Quantity Controls & Remove */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => updateCartQuantity(product.id, quantity - 1)}
                    className="px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-100 font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-bold text-slate-800">{quantity}</span>
                  <button
                    onClick={() => updateCartQuantity(product.id, quantity + 1)}
                    className="px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-100 font-bold"
                  >
                    +
                  </button>
                </div>

                <span className="text-sm font-extrabold text-slate-900 w-24 text-right">
                  {formatCurrency((product.discountPrice || product.price) * quantity)}
                </span>

                <button
                  onClick={() => removeFromCart(product.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-primary hover:underline pt-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
          </Link>
        </div>

        {/* Order Summary & Coupon (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Coupon Box */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-brand-accent" /> Apply Coupon Code
            </h4>
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                placeholder="e.g. SRI100"
                className="flex-1 text-xs uppercase p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
              <button
                type="submit"
                className="bg-brand-primary hover:bg-brand-primary-light text-white font-bold px-4 py-2 rounded-xl text-xs"
              >
                Apply
              </button>
            </form>

            {couponMessage && (
              <p className={`text-[11px] font-semibold ${couponMessage.success ? 'text-emerald-600' : 'text-rose-600'}`}>
                {couponMessage.message}
              </p>
            )}

            {appliedCoupon && (
              <div className="flex items-center justify-between p-2 bg-emerald-50 rounded-xl text-xs text-emerald-800 font-semibold">
                <span>Code <strong>{appliedCoupon.code}</strong> applied (-{formatCurrency(discountAmount)})</span>
                <button onClick={removeCoupon} className="text-xs text-rose-600 hover:underline">Remove</button>
              </div>
            )}
          </div>

          {/* Pricing Breakdown */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
            <h3 className="font-extrabold text-base text-slate-900 border-b border-slate-100 pb-3">
              Order Summary
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-bold text-slate-800">{formatCurrency(cartSubtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Coupon Discount</span>
                  <span>- {formatCurrency(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600">
                <span>Delivery Fee</span>
                <span>{shippingFee === 0 ? <strong className="text-emerald-600">FREE</strong> : formatCurrency(shippingFee)}</span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Estimated GST Included</span>
                <span>{formatCurrency(taxAmount)}</span>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-between text-base font-extrabold text-slate-900">
                <span>Final Total</span>
                <span className="text-brand-primary">{formatCurrency(finalTotal)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-brand-accent hover:bg-brand-accent-hover text-white font-extrabold py-3.5 rounded-xl text-xs sm:text-sm transition-all shadow-accent flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Safe & Encrypted 256-Bit Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
