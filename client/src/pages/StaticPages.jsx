import React, { useState } from 'react';
import { 
  Building2, Phone, Mail, MapPin, Clock, MessageSquare, 
  ShieldCheck, HelpCircle, ChevronDown, ExternalLink, Send
} from 'lucide-react';
import { STORE_CONFIG } from '../config/constants';

export const AboutPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-extrabold uppercase tracking-wider text-brand-accent">About Sri Innovations</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Premier Electronics Retail & Doorstep Service Hub
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Sri Innovations is a technology retail store, accessories provider, and professional hardware/electronics service provider based in Bangalore.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 bg-white rounded-3xl border border-slate-200 space-y-3">
          <Building2 className="w-8 h-8 text-brand-primary" />
          <h3 className="text-base font-bold text-slate-900">Electronics & Appliance Store</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Providing authentic 4K Smart TVs, double door refrigerators, washing machines, desktops, laptops, and certified peripherals directly backed by OEM brand warranty.
          </p>
        </div>

        <div className="p-6 bg-white rounded-3xl border border-slate-200 space-y-3">
          <ShieldCheck className="w-8 h-8 text-brand-primary" />
          <h3 className="text-base font-bold text-slate-900">High-Grade Accessories</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Curating premium GaN fast chargers, braided high-speed cables, military-grade mobile cases, noise cancelling earphones, and mechanical keyboards.
          </p>
        </div>

        <div className="p-6 bg-white rounded-3xl border border-slate-200 space-y-3">
          <Clock className="w-8 h-8 text-brand-primary" />
          <h3 className="text-base font-bold text-slate-900">Certified Repair Services</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Deploying verified hardware engineers for doorstep appliance gas charging, micro-soldering, TV display fixes, and laptop motherboard reballing with 90-day guarantee.
          </p>
        </div>
      </div>
    </div>
  );
};

export const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-wider text-brand-accent">Get in Touch</span>
        <h1 className="text-3xl font-extrabold text-slate-900">Contact Sri Innovations</h1>
        <p className="text-xs text-slate-500">Reach our sales desk or schedule doorstep technician support.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6">
          <h3 className="font-extrabold text-base text-slate-900 border-b border-slate-100 pb-3">Store Contact Info</h3>
          <div className="space-y-4 text-xs">
            <p className="flex items-start gap-3 text-slate-700">
              <MapPin className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
              <span>{STORE_CONFIG.address.line1}, {STORE_CONFIG.address.city}, {STORE_CONFIG.address.state} - {STORE_CONFIG.address.pincode}</span>
            </p>
            <p className="flex items-center gap-3 text-slate-700">
              <Phone className="w-4 h-4 text-brand-accent shrink-0" />
              <span>{STORE_CONFIG.phone}</span>
            </p>
            <p className="flex items-center gap-3 text-slate-700">
              <Mail className="w-4 h-4 text-brand-accent shrink-0" />
              <span>{STORE_CONFIG.email}</span>
            </p>
            <p className="flex items-center gap-3 text-slate-700">
              <Clock className="w-4 h-4 text-brand-accent shrink-0" />
              <span>Mon-Sat: {STORE_CONFIG.businessHours.weekdays} | Sun: {STORE_CONFIG.businessHours.sunday}</span>
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <a
              href={STORE_CONFIG.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-brand-primary text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-brand-primary-light transition-colors"
            >
              <span>View On Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200">
          {submitted ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">✓</div>
              <h3 className="font-bold text-base text-slate-900">Message Sent Successfully!</h3>
              <p className="text-xs text-slate-500">Our customer team will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
              <h3 className="font-extrabold text-base text-slate-900 border-b border-slate-100 pb-3">Send Inquiry</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Your Name" required className="text-xs p-2.5 rounded-xl border border-slate-300" />
                <input type="tel" placeholder="Your Mobile Number" required className="text-xs p-2.5 rounded-xl border border-slate-300" />
              </div>
              <input type="email" placeholder="Your Email Address" required className="w-full text-xs p-2.5 rounded-xl border border-slate-300" />
              <textarea rows={4} placeholder="How can we assist you with hardware or repair services?" required className="w-full text-xs p-3 rounded-xl border border-slate-300" />
              <button type="submit" className="bg-brand-accent hover:bg-brand-accent-hover text-white font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-accent">
                <span>Submit Inquiry</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    { q: 'How does Sri Innovations doorstep repair service work?', a: 'You select the service you need, choose a convenient 2-hour slot, and describe the issue. Our certified technician visits your doorstep equipped with testing tools and replacement components.' },
    { q: 'What warranty is provided on purchased electronics & appliances?', a: 'All products sold on Sri Innovations are 100% brand new, authentic, and backed by the manufacturer brand warranty with tax invoice.' },
    { q: 'How is identity information like Aadhaar handled?', a: 'We follow strict data protection. We only store the masked 4 digits (XXXX XXXX 1234) for technician identity confirmation at your premises. We never sell or share identity data.' },
    { q: 'What payment modes are accepted?', a: 'We accept UPI (GPay, PhonePe, Paytm), Credit/Debit Cards, Net Banking, and Cash on Delivery / Pay After Service.' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-wider text-brand-accent">Frequently Asked Questions</span>
        <h1 className="text-3xl font-extrabold text-slate-900">Got Questions? We've Got Answers</h1>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
              className="w-full text-left p-4 sm:p-5 flex items-center justify-between font-bold text-xs sm:text-sm text-slate-900"
            >
              <span>{faq.q}</span>
              <ChevronDown className={`w-4 h-4 text-brand-primary transition-transform ${openIndex === idx ? 'rotate-180' : ''}`} />
            </button>
            {openIndex === idx && (
              <div className="p-4 sm:p-5 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-50">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
