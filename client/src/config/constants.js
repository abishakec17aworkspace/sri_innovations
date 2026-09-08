export const STORE_CONFIG = {
  name: 'Sri Innovations',
  tagline: 'Electronics, Hardware & Expert Repair Services',
  officialLogo: '/logo.png',
  googleMapsUrl: 'https://maps.app.goo.gl/MLFdoXzyzq3AMzDZ7',
  whatsappNumber: '+91 98765 43210',
  whatsappMessage: 'Hello Sri Innovations, I would like to inquire about your products/services.',
  phone: '+91 98765 43210',
  email: 'contact@sriinnovations.com',
  supportEmail: 'support@sriinnovations.com',
  address: {
    line1: 'Sri Innovations Flagship Store & Service Hub',
    street: 'Main Commercial Hub',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560001',
    country: 'India'
  },
  businessHours: {
    weekdays: '9:00 AM - 9:00 PM',
    sunday: '10:00 AM - 7:00 PM'
  },
  social: {
    facebook: 'https://facebook.com/sriinnovations',
    instagram: 'https://instagram.com/sriinnovations',
    twitter: 'https://twitter.com/sriinnovations',
    youtube: 'https://youtube.com/sriinnovations'
  },
  shipping: {
    freeThreshold: 999,
    standardFee: 79,
    expressFee: 149
  },
  taxRatePercentage: 18, // GST
  currency: '₹',
};

export const PRODUCT_CATEGORIES = [
  {
    id: 'large-appliances',
    name: 'Large Appliances',
    slug: 'large-appliances',
    description: 'Refrigerators, Washing Machines, Air Conditioners & more',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
    subcategories: ['Refrigerators', 'Washing Machines', 'Air Conditioners', 'Microwave Ovens', 'Dishwashers'],
    featured: true
  },
  {
    id: 'small-appliances',
    name: 'Small Appliances',
    slug: 'small-appliances',
    description: 'Mixers, Grinders, Kettles, Irons & Kitchen Essentials',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
    subcategories: ['Mixer Grinders', 'Electric Kettles', 'Toasters', 'Induction Cooktops', 'Ceiling & Table Fans'],
    featured: true
  },
  {
    id: 'televisions',
    name: 'Televisions & Home Audio',
    slug: 'televisions',
    description: '4K Ultra HD, OLED, Smart LED TVs & Cinematic Soundbars',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=600&q=80',
    subcategories: ['Smart TV', '4K Ultra HD', 'OLED TV', 'Soundbars', 'Home Theatres'],
    featured: true
  },
  {
    id: 'computers-laptops',
    name: 'Computers & Laptops',
    slug: 'computers-laptops',
    description: 'High Performance Laptops, Desktops, Monitors & Peripherals',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80',
    subcategories: ['Gaming Laptops', 'Business Laptops', 'Desktops', 'Monitors', 'Keyboards & Mice', 'Printers'],
    featured: true
  },
  {
    id: 'mobiles-accessories',
    name: 'Mobiles & Accessories',
    slug: 'mobiles-accessories',
    description: 'Smartphones, Rugged Cases, Fast Chargers, Power Banks',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
    subcategories: ['Smartphones', 'Mobile Cases', 'Fast Chargers', 'Braided Cables', 'Power Banks', 'Screen Protectors'],
    featured: true
  },
  {
    id: 'audio',
    name: 'Audio & Wearables',
    slug: 'audio',
    description: 'Wireless Earbuds, Noise Cancelling Headphones, Bluetooth Speakers',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    subcategories: ['TWS Earbuds', 'Wireless Headphones', 'Bluetooth Speakers', 'Neckbands', 'Smartwatches'],
    featured: true
  },
  {
    id: 'gaming',
    name: 'Gaming & Consoles',
    slug: 'gaming',
    description: 'PS5, Xbox, Pro Controllers, Mechanical Keyboards & VR',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80',
    subcategories: ['PS5 Consoles', 'Controllers', 'Gaming Headsets', 'Gaming Chairs', 'Gaming Accessories'],
    featured: true
  },
  {
    id: 'computer-hardware',
    name: 'Computer Hardware & Components',
    slug: 'computer-hardware',
    description: 'Motherboards, SSDs, RAM, Power Supplies, Graphic Cards',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80',
    subcategories: ['Internal SSDs', 'RAM Modules', 'Graphic Cards', 'Power Supplies', 'Cabinet Fans'],
    featured: true
  }
];

export const BRANDS = [
  { id: 'samsung', name: 'Samsung', logo: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=200&q=80' },
  { id: 'sony', name: 'Sony', logo: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=200&q=80' },
  { id: 'apple', name: 'Apple', logo: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=200&q=80' },
  { id: 'lg', name: 'LG', logo: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=200&q=80' },
  { id: 'hp', name: 'HP', logo: 'https://images.unsplash.com/photo-1589561084283-930aa7b1ce50?auto=format&fit=crop&w=200&q=80' },
  { id: 'dell', name: 'Dell', logo: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=200&q=80' },
  { id: 'lenovo', name: 'Lenovo', logo: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=200&q=80' },
  { id: 'logitech', name: 'Logitech', logo: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=200&q=80' },
  { id: 'boat', name: 'boAt', logo: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=200&q=80' },
  { id: 'jbl', name: 'JBL', logo: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=200&q=80' },
  { id: 'asus', name: 'Asus ROG', logo: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=200&q=80' },
  { id: 'xiaomi', name: 'Xiaomi', logo: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=200&q=80' }
];

export const SERVICE_TIME_SLOTS = [
  '09:30 AM - 11:30 AM',
  '11:30 AM - 01:30 PM',
  '02:00 PM - 04:00 PM',
  '04:00 PM - 06:00 PM',
  '06:00 PM - 08:00 PM'
];
