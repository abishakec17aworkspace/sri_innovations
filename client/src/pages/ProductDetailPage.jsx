import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, ShoppingCart, Heart, Shield, Truck, RefreshCw, 
  Check, Share2, Scale, ArrowRight, MessageSquare, ChevronRight, HelpCircle
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatCurrency } from '../utils/helpers';
import { ProductCard } from '../components/product/ProductCard';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, toggleWishlist, isInWishlist, toggleCompare, compareList } = useStore();

  const product = products.find(p => p.id === id) || products[0];
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'reviews' | 'qa'

  // Q&A Question input
  const [userQuestion, setUserQuestion] = useState('');
  const [questionsList, setQuestionsList] = useState([
    { q: 'Is installation and demo included with this TV?', a: 'Yes! Free wall-mounting and technician demo is scheduled within 48 hours of delivery.', date: '3 days ago' },
    { q: 'What is the warranty period for this unit?', a: 'Comes with 1 Year Comprehensive Brand Warranty + 1 Year Additional Panel Warranty.', date: '1 week ago' }
  ]);

  const [reviewsList, setReviewsList] = useState([
    { name: 'Karthik S.', rating: 5, date: '14 Aug 2026', comment: 'Exceptional picture clarity and fast delivery by Sri Innovations team. Very happy with the purchase!' },
    { name: 'Pooja Menon', rating: 5, date: '02 Aug 2026', comment: 'Authentic product with genuine warranty card. Sound and build quality are top tier.' }
  ]);
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);

  const isWishlisted = isInWishlist(product.id);
  const isCompared = compareList.some(item => item.id === product.id);

  const discountPercentage = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (!userQuestion.trim()) return;
    setQuestionsList(prev => [
      { q: userQuestion, a: 'Thanks for your inquiry! Our product specialist will reply within 24 hours.', date: 'Just now' },
      ...prev
    ]);
    setUserQuestion('');
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;
    setReviewsList(prev => [
      { name: 'You (Verified Buyer)', rating: newReviewRating, date: 'Just now', comment: newReviewText },
      ...prev
    ]);
    setNewReviewText('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-brand-primary">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/products" className="hover:text-brand-primary">Products</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to={`/category/${product.category}`} className="hover:text-brand-primary capitalize">{product.category.replace('-', ' ')}</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-800 font-semibold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left: Gallery (5 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative pt-[85%] bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <img
              src={product.images?.[selectedImage] || product.images?.[0]}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-contain p-6 transition-transform duration-300 hover:scale-110 cursor-zoom-in"
            />
            {discountPercentage > 0 && (
              <span className="absolute top-4 left-4 bg-brand-accent text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-md">
                {discountPercentage}% OFF
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images?.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-2xl border-2 overflow-hidden bg-white p-1 transition-all shrink-0 ${
                    selectedImage === idx ? 'border-brand-primary ring-2 ring-brand-primary/20 shadow-md' : 'border-slate-200'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Purchase Details (7 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-extrabold uppercase tracking-wider text-brand-primary-light bg-blue-50 px-2.5 py-1 rounded-lg">
                Brand: {product.brand}
              </span>
              <span className="font-mono">SKU: {product.sku}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              {product.name}
            </h1>

            {/* Rating & reviews counter */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center text-amber-500 bg-amber-50 px-2 py-1 rounded-lg text-xs font-bold">
                <Star className="w-4 h-4 fill-amber-500 mr-1" />
                {product.rating || 4.8}
              </div>
              <span className="text-xs text-slate-500 font-semibold">
                ({product.reviewsCount || 45} Verified Ratings & Reviews)
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-baseline gap-4">
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              {formatCurrency(product.discountPrice || product.price)}
            </span>
            {product.discountPrice && (
              <span className="text-base text-slate-400 line-through">
                {formatCurrency(product.price)}
              </span>
            )}
            <span className="text-xs font-bold text-emerald-600 ml-auto bg-emerald-50 px-2.5 py-1 rounded-lg">
              Save {formatCurrency(product.price - (product.discountPrice || product.price))}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {product.description}
          </p>

          {/* Key Bullet Features */}
          {product.features && (
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Key Highlights:</h4>
              <div className="grid grid-cols-1 gap-2">
                {product.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Row */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-4">
              {/* Quantity selector */}
              <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-2.5 text-slate-600 hover:bg-slate-100 font-bold"
                >
                  -
                </button>
                <span className="px-4 py-2.5 text-xs font-extrabold text-slate-800">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-2.5 text-slate-600 hover:bg-slate-100 font-bold"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={() => addToCart(product, quantity)}
                disabled={product.stock <= 0}
                className="flex-1 bg-brand-primary hover:bg-brand-primary-light disabled:bg-slate-300 text-white py-3 px-5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-brand flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>

              {/* Buy Now */}
              <button
                onClick={handleBuyNow}
                disabled={product.stock <= 0}
                className="flex-1 bg-brand-accent hover:bg-brand-accent-hover disabled:bg-slate-300 text-white py-3 px-5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-accent flex items-center justify-center gap-2"
              >
                Buy Now
              </button>

              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3 rounded-xl border transition-all ${
                  isWishlisted ? 'border-rose-200 bg-rose-50 text-rose-600' : 'border-slate-300 text-slate-600 hover:bg-slate-50'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-600' : ''}`} />
              </button>
            </div>

            {/* Value Props Strip */}
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-center">
              <div className="p-2.5 bg-slate-50 rounded-xl">
                <Truck className="w-4 h-4 text-brand-primary mx-auto mb-1" />
                <p className="text-[10px] font-bold text-slate-800">Free Delivery</p>
                <p className="text-[9px] text-slate-500">2-4 Business Days</p>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl">
                <Shield className="w-4 h-4 text-brand-primary mx-auto mb-1" />
                <p className="text-[10px] font-bold text-slate-800">100% Genuine</p>
                <p className="text-[9px] text-slate-500">Brand Sealed Box</p>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl">
                <RefreshCw className="w-4 h-4 text-brand-primary mx-auto mb-1" />
                <p className="text-[10px] font-bold text-slate-800">7-Day Replacement</p>
                <p className="text-[9px] text-slate-500">Hassle-Free Return</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs for Specifications, Reviews, and Q&A */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
        <div className="flex border-b border-slate-200 bg-slate-50">
          <button
            onClick={() => setActiveTab('specs')}
            className={`py-4 px-6 text-xs sm:text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'specs' ? 'border-brand-primary text-brand-primary bg-white' : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Technical Specifications
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-4 px-6 text-xs sm:text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'reviews' ? 'border-brand-primary text-brand-primary bg-white' : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Customer Reviews ({reviewsList.length})
          </button>
          <button
            onClick={() => setActiveTab('qa')}
            className={`py-4 px-6 text-xs sm:text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'qa' ? 'border-brand-primary text-brand-primary bg-white' : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Questions & Answers ({questionsList.length})
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {/* Specifications Table */}
          {activeTab === 'specs' && (
            <div className="max-w-3xl">
              <h3 className="font-extrabold text-base text-slate-900 mb-4">Detailed Specifications</h3>
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
                {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-3 p-3.5 text-xs">
                    <span className="font-bold text-slate-700">{key}</span>
                    <span className="col-span-2 text-slate-600">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Customer Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="space-y-8 max-w-3xl">
              {/* Add review box */}
              <form onSubmit={handleAddReview} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-sm text-slate-900">Write a Customer Review</h4>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-600 font-medium">Your Rating:</span>
                  <select
                    value={newReviewRating}
                    onChange={(e) => setNewReviewRating(Number(e.target.value))}
                    className="text-xs bg-white border border-slate-300 rounded-lg p-1.5 font-bold text-amber-600"
                  >
                    <option value={5}>★★★★★ (5 Stars)</option>
                    <option value={4}>★★★★☆ (4 Stars)</option>
                    <option value={3}>★★★☆☆ (3 Stars)</option>
                    <option value={2}>★★☆☆☆ (2 Stars)</option>
                    <option value={1}>★☆☆☆☆ (1 Star)</option>
                  </select>
                </div>
                <textarea
                  rows={3}
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                  placeholder="Share details of your experience with this item..."
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
                <button
                  type="submit"
                  className="bg-brand-primary hover:bg-brand-primary-light text-white font-bold px-4 py-2 rounded-xl text-xs"
                >
                  Submit Review
                </button>
              </form>

              {/* Review Cards */}
              <div className="space-y-4">
                {reviewsList.map((rev, i) => (
                  <div key={i} className="p-4 rounded-2xl border border-slate-100 bg-white space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900">{rev.name}</span>
                      <span className="text-slate-400">{rev.date}</span>
                    </div>
                    <div className="flex text-amber-400 text-xs">
                      {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Q&A Tab */}
          {activeTab === 'qa' && (
            <div className="space-y-8 max-w-3xl">
              {/* Ask Question Form */}
              <form onSubmit={handleAddQuestion} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-sm text-slate-900">Have a Question About This Product?</h4>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={userQuestion}
                    onChange={(e) => setUserQuestion(e.target.value)}
                    placeholder="e.g. Is HDMI 2.1 cable included inside box?"
                    className="flex-1 text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                  <button
                    type="submit"
                    className="bg-brand-primary hover:bg-brand-primary-light text-white font-bold px-4 py-2 rounded-xl text-xs"
                  >
                    Ask
                  </button>
                </div>
              </form>

              {/* Q&A List */}
              <div className="space-y-4">
                {questionsList.map((item, i) => (
                  <div key={i} className="p-4 rounded-2xl border border-slate-100 bg-white space-y-2">
                    <p className="text-xs font-bold text-slate-800 flex items-start gap-2">
                      <span className="text-brand-accent font-extrabold">Q:</span>
                      <span>{item.q}</span>
                    </p>
                    <p className="text-xs text-slate-600 flex items-start gap-2 pl-4 border-l-2 border-brand-primary/20">
                      <span className="text-brand-primary font-extrabold">A:</span>
                      <span>{item.a}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Similar & Related Products
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
