import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, ShoppingCart, Heart, User, Menu, X, ChevronDown, 
  Wrench, PhoneCall, ShieldCheck, MapPin, Sparkles, Scale, LogOut, LayoutDashboard
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';
import { PRODUCT_CATEGORIES, STORE_CONFIG } from '../../config/constants';

export const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  
  const { cartCount, wishlist, compareList } = useStore();
  const { user, adminUser, isAuthenticated, isAdminAuthenticated, logoutCustomer } = useAuth();
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      {/* Top Announcement Bar */}
      <div className="bg-brand-secondary text-slate-200 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-accent" />
              100% Genuine Electronics & Certified Repair Hub
            </span>
            <span className="flex items-center gap-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-brand-accent" />
              Store: <a href={STORE_CONFIG.googleMapsUrl} target="_blank" rel="noreferrer" className="hover:underline text-white font-medium">Bangalore Flagship Center</a>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/services" className="hover:text-brand-accent transition-colors flex items-center gap-1 text-brand-accent font-medium">
              <Wrench className="w-3.5 h-3.5" /> Book Doorstep Service
            </Link>
            <span className="text-slate-500">|</span>
            <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
            {isAdminAuthenticated ? (
              <Link to="/admin/dashboard" className="bg-brand-accent text-white px-2 py-0.5 rounded text-[11px] font-semibold hover:bg-brand-accent-hover transition-colors">
                Admin Panel
              </Link>
            ) : (
              <Link to="/admin/login" className="text-slate-400 hover:text-white transition-colors text-[11px]">
                Admin Portal
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <img 
              src="/logo.png" 
              alt="Sri Innovations Logo" 
              className="h-14 w-auto object-contain transition-transform group-hover:scale-105" 
            />
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-xl mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search TV, Laptops, Mobile Accessories, Refrigerators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-2.5 rounded-full border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent text-sm transition-all"
              />
              <button 
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-brand-primary hover:bg-brand-primary-light text-white p-2 rounded-full transition-colors"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Actions & Utilities */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Wishlist */}
            <Link 
              to="/wishlist" 
              className="relative p-2 text-slate-700 hover:text-brand-primary transition-colors"
              title="Wishlist"
            >
              <Heart className="w-6 h-6" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link 
              to="/cart" 
              className="relative p-2 text-slate-700 hover:text-brand-primary transition-colors"
              title="Cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Customer Account / Dropdown */}
            <div className="relative">
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-left"
                  >
                    <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold text-xs">
                      {user.name?.charAt(0) || 'U'}
                    </div>
                    <div className="hidden lg:block text-xs">
                      <p className="font-semibold text-slate-800 line-clamp-1">{user.name}</p>
                      <p className="text-slate-500">My Account</p>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden lg:block" />
                  </button>

                  {isAccountDropdownOpen && (
                    <div 
                      className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50"
                      onMouseLeave={() => setIsAccountDropdownOpen(false)}
                    >
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="text-xs font-bold text-slate-800">{user.name}</p>
                        <p className="text-[11px] text-slate-500">{user.email}</p>
                      </div>
                      <Link to="/account" onClick={() => setIsAccountDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-brand-primary">
                        <User className="w-4 h-4" /> Account Dashboard
                      </Link>
                      <Link to="/account/orders" onClick={() => setIsAccountDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-brand-primary">
                        <ShoppingCart className="w-4 h-4" /> My Orders
                      </Link>
                      <Link to="/account/services" onClick={() => setIsAccountDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-brand-primary">
                        <Wrench className="w-4 h-4" /> Service Bookings
                      </Link>
                      <button
                        onClick={() => {
                          logoutCustomer();
                          setIsAccountDropdownOpen(false);
                        }}
                        className="flex items-center gap-2 w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 border-t border-slate-100 mt-1"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-1.5 bg-brand-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-brand-primary-light transition-colors shadow-sm"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign In</span>
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 md:hidden"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Secondary Navigation Row (MegaMenu & Categories) */}
        <nav className="hidden md:flex items-center justify-between py-2.5 border-t border-slate-100 text-sm font-medium">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-slate-800 hover:text-brand-primary transition-colors font-semibold">
              Home
            </Link>

            {/* Products with MegaMenu dropdown trigger */}
            <div 
              className="relative group"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
            >
              <button className="flex items-center gap-1 text-slate-800 group-hover:text-brand-primary py-1 font-semibold transition-colors">
                Categories <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-brand-primary transition-transform group-hover:rotate-180" />
              </button>

              {/* Mega Menu Dropdown */}
              {isMegaMenuOpen && (
                <div className="absolute top-full left-0 w-[850px] bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 z-50 grid grid-cols-4 gap-6 animate-in fade-in slide-in-from-top-2 duration-200">
                  {PRODUCT_CATEGORIES.map((cat) => (
                    <div key={cat.id} className="space-y-2">
                      <Link 
                        to={`/category/${cat.slug}`}
                        onClick={() => setIsMegaMenuOpen(false)}
                        className="font-bold text-slate-900 hover:text-brand-accent text-sm block border-b border-slate-100 pb-1"
                      >
                        {cat.name}
                      </Link>
                      <ul className="space-y-1.5 text-xs text-slate-600">
                        {cat.subcategories.slice(0, 4).map((sub) => (
                          <li key={sub}>
                            <Link 
                              to={`/products?category=${cat.slug}&subcategory=${encodeURIComponent(sub)}`}
                              onClick={() => setIsMegaMenuOpen(false)}
                              className="hover:text-brand-primary transition-colors block"
                            >
                              {sub}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  
                  {/* Mega Menu Promo Card */}
                  <div className="col-span-4 bg-gradient-to-r from-brand-secondary to-brand-primary text-white p-4 rounded-xl flex items-center justify-between mt-2">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-brand-accent">Official Service Hub</span>
                      <h4 className="font-bold text-base mt-0.5">Need Electronics or Hardware Fixed?</h4>
                      <p className="text-xs text-slate-200">Book certified doorstep repair technicians with 90-day guarantee.</p>
                    </div>
                    <Link
                      to="/services"
                      onClick={() => setIsMegaMenuOpen(false)}
                      className="bg-brand-accent hover:bg-brand-accent-hover text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
                    >
                      Book Service
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link to="/products" className="text-slate-700 hover:text-brand-primary transition-colors">
              All Products
            </Link>
            <Link to="/services" className="text-slate-700 hover:text-brand-primary transition-colors flex items-center gap-1.5 font-semibold text-brand-primary">
              <Wrench className="w-4 h-4 text-brand-accent" />
              Repair Services
            </Link>
            <Link to="/products?filter=offers" className="text-brand-accent font-semibold hover:text-brand-accent-hover transition-colors flex items-center gap-1">
              <Sparkles className="w-4 h-4" /> Top Deals & Offers
            </Link>
          </div>

          <div className="flex items-center space-x-6 text-xs text-slate-600">
            <a href={`tel:${STORE_CONFIG.phone}`} className="flex items-center gap-1.5 hover:text-brand-primary">
              <PhoneCall className="w-3.5 h-3.5 text-brand-accent" />
              <span>Customer Help: <strong className="text-slate-800">{STORE_CONFIG.phone}</strong></span>
            </a>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 md:hidden animate-fade-in">
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white shadow-2xl p-6 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <img src="/logo.png" alt="Sri Innovations" className="h-10 w-auto object-contain" />
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded-lg text-slate-500 hover:bg-slate-100"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Search */}
              <form onSubmit={(e) => { handleSearchSubmit(e); setIsMobileMenuOpen(false); }} className="mt-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search electronics & services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-3 pr-10 py-2 rounded-lg border border-slate-200 text-sm"
                  />
                  <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500">
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </form>

              {/* Mobile Nav Links */}
              <div className="mt-6 space-y-3">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-slate-800 font-semibold border-b border-slate-50">
                  Home
                </Link>
                <Link to="/products" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-slate-800 font-semibold border-b border-slate-50">
                  Browse All Products
                </Link>
                <Link to="/services" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-brand-primary font-bold border-b border-slate-50 flex items-center justify-between">
                  <span>Repair Services</span>
                  <span className="bg-brand-accent text-white text-[10px] px-2 py-0.5 rounded-full font-bold">Doorstep</span>
                </Link>
                <Link to="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-slate-800 border-b border-slate-50">
                  Wishlist ({wishlist.length})
                </Link>
                <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-slate-800 border-b border-slate-50">
                  Cart ({cartCount})
                </Link>
                
                <div className="pt-2">
                  <p className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">Categories</p>
                  {PRODUCT_CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/category/${cat.slug}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-1.5 text-xs text-slate-600 hover:text-brand-primary"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Mobile Account & Admin */}
            <div className="pt-6 border-t border-slate-200">
              {isAuthenticated ? (
                <Link
                  to="/account"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-2 bg-slate-50 rounded-xl mb-3"
                >
                  <div className="w-9 h-9 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold">
                    {user.name?.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{user.name}</p>
                    <p className="text-[11px] text-slate-500">Go to Account</p>
                  </div>
                </Link>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center bg-brand-primary text-white py-2.5 rounded-xl font-bold text-sm mb-3"
                >
                  Sign In / Register
                </Link>
              )}

              <Link
                to="/admin/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 text-xs text-slate-500 hover:text-brand-primary py-1"
              >
                <LayoutDashboard className="w-3.5 h-3.5" /> Staff & Admin Portal
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
