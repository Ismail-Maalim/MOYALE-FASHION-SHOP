/* ==========================================================================
   Garissa and Moyale Fashion Ltd - Secure E-Commerce Engine
   Features: Input Sanitization (XSS Prevention), Rate Limiting, CSP Support, WebP CDN, Cart & WhatsApp Checkout
   Location: Opposite Migingo/KCB, Nandi Hills Town, Kenya
   WhatsApp & Phone: 0793788938
   ========================================================================== */

// --- 1. Security Utilities (XSS Prevention & HTML Sanitization) ---
function sanitizeHTML(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// --- 2. Cloudinary Asset Optimization Helper (WebP & Dynamic Quality) ---
function optimizeCldUrl(url) {
  if (!url || typeof url !== 'string') return url;
  if (url.includes('cloudinary.com') && !url.includes('/f_auto,q_auto/')) {
    return url.replace('/upload/', '/upload/f_auto,q_auto/');
  }
  return url;
}

// --- 3. Clean Kebab-Case Product Data Store ---
const rawProducts = [
  // Outerwear & Jackets
  {
    id: 'varsity-bomber-jacket',
    title: "Varsity Bomber Jacket",
    category: "clothes",
    subCat: "jackets",
    gender: "mens",
    genderLabel: "Men's & Unisex Outerwear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012781/varsity_mont_dos6ks.png",
    description: "Stylish varsity bomber jacket with premium ribbed cuffs, front snap buttons, and sleek urban design. Available wholesale and retail.",
    badge: "Best Seller"
  },
  {
    id: 'urban-varsity-jacket',
    title: "Urban Varsity Jacket",
    category: "clothes",
    subCat: "jackets",
    gender: "mens",
    genderLabel: "Men's & Unisex Outerwear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785008418/varsity_mont_txvc8z.png",
    description: "Trendy urban varsity jacket suitable for casual wear, college, and outdoor styling. Available in multiple colors & sizes.",
    badge: "Popular"
  },
  {
    id: 'puffer-pillow-jacket',
    title: "Puffer Pillow Jacket",
    category: "clothes",
    subCat: "jackets",
    gender: "both",
    genderLabel: "Heavy Winter Wear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012775/pillow_jacket_qyzlnw.png",
    description: "Ultra-warm quilted puffer pillow jacket with high neck wind resistant lining for cold weather.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'planda-winter-jacket',
    title: "Planda Winter Jacket",
    category: "clothes",
    subCat: "jackets",
    gender: "mens",
    genderLabel: "Heavy Winter Wear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012776/planda_jacket_n1lpyr.png",
    description: "Heavy-duty Planda winter jacket crafted for maximum thermal comfort and durability.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'xl-heavy-winter-jacket',
    title: "XL Heavy Winter Jacket",
    category: "clothes",
    subCat: "jackets",
    gender: "mens",
    genderLabel: "Men Outerwear (XL)",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012769/jacket_xl_g6wlw8.png",
    description: "Insulated heavy winter jacket in XL size. Dual zip closure and storm hood.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: '2xl-insulated-jacket',
    title: "2XL Insulated Jacket",
    category: "clothes",
    subCat: "jackets",
    gender: "mens",
    genderLabel: "Men Outerwear (2XL)",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012765/jacket_2xl_ubsy2e.png",
    description: "Cold-resistant insulated winter jacket in 2XL size with deep fleece-lined pockets.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: '3xl-heavy-winter-jacket',
    title: "3XL Heavy Winter Jacket",
    category: "clothes",
    subCat: "jackets",
    gender: "mens",
    genderLabel: "Men Outerwear (3XL)",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012766/jacket_3xl_ctvj0w.png",
    description: "Heavy winter puffer jacket in 3XL size. Reversible design with adjustable hood.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: '4xl-puffer-jacket',
    title: "4XL Puffer Jacket",
    category: "clothes",
    subCat: "jackets",
    gender: "mens",
    genderLabel: "Men Outerwear (4XL)",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012768/jacket_4xl_cpb4mw.png",
    description: "Extra spacious 4XL puffer winter jacket for maximum warmth and room.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: '4xl-heavy-coat',
    title: "4XL Heavy Coat",
    category: "clothes",
    subCat: "jackets",
    gender: "mens",
    genderLabel: "Men Outerwear (4XL)",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012768/jacket_4xl_emkjvs.png",
    description: "Heavyweight 4XL winter coat built for tough weather conditions.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'fleece-lined-denim-jackets',
    title: "Fleece-Lined Denim Jackets",
    category: "clothes",
    subCat: "jackets",
    gender: "both",
    genderLabel: "Denim Collection",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012759/denim_jackets_bzej0i.png",
    description: "Warm fleece-lined denim jackets with soft shearling collars. Available in Black, Royal Blue, and Acid Wash.",
    badge: "Top Rated"
  },
  {
    id: 'classic-denim-jacket',
    title: "Classic Denim Jacket",
    category: "clothes",
    subCat: "jackets",
    gender: "both",
    genderLabel: "Denim Collection",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012758/denim_jacket_1_sxxyvp.png",
    description: "Timeless classic denim button-down jacket with chest pockets.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'executive-classic-jacket',
    title: "Executive Classic Jacket",
    category: "clothes",
    subCat: "jackets",
    gender: "mens",
    genderLabel: "Men Official Wear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012757/classic_jacket_vlcbaz.png",
    description: "Smart executive casual jacket for office and weekend smart casual looks.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'mens-casual-zip-jackets',
    title: "Men's Casual Zip Jackets",
    category: "clothes",
    subCat: "jackets",
    gender: "mens",
    genderLabel: "Men Outerwear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012769/jackets_gtzshh.jpg",
    description: "Lightweight zip casual jackets in Khaki, Olive Green, Navy Blue, and Dark Navy.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'cozy-warm-sweater',
    title: "Cozy Warm Sweater",
    category: "clothes",
    subCat: "sweaters",
    gender: "both",
    genderLabel: "Knitwear Collection",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012780/sweater_hvzoth.png",
    description: "Soft knit sweater designed for cozy warmth and comfortable daily layering.",
    badge: "Kwa Bei Nafuu"
  },

  // Women's Wear & Jeans
  {
    id: 'women-stylish-denim-jeans',
    title: "Women's Stylish Denim Jeans",
    category: "clothes",
    subCat: "jeans",
    gender: "ladies",
    genderLabel: "Ladies Collection",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012783/women_s_jeans_c8ggmu.jpg",
    description: "High-waist stretch denim jeans for ladies with perfect fit and durable denim fabric.",
    badge: "Hot Deal"
  },
  {
    id: 'premium-denim-jeans',
    title: "Premium Denim Jeans",
    category: "clothes",
    subCat: "jeans",
    gender: "both",
    genderLabel: "Jeans Collection",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012770/jeans_p7hqif.jpg",
    description: "Quality straight-leg denim jeans in dark blue and washed denim finishes.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'elegance-fashion-dress',
    title: "Elegance Fashion Dress",
    category: "clothes",
    subCat: "dresses",
    gender: "ladies",
    genderLabel: "Ladies Collection",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012760/elegance_r5wgct.png",
    description: "Elegant ladies fashion dress for events, church, and official occasions.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'leopard-print-collection',
    title: "Leopard Pattern Fashion Wear",
    category: "clothes",
    subCat: "dresses",
    gender: "ladies",
    genderLabel: "Ladies Collection",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012772/leopard_ci9ijf.jpg",
    description: "Chic leopard print fashion top and dress collection for ladies.",
    badge: "Trendy"
  },

  // Women's Mary Jane Shoes & Heels
  {
    id: 'white-mary-jane-strap-heels',
    title: "White Mary Jane Strap Heels",
    category: "shoes",
    subCat: "mary-jane",
    gender: "ladies",
    genderLabel: "Ladies Footwear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012782/white_marry_jane_kkvxqs.png",
    description: "Elegant white Mary Jane pumps with double adjustable ankle straps and gold embroidery detail.",
    badge: "Featured"
  },
  {
    id: 'white-mary-jane-wedge-heels',
    title: "White Mary Jane Wedge Heels",
    category: "shoes",
    subCat: "mary-jane",
    gender: "ladies",
    genderLabel: "Ladies Footwear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012782/white_marry_jane_2_tjrnge.png",
    description: "Comfortable white low-wedge Mary Jane pumps for office and event wear.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'black-mary-jane-strap-heels',
    title: "Black Mary Jane Strap Heels",
    category: "shoes",
    subCat: "mary-jane",
    gender: "ladies",
    genderLabel: "Ladies Footwear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012756/black_marry_jane_k2hs1s.png",
    description: "Classic glossy black Mary Jane shoes with cushioned insoles.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'beige-mary-jane-wedge-heels',
    title: "Beige Mary Jane Low Wedge Heels",
    category: "shoes",
    subCat: "mary-jane",
    gender: "ladies",
    genderLabel: "Ladies Footwear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012756/bej_marry_jane_wxdze9.png",
    description: "Stylish beige khaki Mary Jane pumps with golden side embroidery.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'grey-mary-jane-wedge-heels',
    title: "Grey Mary Jane Wedge Heels",
    category: "shoes",
    subCat: "mary-jane",
    gender: "ladies",
    genderLabel: "Ladies Footwear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012763/grey_marry_jane_rkbi8x.png",
    description: "Sleek dark grey Mary Jane wedge shoes with supportive ankle straps.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'grey-mary-jane-pumps-mb26',
    title: "Grey Mary Jane Pumps (MB26-25J)",
    category: "shoes",
    subCat: "mary-jane",
    gender: "ladies",
    genderLabel: "Ladies Footwear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785007996/grey_marry_jane_mxapol.png",
    description: "Classy grey Mary Jane pumps (Model MB26-25J) available in all sizes.",
    badge: "Kwa Bei Nafuu"
  },

  // Sneakers & Athletic Shoes
  {
    id: 'samba-classic-white-sneakers',
    title: "Samba Classic White Sneakers",
    category: "shoes",
    subCat: "sneakers",
    gender: "both",
    genderLabel: "Sneaker Collection",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012778/samba_sneakers_w7o66r.png",
    description: "Iconic Samba classic white sneakers with grey suede toe cap and black stripes.",
    badge: "Hot Seller"
  },
  {
    id: 'samba-leather-sneakers',
    title: "Samba Leather Sneakers",
    category: "shoes",
    subCat: "sneakers",
    gender: "both",
    genderLabel: "Sneaker Collection",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012777/samba_sneakers_hpp9uh.jpg",
    description: "Durable leather Samba sneakers for casual streetwear styling.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'samba-retro-edition-sneakers',
    title: "Samba Retro Edition Sneakers",
    category: "shoes",
    subCat: "sneakers",
    gender: "both",
    genderLabel: "Sneaker Collection",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012776/samba_adidas_rhrfrn.jpg",
    description: "Retro Samba low-top sneakers with gum rubber sole.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'urban-streetwear-sneakers',
    title: "Urban Streetwear Sneakers",
    category: "shoes",
    subCat: "sneakers",
    gender: "both",
    genderLabel: "Sneaker Collection",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012778/sneakers2_doypsp.jpg",
    description: "Trendy thick-soled urban sneakers for daily comfort and street fashion.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'athletic-sport-shoes',
    title: "Athletic Sport Shoes",
    category: "shoes",
    subCat: "sports",
    gender: "both",
    genderLabel: "Sport Footwear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012779/sport_shoe_bkzzm9.jpg",
    description: "Breathable athletic sport shoes for running, training, and active wear.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'nike-style-athletic-sneakers',
    title: "Nike Style Athletic Sneakers",
    category: "shoes",
    subCat: "sports",
    gender: "both",
    genderLabel: "Sport Footwear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012774/nikes_edp97b.jpg",
    description: "High performance athletic sneakers with cushioned sole support.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'nike-running-shoes',
    title: "Nike Running Shoes",
    category: "shoes",
    subCat: "sports",
    gender: "both",
    genderLabel: "Sport Footwear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012774/nike_runningshoe_ljn4pj.png",
    description: "Lightweight flexible mesh running shoes for maximum breathability.",
    badge: "Kwa Bei Nafuu"
  },

  // Men's Leather Official Shoes, Loafers & Boots
  {
    id: 'kaisifeier-leather-dress-shoes',
    title: "Kaisifeier Men's Leather Dress Shoes",
    category: "shoes",
    subCat: "loafers",
    gender: "mens",
    genderLabel: "Men Official Shoes",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012772/leathershoe_fchd8h.jpg",
    description: "Premium Kaisifeier black slip-on leather dress shoes (KS-P2035 BLK) for suits and official wear.",
    badge: "Executive"
  },
  {
    id: 'leather-loafers',
    title: "Men's Leather Loafers",
    category: "shoes",
    subCat: "loafers",
    gender: "mens",
    genderLabel: "Men Footwear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012771/Leather_loafers_oep6r7.png",
    description: "Classic men's genuine leather loafers with comfortable slip-on fit.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'hiking-outdoor-boots',
    title: "Outdoor Hiking & Work Boots",
    category: "shoes",
    subCat: "boots",
    gender: "mens",
    genderLabel: "Men Footwear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012764/hiking_boots_fondbk.png",
    description: "Heavy-duty outdoor hiking and work boots with deep grip rubber soles.",
    badge: "Durable"
  },
  {
    id: 'freedom-comfort-shoes',
    title: "Freedom Comfort Shoes",
    category: "shoes",
    subCat: "sports",
    gender: "both",
    genderLabel: "Casual Footwear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012761/freedom_oyhilp.jpg",
    description: "Flexible lightweight Freedom comfort shoes for daily walking.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'casual-footwear-collection',
    title: "Casual Footwear Collection",
    category: "shoes",
    subCat: "sports",
    gender: "both",
    genderLabel: "Casual Footwear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012761/footware_tjufch.jpg",
    description: "Quality casual shoes and slip-ons for everyday wear.",
    badge: "Kwa Bei Nafuu"
  }
];

// Optimize all image URLs for WebP & compression
const products = rawProducts.map(p => ({
  ...p,
  image: optimizeCldUrl(p.image)
}));

// WhatsApp Phone Number
const WHATSAPP_NUMBER = "254793788938";

// --- State Management ---
let currentFilter = 'all';
let currentSearch = '';
let cart = loadCart();
let activeModalProduct = null;
let lastSubmissionTime = 0; // Anti-Automation Throttle

// --- Secure LocalStorage Cart Loader ---
function loadCart() {
  try {
    const saved = localStorage.getItem('gm_fashion_cart');
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];
    // Validate object structure against tampering
    return parsed.filter(item => item && typeof item.id === 'string' && typeof item.qty === 'number' && item.qty > 0);
  } catch (e) {
    return [];
  }
}

function saveCart() {
  try {
    localStorage.setItem('gm_fashion_cart', JSON.stringify(cart));
    updateCartUI();
  } catch (e) {}
}

// --- DOM Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  setupEventListeners();
  updateFooterYear();
  updateCartUI();
});

// --- 4. Render Products Grid with Sorting & Filtering ---
function renderProducts() {
  const grid = document.getElementById('products-grid');
  const emptyState = document.getElementById('empty-state');
  const sortSelect = document.getElementById('catalog-sort');
  
  if (!grid) return;

  const sortValue = sortSelect ? sortSelect.value : 'featured';

  // Filter products
  let filtered = products.filter(item => {
    const matchesFilter = (currentFilter === 'all') ||
                          (item.category === currentFilter) ||
                          (item.subCat === currentFilter) ||
                          (currentFilter === 'mens' && (item.gender === 'mens' || item.gender === 'both')) ||
                          (currentFilter === 'ladies' && (item.gender === 'ladies' || item.gender === 'both'));

    const query = currentSearch.toLowerCase().trim();
    const matchesSearch = !query || 
                          item.title.toLowerCase().includes(query) || 
                          item.description.toLowerCase().includes(query) ||
                          item.category.toLowerCase().includes(query) ||
                          item.genderLabel.toLowerCase().includes(query);

    return matchesFilter && matchesSearch;
  });

  // Apply Sorting
  if (sortValue === 'name-asc') {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortValue === 'name-desc') {
    filtered.sort((a, b) => b.title.localeCompare(a.title));
  } else if (sortValue === 'cat') {
    filtered.sort((a, b) => a.category.localeCompare(b.category));
  }

  if (filtered.length === 0) {
    grid.innerHTML = '';
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';

  grid.innerHTML = filtered.map(product => {
    const safeTitle = sanitizeHTML(product.title);
    const safeBadge = sanitizeHTML(product.badge);
    const safeCat = sanitizeHTML(product.category.toUpperCase());
    const safeGenderLabel = sanitizeHTML(product.genderLabel);
    const safeDesc = sanitizeHTML(product.description);

    const encodedMsg = encodeURIComponent(
      `Hello Garissa and Moyale Fashion Ltd! I am interested in inquiring about "${product.title}" (${product.genderLabel}). Please let me know the wholesale/retail price and stock.`
    );
    const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;

    return `
      <div class="product-card" id="card-${product.id}">
        <div class="product-img-wrap" onclick="openProductModal('${product.id}')" title="Click to view details">
          <img src="${product.image}" alt="${safeTitle}" loading="lazy" decoding="async" onerror="this.onerror=null; this.src='https://res.cloudinary.com/omvbgydr/image/upload/f_auto,q_auto/v1785012781/varsity_mont_dos6ks.png'">
          <span class="product-badge-slogan"><i class="fa-solid fa-tag"></i> ${safeBadge}</span>
          <span class="product-price-badge">Wholesale & Retail</span>
        </div>
        <div class="product-info">
          <span class="product-cat-name">${safeCat} &bull; ${safeGenderLabel}</span>
          <h3 class="product-title" onclick="openProductModal('${product.id}')">${safeTitle}</h3>
          <p class="product-desc">${safeDesc}</p>
          <div class="product-actions">
            <button class="btn btn-sm btn-primary" onclick="addToCart('${product.id}')" style="flex:1;">
              <i class="fa-solid fa-cart-plus"></i> Add to Cart
            </button>
            <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-whatsapp" title="Inquire on WhatsApp" aria-label="Inquire about ${safeTitle} on WhatsApp">
              <i class="fa-brands fa-whatsapp"></i> Inquire
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// --- 5. Event Listeners Setup ---
function setupEventListeners() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
      const isOpen = navMenu.classList.contains('mobile-open');
      mobileToggle.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-open');
        mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  const tabs = document.querySelectorAll('#filter-tabs .tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentFilter = tab.getAttribute('data-filter');
      renderProducts();
    });
  });
}

// --- 6. Search Filter Handler ---
function filterProducts() {
  const searchInput = document.getElementById('gallery-search');
  const clearBtn = document.getElementById('clear-search');
  
  if (searchInput) {
    currentSearch = sanitizeHTML(searchInput.value);
    if (clearBtn) {
      clearBtn.style.display = currentSearch ? 'block' : 'none';
    }
    renderProducts();
  }
}

function clearSearch() {
  const searchInput = document.getElementById('gallery-search');
  const clearBtn = document.getElementById('clear-search');
  
  if (searchInput) {
    searchInput.value = '';
    currentSearch = '';
    if (clearBtn) clearBtn.style.display = 'none';
    renderProducts();
  }
}

function filterGalleryCategory(category) {
  const tabs = document.querySelectorAll('#filter-tabs .tab-btn');
  tabs.forEach(t => {
    if (t.getAttribute('data-filter') === category) {
      t.classList.add('active');
    } else {
      t.classList.remove('active');
    }
  });
  
  currentFilter = category;
  renderProducts();

  const section = document.getElementById('products');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

function resetGallery() {
  clearSearch();
  filterGalleryCategory('all');
}

// --- 7. Interactive Modal Handler ---
function openProductModal(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  activeModalProduct = product;

  const modal = document.getElementById('product-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalCat = document.getElementById('modal-category');
  const modalGender = document.getElementById('modal-gender');
  const modalDesc = document.getElementById('modal-desc');
  const modalWaBtn = document.getElementById('modal-wa-btn');

  if (modalImg) modalImg.src = product.image;
  if (modalTitle) modalTitle.textContent = product.title;
  if (modalCat) modalCat.textContent = product.category.toUpperCase();
  if (modalGender) modalGender.textContent = `${product.genderLabel} • Wholesale & Retail`;
  if (modalDesc) modalDesc.textContent = product.description;

  const encodedMsg = encodeURIComponent(
    `Hello Garissa and Moyale Fashion Ltd! I am interested in "${product.title}" (${product.genderLabel}). Please send me the wholesale/retail price and stock availability.`
  );
  if (modalWaBtn) {
    modalWaBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;
  }

  if (modal) modal.classList.add('active');
}

function closeProductModal(event) {
  const modal = document.getElementById('product-modal');
  if (modal) modal.classList.remove('active');
}

function addCurrentModalToCart() {
  if (activeModalProduct) {
    addToCart(activeModalProduct.id);
    closeProductModal();
    toggleCartDrawer();
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProductModal();
  }
});

// --- 8. Cart Drawer Management ---
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: product.id, title: product.title, image: product.image, qty: 1 });
  }

  saveCart();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
}

function updateCartQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) {
      removeFromCart(productId);
    } else {
      saveCart();
    }
  }
}

function clearCart() {
  cart = [];
  saveCart();
}

function toggleCartDrawer() {
  const overlay = document.getElementById('cart-drawer-overlay');
  if (overlay) {
    overlay.classList.toggle('active');
  }
}

function updateCartUI() {
  const badge = document.getElementById('cart-badge');
  const mobileBadge = document.getElementById('mobile-cart-count');
  const drawerCount = document.getElementById('cart-drawer-count');
  const drawerTotalQty = document.getElementById('cart-total-qty');
  const drawerItems = document.getElementById('cart-drawer-items');

  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);

  if (badge) badge.textContent = totalCount;
  if (mobileBadge) mobileBadge.textContent = totalCount;
  if (drawerCount) drawerCount.textContent = totalCount;
  if (drawerTotalQty) drawerTotalQty.textContent = `${totalCount} item${totalCount === 1 ? '' : 's'}`;

  if (!drawerItems) return;

  if (cart.length === 0) {
    drawerItems.innerHTML = `
      <div class="cart-empty">
        <i class="fa-solid fa-basket-shopping"></i>
        <p>Your shopping cart is empty.</p>
        <button class="btn btn-sm btn-primary" onclick="toggleCartDrawer()"><i class="fa-solid fa-store"></i> Browse Products</button>
      </div>
    `;
    return;
  }

  drawerItems.innerHTML = cart.map(item => {
    const safeItemTitle = sanitizeHTML(item.title);
    return `
      <div class="cart-item">
        <img src="${item.image}" alt="${safeItemTitle}" class="cart-item-img" loading="lazy" decoding="async">
        <div class="cart-item-info">
          <h4>${safeItemTitle}</h4>
          <div class="cart-item-controls">
            <button onclick="updateCartQty('${item.id}', -1)" aria-label="Decrease quantity"><i class="fa-solid fa-minus"></i></button>
            <span>${item.qty}</span>
            <button onclick="updateCartQty('${item.id}', 1)" aria-label="Increase quantity"><i class="fa-solid fa-plus"></i></button>
            <button class="cart-item-remove" onclick="removeFromCart('${item.id}')" aria-label="Remove item"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function checkoutCartWhatsApp() {
  if (cart.length === 0) {
    alert("Your cart is empty. Please add items to your cart first.");
    return;
  }

  let text = "Hello Garissa and Moyale Fashion Ltd!\nI would like to place an order for the following items:\n\n";
  cart.forEach((item, index) => {
    text += `${index + 1}. ${item.title} (Quantity: ${item.qty})\n`;
  });
  text += "\nPlease provide me with price confirmation and payment/delivery details.";

  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  window.open(waUrl, '_blank', 'noopener,noreferrer');
}

// --- 9. Quick Form to WhatsApp with Rate Limiting & Input Sanitization ---
function sendFormToWhatsApp(e) {
  e.preventDefault();

  // Anti-Automation Rate Limiting (Throttle 3 seconds between clicks)
  const now = Date.now();
  if (now - lastSubmissionTime < 3000) {
    alert("Please wait a moment before submitting another inquiry.");
    return;
  }
  lastSubmissionTime = now;
  
  const rawName = document.getElementById('form-name')?.value || 'Customer';
  const rawOrderType = document.getElementById('form-order-type')?.value || 'Retail/Wholesale';
  const rawItemType = document.getElementById('form-item-type')?.value || 'Fashion Item';
  const rawUserMsg = document.getElementById('form-message')?.value || '';

  const name = sanitizeHTML(rawName.trim());
  const orderType = sanitizeHTML(rawOrderType.trim());
  const itemType = sanitizeHTML(rawItemType.trim());
  const userMsg = sanitizeHTML(rawUserMsg.trim());

  const fullMsg = `Hello Garissa and Moyale Fashion Ltd!\nMy name is ${name}.\nOrder Type: ${orderType}\nProduct Category: ${itemType}\nDetails: ${userMsg}\n(Sent from your website)`;
  
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(fullMsg)}`;
  window.open(waUrl, '_blank', 'noopener,noreferrer');
}

// --- 10. Update Footer Year ---
function updateFooterYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
