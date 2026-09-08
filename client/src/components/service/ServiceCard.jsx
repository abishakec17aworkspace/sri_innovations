import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Clock, ShieldCheck, Star, ArrowRight, CheckCircle2 } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';

export const ServiceCard = ({ service }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-brand hover:border-brand-primary-light/40 transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Service Image */}
        <div className="relative pt-[55%] overflow-hidden bg-slate-100">
          <img
            src={service.image}
            alt={service.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 bg-brand-secondary/90 backdrop-blur-sm text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
            <Wrench className="w-3 h-3 text-brand-accent" />
            <span>{service.category}</span>
          </div>
        </div>

        {/* Details */}
        <div className="p-5">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="flex items-center gap-1 text-slate-600">
              <Clock className="w-3.5 h-3.5 text-brand-accent" /> {service.duration}
            </span>
            <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2 py-0.5 rounded font-bold">
              <Star className="w-3 h-3 fill-amber-500" />
              <span>{service.rating} ({service.reviewsCount})</span>
            </div>
          </div>

          <Link to={`/services/${service.id}`}>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-primary transition-colors line-clamp-1">
              {service.name}
            </h3>
          </Link>

          <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
            {service.description}
          </p>

          {/* Common issues snippet */}
          <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
            <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Top Solutions:</p>
            {service.commonProblems?.slice(0, 2).map((prob, i) => (
              <div key={i} className="flex items-start gap-1.5 text-xs text-slate-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-accent shrink-0 mt-0.5" />
                <span className="line-clamp-1">{prob}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Pricing & CTA */}
      <div className="p-5 pt-0">
        <div className="bg-slate-50 p-3 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-[10px] text-slate-500 font-semibold uppercase">Inspection Starting at</p>
            <p className="text-lg font-extrabold text-brand-primary">
              {formatCurrency(service.startingPrice)}
            </p>
          </div>

          <Link
            to={`/service-booking/${service.id}`}
            className="bg-brand-accent hover:bg-brand-accent-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-accent flex items-center gap-1.5"
          >
            <span>Book Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
