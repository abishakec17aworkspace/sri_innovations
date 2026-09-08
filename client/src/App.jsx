import React from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { Navbar } from './components/navbar/Navbar';
import { Footer } from './components/common/Footer';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceBookingPage } from './pages/ServiceBookingPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { AccountPage } from './pages/AccountPage';
import { ComparePage } from './pages/ComparePage';
import { WishlistPage } from './pages/WishlistPage';
import { AuthPage } from './pages/AuthPage';
import { AboutPage, ContactPage, FAQPage } from './pages/StaticPages';
import { AdminDashboard, AdminLoginPage } from './admin/AdminDashboard';
import { useAuth } from './context/AuthContext';

// Customer Layout Shell with Navbar & Footer
const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

// Admin Protected Route
const AdminRoute = ({ children }) => {
  const { isAdminAuthenticated } = useAuth();
  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

export default function App() {
  return (
    <Routes>
      {/* Customer Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/category/:category" element={<ProductsPage />} />
        <Route path="/search" element={<ProductsPage />} />
        
        {/* Service Booking Module */}
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:id" element={<ServicesPage />} />
        <Route path="/service-booking/:id" element={<ServiceBookingPage />} />
        
        {/* Commerce Flow */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-success/:id" element={<OrderSuccessPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        
        {/* Account Hub */}
        <Route path="/account" element={<AccountPage />} />
        <Route path="/account/orders" element={<AccountPage />} />
        <Route path="/account/services" element={<AccountPage />} />
        <Route path="/account/addresses" element={<AccountPage />} />
        
        {/* Auth */}
        <Route path="/login" element={<AuthPage isRegister={false} />} />
        <Route path="/register" element={<AuthPage isRegister={true} />} />
        
        {/* Informational */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/shipping" element={<FAQPage />} />
        <Route path="/returns" element={<FAQPage />} />
        <Route path="/privacy" element={<FAQPage />} />
        <Route path="/terms" element={<FAQPage />} />
        
        {/* 404 Fallback */}
        <Route path="*" element={<HomePage />} />
      </Route>

      {/* Dedicated Admin Portal Routes */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route
        path="/admin/*"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
    </Routes>
  );
}
