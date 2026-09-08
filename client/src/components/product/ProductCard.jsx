import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingCart, Star, Check, Scale } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatCurrency } from '../../utils/helpers';

export const ProductCard = ({ product, onQuickView }) => {
  const { addToCart, toggleWishlist, isInWishlist, toggleCompare, compareList } = useStore();

  const isWishlisted = isInWishlist(product.id);
  const isCompared = compareList.some(item => item.id === product.id);

  const discountPercentage = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-brand hover:border-brand-primary-light/40 transition-all duration-300 flex flex-col justify-between relative">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {discountPercentage > 0 && (
          <span className="bg-brand-accent text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm">
            {discountPercentage}% OFF
          </span>
        )}
        {product.bestSeller && (
          <span className="bg-brand-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
            Best Seller
          </span>
        )}
        {product.newArrival && (
          <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
            New Arrival
          </span>
        )}
      </div>

      {/* Floating Action Buttons */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => toggleWishlist(product)}
          className={`p-2 rounded-full shadow-md transition-all ${
            isWishlisted 
              ? 'bg-rose-50 text-rose-600' 
              : 'bg-white/90 backdrop-blur-sm text-slate-600 hover:text-rose-600 hover:bg-white'
          }`}
          title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
        </button>

        {onQuickView && (
          <button
            onClick={() => onQuickView(product)}
            className="p-2 rounded-full bg-white/90 backdrop-blur-sm text-slate-600 hover:text-brand-primary hover:bg-white shadow-md transition-all"
            title="Quick View"
            aria-label="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Image Container */}
      <Link to={`/products/${product.id}`} className="block relative pt-[80%] overflow-hidden bg-slate-50">
        <img
          src={product.images?.[0] || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80'}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </Link>

      {/* Details Container */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
            <span className="font-semibold uppercase tracking-wider text-brand-primary-light">{product.brand}</span>
            <span className="text-slate-400">SKU: {product.sku}</span>
          </div>

          <Link to={`/products/${product.id}`} className="block">
            <h3 className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-2 hover:text-brand-primary transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex items-center text-amber-500 bg-amber-50 px-1.5 py-0.5 rounded text-xs font-bold">
              <Star className="w-3 h-3 fill-amber-500 mr-1" />
              {product.rating || 4.8}
            </div>
            <span className="text-[11px] text-slate-400">({product.reviewsCount || 45})</span>
          </div>
        </div>

        {/* Price & Cart Button */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-extrabold text-slate-900">
                {formatCurrency(product.discountPrice || product.price)}
              </span>
              {product.discountPrice && (
                <span className="text-xs text-slate-400 line-through">
                  {formatCurrency(product.price)}
                </span>
              )}
            </div>
            <span className={`text-[10px] font-semibold ${product.stock > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
              {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
            </span>
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            disabled={product.stock <= 0}
            className="bg-brand-primary hover:bg-brand-primary-light active:scale-95 disabled:bg-slate-300 text-white p-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center shrink-0"
            title="Add to Cart"
            aria-label="Add to Cart"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
