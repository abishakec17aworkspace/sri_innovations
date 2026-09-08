import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, Trash2, ShoppingCart, Star, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatCurrency } from '../utils/helpers';

export const ComparePage = () => {
  const { compareList, removeFromCompare, addToCart } = useStore();

  if (compareList.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
          <Scale className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900">No Products in Comparison</h1>
        <p className="text-xs text-slate-500">
          Add up to 4 products across TVs, laptops, refrigerators, and accessories to compare features side-by-side.
        </p>
        <Link to="/products" className="inline-block bg-brand-primary text-white px-6 py-2.5 rounded-xl font-bold text-xs">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Compare Products ({compareList.length}/4)
        </h1>
        <Link to="/products" className="text-xs font-bold text-brand-primary hover:underline">
          + Add More Products
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-slate-200 rounded-2xl overflow-hidden text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="p-4 text-left font-bold text-slate-500 w-48">Feature</th>
              {compareList.map((p) => (
                <th key={p.id} className="p-4 text-left font-bold text-slate-900 min-w-[220px]">
                  <div className="space-y-2">
                    <img src={p.images?.[0]} alt="" className="w-24 h-24 object-contain mx-auto p-1 bg-white rounded-lg border border-slate-100" />
                    <p className="line-clamp-2">{p.name}</p>
                    <div className="flex justify-between items-center pt-2">
                      <span className="font-extrabold text-sm text-brand-primary">
                        {formatCurrency(p.discountPrice || p.price)}
                      </span>
                      <button
                        onClick={() => removeFromCompare(p.id)}
                        className="text-rose-500 hover:text-rose-700"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => addToCart(p, 1)}
                      className="w-full bg-brand-primary hover:bg-brand-primary-light text-white py-1.5 rounded-lg text-xs font-bold"
                    >
                      Add to Cart
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="p-4 font-bold text-slate-700 bg-slate-50">Brand</td>
              {compareList.map(p => <td key={p.id} className="p-4 font-semibold text-slate-800">{p.brand}</td>)}
            </tr>
            <tr>
              <td className="p-4 font-bold text-slate-700 bg-slate-50">Customer Rating</td>
              {compareList.map(p => (
                <td key={p.id} className="p-4">
                  <span className="bg-amber-50 text-amber-600 px-2 py-0.5 rounded font-bold">★ {p.rating || 4.8}</span>
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-bold text-slate-700 bg-slate-50">Availability</td>
              {compareList.map(p => (
                <td key={p.id} className="p-4 text-emerald-600 font-semibold">{p.stock > 0 ? `In Stock (${p.stock})` : 'Out of Stock'}</td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-bold text-slate-700 bg-slate-50">SKU Reference</td>
              {compareList.map(p => <td key={p.id} className="p-4 font-mono text-slate-600">{p.sku}</td>)}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
