import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatCurrency } from '../utils/helpers';

export const WishlistPage = () => {
  const { wishlist, toggleWishlist, addToCart } = useStore();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto text-rose-500">
          <Heart className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900">Your Wishlist is Empty</h1>
        <p className="text-xs text-slate-500">
          Save your favorite appliances, gadgets, and accessories here to easily shop them later.
        </p>
        <Link to="/products" className="inline-block bg-brand-primary text-white px-6 py-2.5 rounded-xl font-bold text-xs">
          Explore Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          My Wishlist ({wishlist.length} Items)
        </h1>
        <Link to="/products" className="text-xs font-bold text-brand-primary hover:underline">
          Continue Shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 flex flex-col justify-between shadow-sm">
            <div className="relative pt-[80%] bg-slate-50 rounded-xl overflow-hidden">
              <img src={p.images?.[0]} alt={p.name} className="absolute inset-0 w-full h-full object-contain p-4" />
              <button
                onClick={() => toggleWishlist(p)}
                className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full text-rose-600 shadow"
                title="Remove"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase text-brand-primary-light">{p.brand}</span>
              <h3 className="text-xs font-bold text-slate-800 line-clamp-2">{p.name}</h3>
              <p className="text-sm font-extrabold text-slate-900 mt-1">
                {formatCurrency(p.discountPrice || p.price)}
              </p>
            </div>

            <button
              onClick={() => {
                addToCart(p, 1);
                toggleWishlist(p);
              }}
              className="w-full bg-brand-primary hover:bg-brand-primary-light text-white py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <ShoppingCart className="w-3.5 h-3.5" /> Move to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
