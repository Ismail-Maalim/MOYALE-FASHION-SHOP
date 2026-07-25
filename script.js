/* ==========================================================================
   MOYALE FASHION SHOP - Interactive JavaScript Application
   Location: Opposite Migingo/KCB, Nandi Hills Town, Kenya
   WhatsApp & Phone: 0793788938
   ========================================================================== */

// --- 1. Product Data Store ---
const products = [
  {
    id: 'prod-jackets',
    title: "Men's Casual Zip-Up Jackets",
    category: "clothes",
    gender: "mens",
    genderLabel: "Men Collection",
    price: "KSh 950",
    priceVal: 950,
    image: "assets/jackets_950.png",
    fallbackImage: "assets/hero_banner.jpg",
    description: "Lightweight zip-up casual jackets available in Khaki, Olive Green, Navy Blue, and Dark Navy. High-quality fabric for daily wear.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'prod-suit-shoe',
    title: "Men's Official Suit Slip-On Shoes (KS-P2035)",
    category: "shoes",
    gender: "mens",
    genderLabel: "Men Official Shoes",
    price: "KSh 1,600",
    priceVal: 1600,
    image: "assets/suit_shoe_1600.png",
    fallbackImage: "assets/mens_suit_1.jpg",
    description: "Premium Kaisifeier black leather slip-on dress shoes for formal suits, office meetings, and weddings. High shine & durable sole.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'prod-winter-jackets',
    title: "Men's Hooded Heavy Puffer Winter Jackets",
    category: "clothes",
    gender: "mens",
    genderLabel: "Men Collection",
    price: "KSh 1,350",
    priceVal: 1350,
    image: "assets/winter_jackets_1350.png",
    fallbackImage: "assets/hero_banner.jpg",
    description: "Heavy insulated winter puffer jackets with hood in Tan/Khaki, Dark Grey, and Black. Reversible design. Available sizes: XL, 2XL, 3XL, 4XL.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'prod-sweaters',
    title: "Fleece-Lined Denim Sweater Jackets",
    category: "clothes",
    gender: "both",
    genderLabel: "Men & Ladies Wear",
    price: "KSh 1,100",
    priceVal: 1100,
    image: "assets/sweaters_1100.png",
    fallbackImage: "assets/ladies_dress_1.jpg",
    description: "Warm fleece-lined denim sweater jackets with soft white shearling collar. Available in Black, Royal Blue, and Acid-Wash Grey.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'prod-womens-shoes',
    title: "Women's Low-Wedge Strap Heels (MB26-25J)",
    category: "shoes",
    gender: "ladies",
    genderLabel: "Ladies Footwear",
    price: "KSh 1,100",
    priceVal: 1100,
    image: "assets/womens_shoes_1100.png",
    fallbackImage: "assets/ladies_heels_1.jpg",
    description: "Elegant women's low-wedge pump shoes with double adjustable ankle straps and gold side embroidery. Colors: Black, White, Khaki, and Dark Grey.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'prod-ladies-dress',
    title: "Ladies Floral Office & Event Dress",
    category: "clothes",
    gender: "ladies",
    genderLabel: "Ladies Collection",
    price: "KSh 1,450",
    priceVal: 1450,
    image: "assets/ladies_dress_1.jpg",
    fallbackImage: "assets/ladies_dress.jpg",
    description: "Elegant royal purple & blue floral dress for ladies. High-quality tailored fabric suitable for official wear, church, and special events.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'prod-mens-suit',
    title: "Men's Executive 3-Piece Navy Suit",
    category: "clothes",
    gender: "mens",
    genderLabel: "Men Collection",
    price: "KSh 4,500",
    priceVal: 4500,
    image: "assets/mens_suit_1.jpg",
    fallbackImage: "assets/mens_suit.jpg",
    description: "Sharp men's formal 3-piece suit crafted for weddings, business meetings, and special occasions. Perfect fit with matching vest.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'prod-ladies-handbag',
    title: "Ladies Designer Leather Handbag",
    category: "bags",
    gender: "ladies",
    genderLabel: "Ladies Accessories",
    price: "KSh 1,200",
    priceVal: 1200,
    image: "assets/ladies_handbag_1.jpg",
    fallbackImage: "assets/bags_belts.jpg",
    description: "Spacious designer ladies handbag with premium gold hardware and adjustable shoulder strap.",
    badge: "Kwa Bei Nafuu"
  }
];

// WhatsApp Phone Number
const WHATSAPP_NUMBER = "254793788938";

// --- State Variables ---
let currentFilter = 'all';
let currentSearch = '';

// --- DOM Elements ---
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  setupEventListeners();
  updateFooterYear();
});

// --- 2. Render Products Grid ---
function renderProducts() {
  const grid = document.getElementById('products-grid');
  const emptyState = document.getElementById('empty-state');
  
  if (!grid) return;

  // Filter products based on search & tab
  const filtered = products.filter(item => {
    const matchesFilter = (currentFilter === 'all') ||
                          (item.category === currentFilter) ||
                          (currentFilter === 'mens' && (item.gender === 'mens' || item.gender === 'both')) ||
                          (currentFilter === 'ladies' && (item.gender === 'ladies' || item.gender === 'both'));

    const query = currentSearch.toLowerCase().trim();
    const matchesSearch = !query || 
                          item.title.toLowerCase().includes(query) || 
                          item.description.toLowerCase().includes(query) ||
                          item.category.toLowerCase().includes(query) ||
                          item.price.toLowerCase().includes(query) ||
                          item.genderLabel.toLowerCase().includes(query);

    return matchesFilter && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = '';
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';

  grid.innerHTML = filtered.map(product => {
    const encodedMsg = encodeURIComponent(
      `Hello Moyale Fashion Shop! I am interested in inquiring about "${product.title}" (${product.price} each, ${product.genderLabel}). Please let me know the available sizes and stock.`
    );
    const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;

    return `
      <div class="product-card">
        <div class="product-img-wrap">
          <img src="${product.image}" alt="${product.title}" loading="lazy" onerror="this.onerror=null; this.src='${product.fallbackImage}'">
          <span class="product-badge-slogan"><i class="fa-solid fa-tag"></i> ${product.badge}</span>
          <span class="product-price-badge">${product.price} <small>each</small></span>
        </div>
        <div class="product-info">
          <span class="product-cat-name">${product.category.toUpperCase()} &bull; ${product.genderLabel}</span>
          <h3 class="product-title">${product.title}</h3>
          <div class="product-price-row">
            <span class="price-tag">${product.price}</span>
            <span class="price-unit">each</span>
          </div>
          <p class="product-desc">${product.description}</p>
          <div class="product-actions">
            <button class="btn btn-sm btn-primary" onclick="openProductModal('${product.id}')" style="flex:1;">
              <i class="fa-solid fa-eye"></i> View Details
            </button>
            <a href="${waLink}" target="_blank" class="btn btn-sm btn-whatsapp" title="Inquire on WhatsApp">
              <i class="fa-brands fa-whatsapp"></i> Inquire
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// --- 3. Event Listeners Setup ---
function setupEventListeners() {
  // Mobile Nav Drawer Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
      const isOpen = navMenu.classList.contains('mobile-open');
      mobileToggle.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });

    // Close menu when clicking nav links
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-open');
        mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  // Filter Tabs
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

// --- 4. Search Filter Handler ---
function filterProducts() {
  const searchInput = document.getElementById('gallery-search');
  const clearBtn = document.getElementById('clear-search');
  
  if (searchInput) {
    currentSearch = searchInput.value;
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
  // Switch to target filter tab
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

  // Smooth scroll to products section
  const section = document.getElementById('products');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

function resetGallery() {
  clearSearch();
  filterGalleryCategory('all');
}

// --- 5. Modal Handler ---
function openProductModal(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const modal = document.getElementById('product-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalCat = document.getElementById('modal-category');
  const modalGender = document.getElementById('modal-gender');
  const modalDesc = document.getElementById('modal-desc');
  const modalWaBtn = document.getElementById('modal-wa-btn');

  if (modalImg) {
    modalImg.src = product.image;
    modalImg.onerror = function() { this.src = product.fallbackImage; };
  }
  if (modalTitle) modalTitle.textContent = `${product.title} - ${product.price} each`;
  if (modalCat) modalCat.textContent = product.category.toUpperCase();
  if (modalGender) modalGender.textContent = `${product.genderLabel} • ${product.price} each`;
  if (modalDesc) modalDesc.textContent = product.description;

  const encodedMsg = encodeURIComponent(
    `Hello Moyale Fashion Shop! I am interested in "${product.title}" priced at ${product.price} each. Please let me know available sizes and colors at your shop in Nandi Hills Town.`
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

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProductModal();
  }
});

// --- 6. Quick Form to WhatsApp ---
function sendFormToWhatsApp(e) {
  e.preventDefault();
  
  const name = document.getElementById('form-name')?.value || 'Customer';
  const itemType = document.getElementById('form-item-type')?.value || 'Fashion Item';
  const userMsg = document.getElementById('form-message')?.value || '';

  const fullMsg = `Hello Moyale Fashion Shop! My name is ${name}.\nI am inquiring about: ${itemType}.\nDetails: ${userMsg}\n(Sent from your website)`;
  
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(fullMsg)}`;
  window.open(waUrl, '_blank');
}

// --- 7. Update Footer Year ---
function updateFooterYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
