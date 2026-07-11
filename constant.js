export const categories = {
  Quick: "Quick",
  Standard: "Standard",
  Food: "Food",
  Clothes: "Clothes",
  Medicine: "Medicine",
  Electronics: "Electronics",
  General: "General",
  Others: "Others",
};

export const SUPPORTED_SITES = [
  // QUICK COMMERCE
  {
    id: 'blinkit',
    name: 'Blinkit',
    type: 'Instant',
    queryUrl: (q) => `https://blinkit.com/s/?q=${encodeURIComponent(q)}`,
    category: [categories.Quick, categories.Food, categories.Electronics, categories.General]
  },
  {
    id: 'zepto',
    name: 'Zepto',
    type: 'Instant',
    queryUrl: (q) => `https://zeptonow.com/search?query=${encodeURIComponent(q)}`,
    category: [categories.Quick, categories.Food, categories.Electronics, categories.General]
  },
  {
    id: 'bigbasket',
    name: 'BigBasket',
    type: 'Instant',
    queryUrl: (q) => `https://www.bigbasket.com/ps/?q=${encodeURIComponent(q)}`,
    category: [categories.Quick, categories.Food, categories.Electronics, categories.General]
  },
  {
    id: 'swiggy_instamart',
    name: 'Instamart',
    type: 'Instant',
    queryUrl: (q) => `https://www.swiggy.com/instamart/search?custom_back=true&query=chocolate`,
    category: [categories.Quick, categories.Food, categories.Electronics, categories.General]
  },
  {
    id: 'zepto_alt',
    name: 'Zepto (Alt)',
    type: 'Instant',
    queryUrl: (q) => `https://www.zeptonow.com/search?query=${encodeURIComponent(q)}`,
    category: [categories.Quick, categories.Food, categories.Electronics, categories.General]
  },
    {
    id: 'jiomart',
    name: 'JioMart',
    type: 'Instant',
    queryUrl: (q) => `https://www.jiomart.com/products?q=${encodeURIComponent(q)}&searchtype=standard`,
    category: [categories.Quick, categories.Food, categories.Electronics, categories.General]
  },

  // GENERAL ECOMMERCE
  {
    id: 'amazon',
    name: 'Amazon',
    type: 'Standard',
    queryUrl: (q) => `https://www.amazon.in/s?k=${encodeURIComponent(q)}`,
    category: [categories.Standard, categories.Clothes, categories.Electronics, categories.General]
  },
  {
    id: 'flipkart',
    name: 'Flipkart',
    type: 'Standard',
    queryUrl: (q) => `https://www.flipkart.com/search?q=${encodeURIComponent(q)}`,
    category: [categories.Standard, categories.Clothes, categories.Electronics, categories.General]
  },
  {
    id: 'myntra',
    name: 'Myntra',
    type: 'Standard',
    queryUrl: (q) => `https://www.myntra.com/${encodeURIComponent(q)}`,
    category: [categories.Standard, categories.Clothes, categories.General]
  },
  {
    id: 'ajio',
    name: 'AJIO',
    type: 'Standard',
    queryUrl: (q) => `https://www.ajio.com/search/?text=${encodeURIComponent(q)}`,
    category: [categories.Standard, categories.Clothes, categories.Electronics, categories.General]
  },
  {
    id: 'meesho',
    name: 'Meesho',
    type: 'Standard',
    queryUrl: (q) => `https://www.meesho.com/search?q=${encodeURIComponent(q)}`,
    category: [categories.Standard, categories.Clothes, categories.Electronics, categories.General]
  },
  {
    id: 'tatacliq',
    name: 'Tata CLiQ',
    type: 'Standard',
    queryUrl: (q) => `https://www.tatacliq.com/search/?searchCategory=all&text=${encodeURIComponent(q)}`,
    category: [categories.Standard, categories.Medicine]
  },
  {
    id: 'nykaa',
    name: 'Nykaa',
    type: 'Standard',
    queryUrl: (q) => `https://www.nykaa.com/search/result/?q=${encodeURIComponent(q)}`,
    category: [categories.Standard, categories.Clothes, categories.Electronics, categories.General]
  },

  {
    id: 'reliance_digital',
    name: 'Reliance Digital',
    type: 'Standard',
    queryUrl: (q) => `https://www.reliancedigital.in/products?q=${encodeURIComponent(q)}`,
    category: [categories.Standard, categories.Electronics]
  },
  {
    id: 'croma',
    name: 'Croma',
    type: 'Standard',
    queryUrl: (q) => `https://www.croma.com/searchB?text=${encodeURIComponent(q)}`,
    category: [categories.Standard, categories.Electronics]
  },
  {
    id: 'vijay_sales',
    name: 'Vijay Sales',
    type: 'Standard',
    queryUrl: (q) => `https://www.vijaysales.com/search-listing?q=t${encodeURIComponent(q)}`,
    category: [categories.Standard, categories.Electronics]
  },

  {
    id: 'pharmeasy',
    name: 'PharmEasy',
    type: 'Standard',
    queryUrl: (q) => `https://pharmeasy.in/search/all?name=${encodeURIComponent(q)}`,
    category: [categories.Standard, categories.Medicine]
  },
  {
    id: '1mg',
    name: 'Tata 1mg',
    type: 'Standard',
    queryUrl: (q) => `https://www.1mg.com/search/all?name=${encodeURIComponent(q)}`,
    category: [categories.Standard, categories.Medicine]
  },

  {
    id: 'shoppers_stop',
    name: "Shoppers Stop",
    type: 'Standard',
    queryUrl: (q) => `https://www.shoppersstop.com/search/result/?q=${encodeURIComponent(q)}`,
    category: [categories.Standard, categories.General]
  },


  {
    id: 'google_shopping',
    name: 'Google',
    type: 'Fallback',
    queryUrl: (q) => `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(q)}`,
    category: [categories.General, categories.Standard, categories.Quick]
  }
];

export const themes = {
  dark: { bg: '#0F0F10', card: '#161618', input: '#222225', text: '#FFFFFF', textMuted: '#8E8E93', border: '#262629' },
  light: { bg: '#F2F2F7', card: '#FFFFFF', input: '#E5E5EA', text: '#000000', textMuted: '#66666E', border: '#D1D1D6' }
};

export const accentPresets = ['#34c759', '#ff9900', '#007aff', '#ff3b30', '#af52de'];