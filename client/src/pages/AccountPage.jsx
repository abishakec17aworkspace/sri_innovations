import React, { useState } from 'react';
import { 
  User, Package, Wrench, MapPin, Heart, 
  Clock, ShieldCheck, LogOut, ChevronRight, CheckCircle2, AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import { formatCurrency, formatDate } from '../utils/helpers';
import { Link } from 'react-router-dom';

export const AccountPage = () => {
  const { user, logoutCustomer, deleteAddress } = useAuth();
  const { orders, bookings, wishlist } = useStore();
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'services' | 'addresses' | 'profile'

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Please sign in to view your account</h2>
        <Link to="/login" className="inline-block bg-brand-primary text-white px-6 py-2.5 rounded-xl font-bold text-xs">
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-brand-secondary to-brand-primary rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-2xl font-extrabold text-brand-accent">
            {user.name?.charAt(0) || 'U'}
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold">{user.name}</h1>
            <p className="text-xs text-slate-300">{user.email} • {user.phone}</p>
          </div>
        </div>

        <button
          onClick={logoutCustomer}
          className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Navigation Sidebar (3 Cols) */}
        <aside className="lg:col-span-3 space-y-2">
          <div className="bg-white rounded-2xl border border-slate-200 p-3 space-y-1">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'orders' ? 'bg-brand-primary text-white' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Package className="w-4 h-4" /> My Orders
              </div>
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px]">{orders.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'services' ? 'bg-brand-primary text-white' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Wrench className="w-4 h-4" /> Service Bookings
              </div>
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px]">{bookings.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'addresses' ? 'bg-brand-primary text-white' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4" /> Saved Addresses
              </div>
              <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full text-[10px]">{user.addresses?.length || 0}</span>
            </button>

            <Link
              to="/wishlist"
              className="w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Heart className="w-4 h-4 text-rose-500" /> Wishlist
              </div>
              <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full text-[10px]">{wishlist.length}</span>
            </Link>
          </div>
        </aside>

        {/* Content Area (9 Cols) */}
        <div className="lg:col-span-9">
          
          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h2 className="text-lg font-extrabold text-slate-900">Order History ({orders.length})</h2>

              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 text-xs">
                    <div>
                      <span className="text-slate-500">Order ID: </span>
                      <strong className="text-brand-primary font-mono">{order.id}</strong>
                      <span className="text-slate-400 ml-3">{formatDate(order.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-blue-50 text-brand-primary font-bold px-2.5 py-0.5 rounded-full text-[11px]">
                        {order.orderStatus}
                      </span>
                      <span className="font-extrabold text-slate-900 text-sm">
                        {formatCurrency(order.total)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {order.items?.map(({ product, quantity }, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-xs">
                        <img src={product?.images?.[0]} alt="" className="w-12 h-12 object-contain p-1 bg-slate-50 rounded-lg border border-slate-100" />
                        <div>
                          <p className="font-bold text-slate-800 line-clamp-1">{product?.name}</p>
                          <p className="text-slate-500">Qty: {quantity} • {formatCurrency(product?.discountPrice || product?.price)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
                    <span className="text-slate-500">Payment: <strong>{order.paymentMethod}</strong> ({order.paymentStatus})</span>
                    <Link to={`/order-success/${order.id}`} className="font-bold text-brand-primary hover:underline">
                      View Printable Invoice →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Service Bookings Tab */}
          {activeTab === 'services' && (
            <div className="space-y-4">
              <h2 className="text-lg font-extrabold text-slate-900">Doorstep Service Bookings ({bookings.length})</h2>

              {bookings.map((booking) => (
                <div key={booking.id} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 text-xs">
                    <div>
                      <span className="text-slate-500">Booking ID: </span>
                      <strong className="text-brand-accent font-mono">{booking.id}</strong>
                      <span className="text-slate-400 ml-3">{formatDate(booking.createdAt)}</span>
                    </div>
                    <span className="bg-emerald-50 text-emerald-700 font-bold px-2.5 py-0.5 rounded-full text-[11px]">
                      {booking.bookingStatus}
                    </span>
                  </div>

                  <div className="text-xs space-y-1.5">
                    <p className="font-bold text-slate-900 text-sm">{booking.service?.name}</p>
                    <p className="text-slate-600"><strong>Appliance:</strong> {booking.productName} ({booking.brand} {booking.model})</p>
                    <p className="text-slate-600"><strong>Reported Problem:</strong> {booking.problemDescription}</p>
                    <p className="text-slate-600"><strong>Scheduled Slot:</strong> {booking.bookingDate} | {booking.timeSlot}</p>
                    <p className="text-slate-600"><strong>Masked Identity:</strong> <span className="font-mono text-emerald-600 font-semibold">{booking.aadhaarMasked}</span></p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-brand-primary" />
                      <span>Technician: <strong className="text-slate-800">{booking.technician?.name || 'Assigned Lead Technician'}</strong></span>
                    </div>
                    <span className="font-extrabold text-brand-primary">{formatCurrency(booking.service?.startingPrice)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === 'addresses' && (
            <div className="space-y-4">
              <h2 className="text-lg font-extrabold text-slate-900">Saved Addresses</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {user.addresses?.map((addr) => (
                  <div key={addr.id} className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2 text-xs">
                    <div className="flex justify-between items-start">
                      <strong className="text-slate-900 font-bold">{addr.name}</strong>
                      <span className="bg-slate-100 text-slate-700 text-[10px] px-2 py-0.5 rounded">{addr.addressType}</span>
                    </div>
                    <p className="text-slate-600">{addr.house}, {addr.street}</p>
                    <p className="text-slate-600">{addr.city}, {addr.state} - {addr.pincode}</p>
                    <p className="text-slate-500 font-mono">Phone: {addr.phone}</p>
                    <button
                      onClick={() => deleteAddress(addr.id)}
                      className="text-rose-600 hover:underline pt-2 font-bold block"
                    >
                      Delete Address
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
