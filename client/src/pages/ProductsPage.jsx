import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, ArrowUpDown, X, Check, Search } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCT_CATEGORIES, BRANDS } from '../config/constants';
import { ProductCard } from '../components/product/ProductCard';
import { QuickViewModal } from '../components/product/QuickViewModal';

export const ProductsPage = () => {
  const { products } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Read URL query params
  const categoryParam = searchParams.get('category') || 'all';
  const brandParam = searchParams.get('brand') || 'all';
  const sortParam = searchParams.get('sort') || 'popular';
  const filterParam = searchParams.get('filter') || '';
  const searchParam = searchParams.get('q') || '';

  const [priceRange, setPriceRange] = useState(100000);
  const [inStockOnly, setInStockOnly] = useState(false);

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      if (categoryParam !== 'all' && item.category !== categoryParam) return false;
      if (brandParam !== 'all' && item.brand.toLowerCase() !== brandParam.toLowerCase()) return false;
      if (searchParam && !item.name.toLowerCase().includes(searchParam.toLowerCase()) && !item.description.toLowerCase().includes(searchParam.toLowerCase())) return false;
      if (filterParam === 'offers' && !item.discountPrice) return false;
      if (filterParam === 'bestseller' && !item.bestSeller) return false;
      if (filterParam === 'newarrival' && !item.newArrival) return false;
      if (inStockOnly && item.stock <= 0) return false;
      const effectivePrice = item.discountPrice || item.price;
      if (effectivePrice > priceRange) return false;
      return true;
    }).sort((a, b) => {
      const priceA = a.discountPrice || a.price;
      const priceB = b.discountPrice || b.price;
      if (sortParam === 'price-low') return priceA - priceB;
      if (sortParam === 'price-high') return priceB - priceA;
      if (sortParam === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortParam === 'newest') return b.newArrival ? 1 : -1;
      return 0; // popular/default
    });
  }, [products, categoryParam, brandParam, sortParam, filterParam, searchParam, priceRange, inStockOnly]);

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === 'all' || !value) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  const clearAllFilters = () => {
    setSearchParams({});
    setPriceRange(100000);
    setInStockOnly(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header & Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {categoryParam !== 'all' 
              ? PRODUCT_CATEGORIES.find(c => c.slug === categoryParam)?.name || 'Products' 
              : searchParam ? `Search Results for "${searchParam}"` : 'All Products'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Showing <strong className="text-slate-800">{filteredProducts.length}</strong> verified electronics, appliances & gear
          </p>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="md:hidden flex items-center gap-1.5 bg-white border border-slate-300 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700"
          >
            <Filter className="w-4 h-4 text-brand-primary" /> Filters
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-semibold hidden sm:inline">Sort By:</span>
            <select
              value={sortParam}
              onChange={(e) => updateFilter('sort', e.target.value)}
              className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-primary"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">New Arrivals</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* DESKTOP SIDEBAR FILTERS */}
        <aside className="hidden md:block space-y-6 bg-white p-6 rounded-2xl border border-slate-200 h-fit sticky top-28">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-brand-primary" /> Filter Products
            </h3>
            <button
              onClick={clearAllFilters}
              className="text-[11px] text-brand-accent hover:underline font-bold"
            >
              Reset All
            </button>
          </div>

          {/* Department / Category Filter */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Department</h4>
            <div className="space-y-1 text-xs">
              <button
                onClick={() => updateFilter('category', 'all')}
                className={`w-full text-left py-1.5 px-2.5 rounded-lg transition-colors font-semibold ${
                  categoryParam === 'all' ? 'bg-brand-primary text-white' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                All Departments
              </button>
              {PRODUCT_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => updateFilter('category', cat.slug)}
                  className={`w-full text-left py-1.5 px-2.5 rounded-lg transition-colors font-medium flex items-center justify-between ${
                    categoryParam === cat.slug ? 'bg-brand-primary text-white font-semibold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="line-clamp-1">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Brand Filter */}
          <div className="space-y-2 pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Brand</h4>
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1 text-xs">
              <button
                onClick={() => updateFilter('brand', 'all')}
                className={`w-full text-left py-1 px-2 rounded font-semibold ${
                  brandParam === 'all' ? 'text-brand-accent' : 'text-slate-600'
                }`}
              >
                All Brands
              </button>
              {BRANDS.map((b) => (
                <button
                  key={b.id}
                  onClick={() => updateFilter('brand', b.id)}
                  className={`w-full text-left py-1 px-2 rounded flex items-center justify-between ${
                    brandParam.toLowerCase() === b.id.toLowerCase() ? 'text-brand-accent font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>{b.name}</span>
                  {brandParam.toLowerCase() === b.id.toLowerCase() && <Check className="w-3.5 h-3.5 text-brand-accent" />}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-2 pt-4 border-t border-slate-100">
            <div className="flex justify-between items-center text-xs">
              <h4 className="font-bold text-slate-800 uppercase tracking-wider">Max Price</h4>
              <span className="font-bold text-brand-primary">₹{priceRange.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="100000"
              step="1000"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-brand-primary"
            />
          </div>

          {/* In Stock Toggle */}
          <div className="pt-4 border-t border-slate-100">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded accent-brand-primary w-4 h-4"
              />
              <span>In Stock Only</span>
            </label>
          </div>
        </aside>

        {/* PRODUCTS GRID */}
        <div className="md:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">No products match your selected filters</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try widening your price range, selecting different brand filters, or resetting all options.
              </p>
              <button
                onClick={clearAllFilters}
                className="bg-brand-primary hover:bg-brand-primary-light text-white font-bold px-6 py-2.5 rounded-xl text-xs"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
};
