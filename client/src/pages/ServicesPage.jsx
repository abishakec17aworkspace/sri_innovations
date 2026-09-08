import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, ShieldCheck, Clock, CheckCircle2, PhoneCall, ArrowRight, Zap, HelpCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ServiceCard } from '../components/service/ServiceCard';
import { STORE_CONFIG } from '../config/constants';

export const ServicesPage = () => {
  const { services } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-brand-secondary via-brand-primary to-brand-primary-light rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-2xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-brand-accent text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Wrench className="w-3.5 h-3.5" /> Sri Innovations Service Division
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight text-white">
            Professional Electronics & Hardware Repair Services
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            Certified doorstep repair, chip-level motherboard diagnostics, appliance cooling restoration, and display replacements. Transparent pricing with genuine brand spare parts and 90-day service warranty.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <a
              href={`tel:${STORE_CONFIG.phone}`}
              className="bg-brand-accent hover:bg-brand-accent-hover text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm transition-all shadow-accent flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Direct Hotline: {STORE_CONFIG.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between">
          <div>
            <span className="text-xs font-bold text-brand-accent uppercase tracking-wider">Available Repair Offerings</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Select a Service to Book</h2>
          </div>
          <p className="text-xs text-slate-500 mt-2 sm:mt-0">Doorstep technicians assigned within 2 hours</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>

      {/* Why Choose Sri Innovations Service Hub */}
      <div className="bg-slate-50 rounded-3xl border border-slate-200 p-8 sm:p-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-extrabold uppercase text-brand-accent tracking-wider">Sri Innovations Guarantee</span>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-1">Why Trust Us With Your Equipment?</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 space-y-2">
            <ShieldCheck className="w-8 h-8 text-brand-primary" />
            <h4 className="font-bold text-sm text-slate-900">90-Day Warranty</h4>
            <p className="text-xs text-slate-500">Every replaced component is backed by our official 90-day hassle-free service guarantee.</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 space-y-2">
            <Zap className="w-8 h-8 text-brand-primary" />
            <h4 className="font-bold text-sm text-slate-900">Genuine Spares Only</h4>
            <p className="text-xs text-slate-500">We source only OEM certified electronic relays, ICs, backlight strips, and capacitors.</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 space-y-2">
            <Clock className="w-8 h-8 text-brand-primary" />
            <h4 className="font-bold text-sm text-slate-900">Convenient Time Slots</h4>
            <p className="text-xs text-slate-500">Pick the exact 2-hour window that fits your schedule with live status tracking.</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 space-y-2">
            <Wrench className="w-8 h-8 text-brand-primary" />
            <h4 className="font-bold text-sm text-slate-900">Expert Engineers</h4>
            <p className="text-xs text-slate-500">Trained and background-verified technicians equipped with high precision multimeters and soldering gear.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
