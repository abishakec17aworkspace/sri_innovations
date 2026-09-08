import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ShieldCheck, Zap, Award, Wrench, Sparkles,
  ChevronRight, Timer, Truck, CheckCircle2, ChevronLeft, MapPin, ExternalLink
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCT_CATEGORIES, BRANDS, STORE_CONFIG } from '../config/constants';
import { ProductCard } from '../components/product/ProductCard';
import { QuickViewModal } from '../components/product/QuickViewModal';
import { ServiceCard } from '../components/service/ServiceCard';
import { formatCurrency } from '../utils/helpers';

export const HomePage = () => {
  const { products, services } = useStore();
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Hero slides state
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroSlides = [
    {
      id: 1,
      tag: 'FLAGSHIP TECHNOLOGY & APPLIANCES',
      title: 'Upgrade Your Everyday Technology',
      subtitle: 'Explore 4K Smart TVs, Heavy Duty Refrigerators, Laptops, and Pro Gaming Peripherals with brand warranty.',
      ctaText: 'Shop Products',
      ctaLink: '/products',
      badge: 'Up to 40% Off',
      bgGradient: 'from-[#071E3D] via-[#0B3B7B] to-[#1565C0]',
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 2,
      tag: 'EXPERT HARDWARE & ELECTRONICS CARE',
      title: 'Certified Doorstep Repair Services',
      subtitle: 'From Smart TV panel repair to laptop motherboard reballing & appliance gas charging with 90-day guarantee.',
      ctaText: 'Book a Service',
      ctaLink: '/services',
      badge: 'Starting ₹399',
      bgGradient: 'from-[#0A192F] via-[#0B3B7B] to-[#041021]',
      image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 3,
      tag: 'PREMIUM ACCESSORIES & AUDIO',
      title: 'High-Performance Audio & Gadgets',
      subtitle: 'Noise Cancelling Headphones, Fast GaN Chargers, Rugged Mobile Cases, and Mechanical Gaming Keyboards.',
      ctaText: 'Explore Accessories',
      ctaLink: '/products?category=mobiles-accessories',
      badge: 'New Arrivals',
      bgGradient: 'from-[#072652] via-[#0B3B7B] to-[#1E5BB0]',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 4,
      tag: 'EXCLUSIVE LIMITED-TIME SAVINGS',
      title: 'Mega Tech Deals at Sri Innovations',
      subtitle: 'Unlock instant discounts with coupon SRI100 and express free delivery on top brand electronics.',
      ctaText: 'View All Deals',
      ctaLink: '/products?filter=offers',
      badge: 'Limited Stock',
      bgGradient: 'from-[#071E3D] via-[#0B3B7B] to-[#F26522]/40',
      image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=1000&q=80'
    }
  ];

  // Auto rotate hero slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Flash sale countdown logic (Dynamic real countdown)
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 35, seconds: 20 });
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const featuredProducts = products.filter(p => p.featured).slice(0, 4);
  const bestSellers = products.filter(p => p.bestSeller).slice(0, 4);
  const newArrivals = products.filter(p => p.newArrival).slice(0, 4);

  return (
    <div className="space-y-16 pb-12">
      {/* 1. HERO SLIDESHOW */}
      <section className="relative overflow-hidden bg-slate-900 text-white min-h-[480px] sm:min-h-[560px] flex items-center">
        {heroSlides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 flex items-center ${idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient} opacity-95`} />

            {/* Background image overlay */}
            <div className="absolute inset-0 opacity-25 mix-blend-overlay">
              <img src={slide.image} alt="" className="w-full h-full object-cover" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-3">
                  <span className="bg-brand-accent text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-accent">
                    {slide.badge}
                  </span>
                  <span className="text-xs font-semibold text-white/90 tracking-wider uppercase">
                    {slide.tag}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight !text-white text-white drop-shadow-sm">
                  {slide.title}
                </h1>

                <p className="text-sm sm:text-base text-white/95 max-w-xl leading-relaxed">
                  {slide.subtitle}
                </p>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <Link
                    to={slide.ctaLink}
                    className="bg-brand-accent hover:bg-brand-accent-hover text-white font-bold px-7 py-3.5 rounded-xl text-sm transition-all transform hover:-translate-y-0.5 shadow-accent flex items-center gap-2"
                  >
                    <span>{slide.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    to="/services"
                    className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-6 py-3.5 rounded-xl text-sm transition-colors backdrop-blur-sm flex items-center gap-2"
                  >
                    <Wrench className="w-4 h-4 text-brand-accent" />
                    Book Repair Service
                  </Link>
                </div>
              </div>

              <div className="hidden lg:flex lg:col-span-5 justify-center">
                <div className="relative w-80 h-80 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 p-2 bg-white/10 backdrop-blur-md">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slide Controls */}
        <div className="absolute bottom-6 left-0 right-0 z-20 max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-2">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2.5 rounded-full transition-all ${idx === currentSlide ? 'w-8 bg-brand-accent' : 'w-2.5 bg-white/40 hover:bg-white/70'
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
              className="p-2 rounded-full bg-white/10 hover:bg-white/30 text-white backdrop-blur-sm transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/30 text-white backdrop-blur-sm transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY DISCOVERY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-brand-accent">Explore Categories</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Shop by Department</h2>
          </div>
          <Link to="/products" className="text-xs font-bold text-brand-primary hover:text-brand-accent transition-colors flex items-center gap-1 mt-2 sm:mt-0">
            View All Categories <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {PRODUCT_CATEGORIES.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className="group bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 hover:shadow-brand hover:border-brand-primary-light/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="aspect-square w-full rounded-xl overflow-hidden bg-slate-50 mb-4 relative">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-brand-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-1 mt-1">
                  {category.description}
                </p>
                <div className="mt-3 flex items-center text-xs font-bold text-brand-accent group-hover:translate-x-1 transition-transform">
                  <span>Explore Items</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. FLASH SALE COUNTDOWN WITH SPECIAL DEALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-secondary via-brand-primary to-brand-primary-light rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-brand-accent/20 rounded-full blur-3xl" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-brand-accent text-white px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider">
                <Timer className="w-3.5 h-3.5 animate-spin" /> Flash Sale Deals
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">Super Saver Electronics Sale</h2>
              <p className="text-xs sm:text-sm text-slate-200 max-w-lg">
                Exclusive limited-hour discounts on 4K TVs, Smart Refrigerators, and Gaming Peripherals.
              </p>
            </div>

            {/* Countdown Box */}
            <div className="flex items-center gap-3">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 sm:p-4 text-center min-w-[70px]">
                <span className="text-2xl sm:text-3xl font-extrabold text-brand-accent">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <p className="text-[10px] text-slate-300 uppercase font-semibold mt-1">Hours</p>
              </div>
              <span className="text-2xl font-bold text-brand-accent">:</span>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 sm:p-4 text-center min-w-[70px]">
                <span className="text-2xl sm:text-3xl font-extrabold text-brand-accent">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <p className="text-[10px] text-slate-300 uppercase font-semibold mt-1">Mins</p>
              </div>
              <span className="text-2xl font-bold text-brand-accent">:</span>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 sm:p-4 text-center min-w-[70px]">
                <span className="text-2xl sm:text-3xl font-extrabold text-brand-accent">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <p className="text-[10px] text-slate-300 uppercase font-semibold mt-1">Secs</p>
              </div>
            </div>

            <Link
              to="/products?filter=offers"
              className="bg-white hover:bg-slate-100 text-brand-secondary font-extrabold px-6 py-3.5 rounded-xl text-xs sm:text-sm transition-all shadow-lg shrink-0"
            >
              Shop Flash Deals
            </Link>
          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-brand-accent">Top Recommendations</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Featured Electronics & Gear</h2>
          </div>
          <Link to="/products" className="text-xs font-bold text-brand-primary hover:text-brand-accent transition-colors flex items-center gap-1 mt-2 sm:mt-0">
            View All Products <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* 5. SERVICE MODULE HIGHLIGHT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden border border-slate-800">
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 bg-brand-accent text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Wrench className="w-3.5 h-3.5" /> Professional Service Center
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight text-white">
              Electronics Broken or Malfunctioning? We Provide Certified Doorstep Repair!
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Book certified technicians for Smart TVs, Washing Machines, Refrigerators, Laptops, Mobile Displays, and Component Soldering. Choose convenient time slots with transparent pricing and 90-day warranty.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                to="/services"
                className="bg-brand-accent hover:bg-brand-accent-hover text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm transition-all shadow-accent flex items-center gap-2"
              >
                <span>Browse All Repair Services</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/account/services"
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-xl text-xs sm:text-sm transition-colors"
              >
                Track Service Booking
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 relative z-10">
            {services.slice(0, 3).map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. BEST SELLERS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-brand-accent">Customer Favorites</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Best Selling Products</h2>
          </div>
          <Link to="/products?filter=bestseller" className="text-xs font-bold text-brand-primary hover:text-brand-accent transition-colors flex items-center gap-1 mt-2 sm:mt-0">
            Browse All Best Sellers <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* 7. BRAND LOGO MARQUEE */}
      <section className="bg-slate-100 py-10 border-y border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-6 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Official Brand Partners & Stockists</span>
        </div>
        <div className="flex space-x-12 animate-marquee whitespace-nowrap">
          {[...BRANDS, ...BRANDS].map((brand, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-xl border border-slate-200 shadow-sm"
            >
              <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-50 flex items-center justify-center">
                <img src={brand.logo} alt={brand.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-sm font-bold text-slate-800">{brand.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 8. PHYSICAL STORE LOCATION & VISITATION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-brand-accent" /> Physical Flagship Experience Center
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Visit Sri Innovations In Person
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Experience the latest appliances, test laptops and gaming keyboards hands-on, or drop off your equipment for rapid on-site diagnosis by certified engineers.
            </p>

            <div className="space-y-3 pt-2 text-xs text-slate-700">
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                <MapPin className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block text-xs">Store Address:</strong>
                  <span>{STORE_CONFIG.address.line1}, {STORE_CONFIG.address.city}, {STORE_CONFIG.address.state} - {STORE_CONFIG.address.pincode}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-brand-accent shrink-0" />
                <div>
                  <strong className="text-slate-900 block text-xs">Working Hours:</strong>
                  <span>Mon-Sat: {STORE_CONFIG.businessHours.weekdays} | Sun: {STORE_CONFIG.businessHours.sunday}</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={STORE_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primary-light text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm transition-all shadow-brand"
              >
                <span>Open Google Maps Directions</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 aspect-[4/3] bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80"
                alt="Sri Innovations Store"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
                <div className="text-white">
                  <p className="text-xs font-semibold text-brand-accent">Official Location</p>
                  <p className="text-sm font-bold">Bangalore Flagship Retail & Service Hub</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick View Modal Popup */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
};
