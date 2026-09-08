import React, { useState } from 'react';
import { X, Star, ShoppingCart, Heart, Shield, Truck, Check } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatCurrency } from '../../utils/helpers';
import { Link } from 'react-router-dom';

export const QuickViewModal = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart, toggleWishlist, isInWishlist } = useStore();

  if (!product) return null;

  const isWishlisted = isInWishlist(product.id);
  const discountPercentage = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Images */}
          <div className="space-y-4">
            <div className="relative pt-[90%] bg-slate-50 rounded-2xl overflow-hidden border border-slate-100">
              <img
                src={product.images?.[selectedImage] || product.images?.[0]}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-contain p-4"
              />
              {discountPercentage > 0 && (
                <span className="absolute top-3 left-3 bg-brand-accent text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  {discountPercentage}% OFF
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {product.images?.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-16 h-16 rounded-xl border-2 overflow-hidden bg-slate-50 p-1 transition-all ${
                      selectedImage === idx ? 'border-brand-primary ring-2 ring-brand-primary/20' : 'border-slate-200'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span className="font-bold uppercase tracking-wider text-brand-primary">{product.brand}</span>
                <span>SKU: {product.sku}</span>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                {product.name}
              </h2>

              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center text-amber-500 bg-amber-50 px-2 py-0.5 rounded text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-500 mr-1" />
                  {product.rating || 4.8}
                </div>
                <span className="text-xs text-slate-400">({product.reviewsCount || 40} verified reviews)</span>
              </div>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {formatCurrency(product.discountPrice || product.price)}
                </span>
                {product.discountPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    {formatCurrency(product.price)}
                  </span>
                )}
              </div>

              <p className="mt-3 text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                {product.description}
              </p>

              {/* Key Highlights */}
              {product.features && (
                <div className="mt-4 space-y-1.5">
                  {product.features.slice(0, 2).map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-slate-100 space-y-4">
              <div className="flex items-center gap-4">
                {/* Quantity */}
                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-slate-600 hover:bg-slate-100"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-xs font-bold text-slate-800">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-slate-600 hover:bg-slate-100"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  className="flex-1 bg-brand-primary hover:bg-brand-primary-light text-white py-2.5 px-4 rounded-xl font-bold text-sm transition-all shadow-brand flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>

                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-2.5 rounded-xl border transition-all ${
                    isWishlisted 
                      ? 'border-rose-200 bg-rose-50 text-rose-600' 
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-600' : ''}`} />
                </button>
              </div>

              <div className="flex items-center justify-between text-xs pt-2">
                <Link
                  to={`/products/${product.id}`}
                  onClick={onClose}
                  className="font-bold text-brand-primary hover:underline"
                >
                  View Full Product Details & Specs →
                </Link>
                <span className="text-slate-400">Available: {product.stock} units</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
