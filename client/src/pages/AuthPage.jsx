import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, UserPlus, Lock, Mail, User, Phone, ArrowRight, ShieldCheck, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthPage = ({ isRegister = false }) => {
  const [mode, setMode] = useState(isRegister ? 'register' : 'login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { loginCustomer, registerCustomer } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    try {
      if (mode === 'login') {
        if (!formData.email || !formData.password) {
          setError('Please fill in all fields.');
          return;
        }
        loginCustomer(formData.email, formData.password);
        navigate('/account');
      } else {
        if (!formData.name || !formData.email || !formData.password) {
          setError('Please fill in all required registration fields.');
          return;
        }
        registerCustomer(formData);
        navigate('/account');
      }
    } catch (err) {
      setError(err.message || 'Authentication error.');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-6 relative">
      <div className="text-center space-y-2">
        <img src="/logo.png" alt="Sri Innovations" className="h-12 w-auto object-contain mx-auto" />
        <h1 className="text-2xl font-extrabold text-slate-900">
          {mode === 'login' ? 'Sign In to Sri Innovations' : 'Create Customer Account'}
        </h1>
        <p className="text-xs text-slate-500">
          {mode === 'login' 
            ? 'Manage orders, track service bookings, and save delivery addresses.'
            : 'Join Sri Innovations for seamless commerce & certified doorstep service.'}
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 relative">
        
        {/* Close Button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          title="Close & Return to Store"
        >
          <X className="w-5 h-5" />
        </button>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ramesh Kumar"
                  className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="customer@example.com"
                className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Phone</label>
              <div className="relative">
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98450 12345"
                  className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-brand-primary hover:bg-brand-primary-light text-white font-bold py-3 rounded-xl text-xs sm:text-sm transition-all shadow-brand flex items-center justify-center gap-2"
          >
            <span>{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-slate-600 border-t border-slate-100">
          {mode === 'login' ? (
            <p>
              Don't have an account yet?{' '}
              <button
                onClick={() => setMode('register')}
                className="text-brand-accent font-bold hover:underline"
              >
                Register Here
              </button>
            </p>
          ) : (
            <p>
              Already registered?{' '}
              <button
                onClick={() => setMode('login')}
                className="text-brand-primary font-bold hover:underline"
              >
                Sign In
              </button>
            </p>
          )}
        </div>

        {/* Discreet Staff & Admin Portal Link */}
        <div className="pt-4 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-400 mb-1.5">Are you a Sri Innovations administrator or staff member?</p>
          <Link
            to="/admin/login"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-primary hover:text-brand-accent transition-colors bg-slate-50 hover:bg-slate-100 px-3.5 py-1.5 rounded-xl border border-slate-200"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-brand-accent" />
            <span>Go to Admin Portal →</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
