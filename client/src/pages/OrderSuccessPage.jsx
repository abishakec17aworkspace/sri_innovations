import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Package, ArrowRight, Printer, MapPin, Truck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatCurrency, formatDate } from '../utils/helpers';

export const OrderSuccessPage = () => {
  const { id } = useParams();
  const { orders } = useStore();

  const order = orders.find(o => o.id === id) || orders[0];

  const handlePrintInvoice = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      {/* Confirmation Header */}
      <div className="text-center space-y-3">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">Thank You for Your Order!</h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Your order has been placed successfully and is being prepped for shipment.
        </p>
        <div className="inline-block bg-slate-100 px-4 py-1.5 rounded-full text-xs font-mono font-bold text-slate-800">
          Order Reference: <span className="text-brand-primary">{order?.id}</span>
        </div>
      </div>

      {/* Order Summary Card / Invoice */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 print:border-none print:shadow-none">
        
        {/* Printable Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Sri Innovations" className="h-10 w-auto object-contain" />
            <div>
              <p className="text-xs font-bold text-slate-800">Sri Innovations Tax Invoice</p>
              <p className="text-[10px] text-slate-500">Date: {formatDate(order?.createdAt)}</p>
            </div>
          </div>

          <button
            onClick={handlePrintInvoice}
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors print:hidden"
          >
            <Printer className="w-3.5 h-3.5" /> Print Invoice
          </button>
        </div>

        {/* Shipping & Payment Meta */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-xl space-y-1">
            <strong className="block text-slate-900 font-bold mb-1">Delivering To:</strong>
            <p className="font-semibold text-slate-800">{order?.shippingAddress?.name}</p>
            <p className="text-slate-600">{order?.shippingAddress?.house}, {order?.shippingAddress?.street}</p>
            <p className="text-slate-600">{order?.shippingAddress?.city}, {order?.shippingAddress?.state} - {order?.shippingAddress?.pincode}</p>
            <p className="text-slate-500 font-mono mt-1">Phone: {order?.shippingAddress?.phone}</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl space-y-1">
            <strong className="block text-slate-900 font-bold mb-1">Payment & Shipping Details:</strong>
            <p className="text-slate-600">Payment Mode: <strong className="text-slate-800">{order?.paymentMethod}</strong></p>
            <p className="text-slate-600">Payment Status: <strong className="text-emerald-600">{order?.paymentStatus}</strong></p>
            <p className="text-slate-600">Order Status: <strong className="text-brand-primary">{order?.orderStatus}</strong></p>
            <p className="text-slate-600">Estimated Delivery: <strong>2-4 Business Days</strong></p>
          </div>
        </div>

        {/* Items Table */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">Purchased Items</h4>
          <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
            {order?.items?.map(({ product, quantity, price }, idx) => (
              <div key={idx} className="p-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-slate-500">{quantity}x</span>
                  <div>
                    <span className="font-bold text-slate-800 line-clamp-1">{product?.name}</span>
                    <span className="text-[10px] text-slate-400">SKU: {product?.sku}</span>
                  </div>
                </div>
                <span className="font-extrabold text-slate-900">
                  {formatCurrency((product?.discountPrice || product?.price || price) * quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="space-y-2 pt-2 text-xs text-right border-t border-slate-100">
          <p className="text-slate-600">Subtotal: <strong>{formatCurrency(order?.subtotal)}</strong></p>
          {order?.discount > 0 && <p className="text-emerald-600 font-semibold">Discount Applied: -{formatCurrency(order?.discount)}</p>}
          <p className="text-slate-600">Shipping: <strong>{order?.shippingFee === 0 ? 'FREE' : formatCurrency(order?.shippingFee)}</strong></p>
          <p className="text-slate-600">GST (18% included): <strong>{formatCurrency(order?.tax)}</strong></p>
          <p className="text-base font-extrabold text-slate-900 pt-2 border-t border-slate-200">
            Total Paid: <span className="text-brand-primary">{formatCurrency(order?.total)}</span>
          </p>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="flex justify-center gap-4 print:hidden">
        <Link
          to="/account/orders"
          className="bg-brand-primary hover:bg-brand-primary-light text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm transition-all shadow-brand flex items-center gap-2"
        >
          <Package className="w-4 h-4" />
          <span>Track in My Orders</span>
        </Link>

        <Link
          to="/products"
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 py-3 rounded-xl text-xs sm:text-sm transition-all"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};
