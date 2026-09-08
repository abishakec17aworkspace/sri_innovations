import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Wrench, Calendar, Clock, MapPin, Shield, CheckCircle2, 
  Upload, User, Phone, Mail, AlertCircle, ArrowRight
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { SERVICE_TIME_SLOTS } from '../config/constants';
import { formatCurrency, maskAadhaar } from '../utils/helpers';

export const ServiceBookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { services, createBooking } = useStore();
  const { user } = useAuth();

  const service = services.find(s => s.id === id) || services[0];

  const [formData, setFormData] = useState({
    customerName: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    productName: '',
    brand: '',
    model: '',
    problemDescription: '',
    bookingDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    timeSlot: SERVICE_TIME_SLOTS[0],
    address: user?.addresses?.[0] ? `${user.addresses[0].house}, ${user.addresses[0].street}, ${user.addresses[0].city} - ${user.addresses[0].pincode}` : '',
    aadhaarRaw: '',
    paymentMethod: 'Pay After Service' // 'Pay After Service' | 'Online Advance'
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successBooking, setSuccessBooking] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB limit.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.phone || !formData.problemDescription || !formData.address) {
      alert('Please fill out all required details (Name, Phone, Problem Description, Address).');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newBooking = createBooking({
        service,
        customerName: formData.customerName,
        phone: formData.phone,
        email: formData.email,
        productName: formData.productName || service.category,
        brand: formData.brand,
        model: formData.model,
        problemDescription: formData.problemDescription,
        productImage: imagePreview,
        address: formData.address,
        bookingDate: formData.bookingDate,
        timeSlot: formData.timeSlot,
        aadhaarMasked: maskAadhaar(formData.aadhaarRaw),
        paymentMethod: formData.paymentMethod,
        paymentStatus: formData.paymentMethod === 'Online Advance' ? 'Paid' : 'Pending'
      });

      setIsSubmitting(false);
      setSuccessBooking(newBooking);
    }, 1000);
  };

  if (successBooking) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">Service Booking Confirmed!</h1>
        <p className="text-sm text-slate-600">
          Booking ID: <strong className="text-brand-primary font-mono">{successBooking.id}</strong>
        </p>
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200 text-left text-xs space-y-3">
          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-500">Service:</span>
            <span className="font-bold text-slate-900">{successBooking.service.name}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-500">Scheduled Date & Slot:</span>
            <span className="font-bold text-slate-900">{successBooking.bookingDate} ({successBooking.timeSlot})</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-500">Inspection Fee:</span>
            <span className="font-bold text-brand-primary">{formatCurrency(successBooking.service.startingPrice)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Technician Assigned:</span>
            <span className="font-bold text-emerald-600">{successBooking.technician?.name}</span>
          </div>
        </div>

        <div className="flex justify-center gap-4 pt-4">
          <Link
            to="/account/services"
            className="bg-brand-primary hover:bg-brand-primary-light text-white font-bold px-6 py-2.5 rounded-xl text-xs"
          >
            View My Bookings
          </Link>
          <Link
            to="/"
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 py-2.5 rounded-xl text-xs"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <div className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
          <Wrench className="w-3.5 h-3.5" /> Book Doorstep Hardware & Electronics Service
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          {service.name}
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Inspection starting at <strong className="text-brand-primary">{formatCurrency(service.startingPrice)}</strong> • 90-Day Guarantee
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* 1. Customer Details */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
            <User className="w-4 h-4 text-brand-primary" /> 1. Customer Contact Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                placeholder="Ramesh Kumar"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Phone *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                placeholder="+91 98450 12345"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                placeholder="name@example.com"
              />
            </div>
          </div>
        </div>

        {/* 2. Appliance / Equipment Details & Problem */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
            <Wrench className="w-4 h-4 text-brand-primary" /> 2. Appliance / Equipment Info & Problem
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Appliance / Device Name</label>
              <input
                type="text"
                value={formData.productName}
                onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                placeholder="e.g. 55-inch Smart LED TV"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Brand</label>
              <input
                type="text"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                placeholder="e.g. Sony / Samsung / LG"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Model Number (if known)</label>
              <input
                type="text"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                placeholder="e.g. KD-55X74L"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Describe the Problem *</label>
            <textarea
              required
              rows={3}
              value={formData.problemDescription}
              onChange={(e) => setFormData({ ...formData, problemDescription: e.target.value })}
              className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-primary"
              placeholder="Describe symptoms: e.g. Sound is coming but display is pitch black, or refrigerator cooling coil has stopped freezing."
            />
          </div>

          {/* Upload problem image */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Upload Photo of Appliance / Error (Optional)</label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-brand-primary file:text-white hover:file:bg-brand-primary-light"
              />
              {imagePreview && (
                <div className="w-14 h-14 rounded-lg overflow-hidden border border-slate-200">
                  <img src={imagePreview} alt="Problem Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 3. Address & Identity Security */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
            <MapPin className="w-4 h-4 text-brand-primary" /> 3. Service Address & Identity Verification
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Doorstep Address with Pincode *</label>
            <textarea
              required
              rows={2}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-primary"
              placeholder="Flat 402, Green Valley Apartments, 14th Cross, Indiranagar, Bangalore - 560038"
            />
          </div>

          {/* Masked Aadhaar Info */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-brand-primary" />
              <label className="text-xs font-bold text-slate-800">
                Customer Identity (Aadhaar Number) — Securely Masked & Encrypted
              </label>
            </div>
            <p className="text-[11px] text-slate-500">
              Only the last 4 digits are stored in masked format (XXXX XXXX 1234) to protect your privacy and ensure technician physical verification at your doorstep.
            </p>
            <input
              type="text"
              maxLength={12}
              value={formData.aadhaarRaw}
              onChange={(e) => setFormData({ ...formData, aadhaarRaw: e.target.value.replace(/\D/g, '') })}
              placeholder="Enter 12-digit Aadhaar number (e.g. 5432 9876 1234)"
              className="w-full max-w-sm text-xs p-2.5 rounded-xl border border-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
            {formData.aadhaarRaw && (
              <p className="text-[11px] font-mono text-emerald-600 font-semibold">
                Stored as: {maskAadhaar(formData.aadhaarRaw)}
              </p>
            )}
          </div>
        </div>

        {/* 4. Scheduling & Payment Option */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
            <Calendar className="w-4 h-4 text-brand-primary" /> 4. Appointment Date & Slot
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Select Service Date</label>
              <input
                type="date"
                required
                min={new Date().toISOString().split('T')[0]}
                value={formData.bookingDate}
                onChange={(e) => setFormData({ ...formData, bookingDate: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Available 2-Hour Time Slot</label>
              <select
                value={formData.timeSlot}
                onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-primary"
              >
                {SERVICE_TIME_SLOTS.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-2">
            <label className="block text-xs font-semibold text-slate-700 mb-2">Payment Preference</label>
            <div className="grid grid-cols-2 gap-4">
              <label className={`p-3 rounded-xl border cursor-pointer flex items-center gap-3 transition-all ${
                formData.paymentMethod === 'Pay After Service' ? 'border-brand-primary bg-blue-50/50' : 'border-slate-200'
              }`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Pay After Service"
                  checked={formData.paymentMethod === 'Pay After Service'}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                  className="accent-brand-primary"
                />
                <div>
                  <p className="text-xs font-bold text-slate-900">Pay After Inspection</p>
                  <p className="text-[11px] text-slate-500">Pay UPI / Cash to technician upon work completion</p>
                </div>
              </label>

              <label className={`p-3 rounded-xl border cursor-pointer flex items-center gap-3 transition-all ${
                formData.paymentMethod === 'Online Advance' ? 'border-brand-primary bg-blue-50/50' : 'border-slate-200'
              }`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Online Advance"
                  checked={formData.paymentMethod === 'Online Advance'}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                  className="accent-brand-primary"
                />
                <div>
                  <p className="text-xs font-bold text-slate-900">Pay Online Now ({formatCurrency(service.startingPrice)})</p>
                  <p className="text-[11px] text-slate-500">Secure checkout via UPI / Razorpay</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-brand-accent hover:bg-brand-accent-hover text-white font-extrabold py-3.5 rounded-xl text-sm transition-all shadow-accent flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <span>Confirming Service Booking...</span>
          ) : (
            <>
              <span>Confirm & Book Doorstep Appointment</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

      </form>
    </div>
  );
};
