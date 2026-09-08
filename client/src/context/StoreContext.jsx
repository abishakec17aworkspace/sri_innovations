import React, { createContext, useContext, useState, useEffect } from 'react';
import initialProducts from '../data/products.json';
import initialServices from '../data/services.json';
import initialCoupons from '../data/coupons.json';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  // State for products and services that can be updated dynamically via Admin
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('sri_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [services, setServices] = useState(() => {
    const saved = localStorage.getItem('sri_services');
    return saved ? JSON.parse(saved) : initialServices;
  });

  const [coupons, setCoupons] = useState(() => {
    const saved = localStorage.getItem('sri_coupons');
    return saved ? JSON.parse(saved) : initialCoupons;
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('sri_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('sri_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [compareList, setCompareList] = useState(() => {
    const saved = localStorage.getItem('sri_compare');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('sri_orders');
    return saved ? JSON.parse(saved) : [
      {
        id: 'SRI-849201',
        createdAt: '2026-08-20T10:30:00Z',
        items: [
          {
            product: initialProducts[0],
            quantity: 1,
            price: initialProducts[0].discountPrice
          }
        ],
        subtotal: 53990,
        discount: 0,
        shippingFee: 0,
        tax: 9718,
        total: 53990,
        paymentMethod: 'UPI / Online Razorpay',
        paymentStatus: 'Paid',
        orderStatus: 'Shipped',
        shippingAddress: {
          name: 'Ramesh Kumar',
          phone: '+91 98450 12345',
          house: 'Flat 402, Green Valley Apartments',
          street: '14th Cross, 8th Main, Indiranagar',
          city: 'Bangalore',
          state: 'Karnataka',
          pincode: '560038'
        }
      }
    ];
  });

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('sri_bookings');
    return saved ? JSON.parse(saved) : [
      {
        id: 'SRI-SRV-41829',
        createdAt: '2026-08-22T14:15:00Z',
        service: initialServices[0],
        customerName: 'Ramesh Kumar',
        phone: '+91 98450 12345',
        email: 'customer@sriinnovations.com',
        productName: 'Sony Bravia 55 inch LED TV',
        brand: 'Sony',
        model: 'KD-55X7002E',
        problemDescription: 'Horizontal color lines appearing on the lower half of screen after lightning storm.',
        bookingDate: '2026-08-28',
        timeSlot: '11:30 AM - 01:30 PM',
        address: 'Flat 402, Green Valley Apartments, Indiranagar, Bangalore - 560038',
        aadhaarMasked: 'XXXX XXXX 8912',
        paymentMethod: 'Pay After Service',
        paymentStatus: 'Pending',
        bookingStatus: 'Confirmed',
        technician: {
          name: 'Anand Kumar (Sr. TV Specialist)',
          phone: '+91 98765 00011'
        }
      }
    ];
  });

  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('sri_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('sri_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('sri_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('sri_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('sri_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('sri_compare', JSON.stringify(compareList));
  }, [compareList]);

  useEffect(() => {
    localStorage.setItem('sri_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('sri_bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Cart actions
  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Wishlist actions
  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  // Compare actions
  const toggleCompare = (product) => {
    setCompareList(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      if (prev.length >= 4) {
        alert('You can compare a maximum of 4 products at once.');
        return prev;
      }
      return [...prev, product];
    });
  };

  const removeFromCompare = (productId) => {
    setCompareList(prev => prev.filter(item => item.id !== productId));
  };

  // Order & Booking creation
  const placeOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      id: 'SRI-' + Math.floor(100000 + Math.random() * 900000),
      createdAt: new Date().toISOString(),
      orderStatus: 'Confirmed'
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const createBooking = (bookingData) => {
    const newBooking = {
      ...bookingData,
      id: 'SRI-SRV-' + Math.floor(10000 + Math.random() * 90000),
      createdAt: new Date().toISOString(),
      bookingStatus: 'Confirmed',
      technician: {
        name: 'Assigned Lead Technician (Sri Innovations Hub)',
        phone: '+91 98765 43210'
      }
    };
    setBookings(prev => [newBooking, ...prev]);
    return newBooking;
  };

  // Admin mutation methods
  const addProduct = (newProduct) => {
    const item = { ...newProduct, id: 'prod-' + Date.now() };
    setProducts(prev => [item, ...prev]);
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedProduct } : p));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const addService = (newService) => {
    const item = { ...newService, id: 'srv-' + Date.now() };
    setServices(prev => [item, ...prev]);
  };

  const updateService = (id, updatedService) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...updatedService } : s));
  };

  const deleteService = (id) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, orderStatus: newStatus } : o));
  };

  const updateBookingStatus = (bookingId, newStatus, technician = null) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? {
      ...b,
      bookingStatus: newStatus,
      technician: technician || b.technician
    } : b));
  };

  // Coupon evaluation
  const applyCouponCode = (code, subtotal) => {
    const coupon = coupons.find(c => c.code.toUpperCase() === code.trim().toUpperCase() && c.active);
    if (!coupon) {
      return { success: false, message: 'Invalid or expired coupon code.' };
    }
    if (subtotal < coupon.minimumOrder) {
      return { success: false, message: `Minimum order amount for this coupon is ₹${coupon.minimumOrder}.` };
    }
    let discountAmount = 0;
    if (coupon.discountType === 'percentage') {
      discountAmount = Math.min((subtotal * coupon.discountValue) / 100, coupon.maximumDiscount);
    } else {
      discountAmount = coupon.discountValue;
    }
    setAppliedCoupon({ ...coupon, calculatedDiscount: discountAmount });
    return { success: true, discount: discountAmount, message: `Coupon ${coupon.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.product.discountPrice || item.product.price) * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <StoreContext.Provider value={{
      products,
      services,
      coupons,
      cart,
      wishlist,
      compareList,
      orders,
      bookings,
      appliedCoupon,
      cartSubtotal,
      cartCount,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
      toggleWishlist,
      isInWishlist,
      toggleCompare,
      removeFromCompare,
      placeOrder,
      createBooking,
      applyCouponCode,
      removeCoupon,
      addProduct,
      updateProduct,
      deleteProduct,
      addService,
      updateService,
      deleteService,
      updateOrderStatus,
      updateBookingStatus
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
