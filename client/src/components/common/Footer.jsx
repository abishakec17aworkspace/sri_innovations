import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, Mail, MapPin, Clock, ShieldCheck, 
  Truck, RefreshCw, Headphones, CreditCard, ChevronRight, ExternalLink
} from 'lucide-react';
import { STORE_CONFIG, PRODUCT_CATEGORIES } from '../../config/constants';

export const Footer = () => {
  return (
    <footer className="bg-brand-secondary text-slate-300 pt-16 pb-8 border-t-4 border-brand-accent">
      {/* Brand Value Props Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-slate-700/60">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/40 border border-slate-700/50">
            <div className="w-12 h-12 rounded-lg bg-brand-accent/20 text-brand-accent flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Free Express Shipping</h4>
              <p className="text-xs text-slate-400">On qualifying orders above ₹{STORE_CONFIG.shipping.freeThreshold}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/40 border border-slate-700/50">
            <div className="w-12 h-12 rounded-lg bg-brand-primary-light/20 text-blue-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">100% Genuine Guarantee</h4>
              <p className="text-xs text-slate-400">Authentic brand products & warranty</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/40 border border-slate-700/50">
            <div className="w-12 h-12 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Secure Payment Gateway</h4>
              <p className="text-xs text-slate-400">UPI, Cards, NetBanking & COD</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/40 border border-slate-700/50">
            <div className="w-12 h-12 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Dedicated Tech Support</h4>
              <p className="text-xs text-slate-400">Certified technicians ready to help</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand & Store Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block bg-white p-2.5 rounded-xl shadow-md">
              <img src="/logo.png" alt="Sri Innovations" className="h-12 w-auto object-contain" />
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              <strong>Sri Innovations</strong> is your trusted destination for cutting-edge electronics, consumer appliances, computers, gaming gear, high-grade mobile accessories, and certified doorstep repair services.
            </p>
            <div className="space-y-2 pt-2 text-xs">
              <p className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                <span>{STORE_CONFIG.address.line1}, {STORE_CONFIG.address.city}, {STORE_CONFIG.address.state} - {STORE_CONFIG.address.pincode}</span>
              </p>
              <p className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-brand-accent shrink-0" />
                <span>{STORE_CONFIG.phone}</span>
              </p>
              <p className="flex items-center gap-2.5 text-slate-300">
                <Mail className="w-4 h-4 text-brand-accent shrink-0" />
                <span>{STORE_CONFIG.email}</span>
              </p>
              <p className="flex items-center gap-2.5 text-slate-300">
                <Clock className="w-4 h-4 text-brand-accent shrink-0" />
                <span>Mon-Sat: {STORE_CONFIG.businessHours.weekdays} | Sun: {STORE_CONFIG.businessHours.sunday}</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-slate-700 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-white transition-colors flex items-center gap-1"><ChevronRight className="w-3 h-3 text-brand-accent" /> Home</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors flex items-center gap-1"><ChevronRight className="w-3 h-3 text-brand-accent" /> Browse Products</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors flex items-center gap-1"><ChevronRight className="w-3 h-3 text-brand-accent" /> Service Booking</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors flex items-center gap-1"><ChevronRight className="w-3 h-3 text-brand-accent" /> About Sri Innovations</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors flex items-center gap-1"><ChevronRight className="w-3 h-3 text-brand-accent" /> Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors flex items-center gap-1"><ChevronRight className="w-3 h-3 text-brand-accent" /> FAQs</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-slate-700 pb-2">
              Customer Support
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/account" className="hover:text-white transition-colors flex items-center gap-1"><ChevronRight className="w-3 h-3 text-brand-accent" /> My Account</Link></li>
              <li><Link to="/account/orders" className="hover:text-white transition-colors flex items-center gap-1"><ChevronRight className="w-3 h-3 text-brand-accent" /> Order Tracking</Link></li>
              <li><Link to="/account/services" className="hover:text-white transition-colors flex items-center gap-1"><ChevronRight className="w-3 h-3 text-brand-accent" /> Service History</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition-colors flex items-center gap-1"><ChevronRight className="w-3 h-3 text-brand-accent" /> Shipping Policy</Link></li>
              <li><Link to="/returns" className="hover:text-white transition-colors flex items-center gap-1"><ChevronRight className="w-3 h-3 text-brand-accent" /> Returns & Warranty</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors flex items-center gap-1"><ChevronRight className="w-3 h-3 text-brand-accent" /> Privacy & Identity Security</Link></li>
            </ul>
          </div>

          {/* Top Categories */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-slate-700 pb-2">
              Categories
            </h4>
            <ul className="space-y-2 text-xs">
              {PRODUCT_CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link to={`/category/${cat.slug}`} className="hover:text-white transition-colors flex items-center gap-1">
                    <ChevronRight className="w-3 h-3 text-brand-accent" /> {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Google Maps Location Embed & CTA */}
        <div className="mt-10 p-5 rounded-2xl bg-slate-800/80 border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-white font-bold text-sm flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-accent" /> Visit Our Sri Innovations Store
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">Explore physical inventory, demo smart appliances, or drop off hardware for instant diagnostic.</p>
          </div>
          <a
            href={STORE_CONFIG.googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-brand-accent hover:bg-brand-accent-hover text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-accent shrink-0"
          >
            <span>Get Google Maps Directions</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Copyright Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>© 2026 Sri Innovations. All Rights Reserved. Built for seamless commerce & professional service booking.</p>
        <div className="flex space-x-6">
          <Link to="/privacy" className="hover:text-slate-400">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-slate-400">Terms of Service</Link>
          <Link to="/admin/login" className="hover:text-brand-accent">Admin Portal</Link>
        </div>
      </div>
    </footer>
  );
};
