/* ==========================================================================
   MOYALE FASHION SHOP - Interactive JavaScript Application
   Location: Opposite Migingo/KCB, Nandi Hills Town, Kenya
   WhatsApp & Phone: 0793788938
   ========================================================================== */

// --- 1. Product Data Store ---
const products = [
  {
    id: 'prod-1',
    title: "Ladies Floral Office & Event Dress",
    category: "clothes",
    gender: "ladies",
    genderLabel: "Ladies Collection",
    image: "assets/ladies_dress.jpg",
    description: "Elegant royal purple & floral patterned dress for ladies. High-quality fabric suitable for official wear, church, and special events.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'prod-2',
    title: "Men's Executive 3-Piece Navy Suit",
    category: "clothes",
    gender: "mens",
    genderLabel: "Men Collection",
    image: "assets/mens_suit.jpg",
    description: "Sharp men's formal suit crafted for weddings, business meetings, and special occasions. Perfect fit with matching vest.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'prod-3',
    title: "Ladies Black Heel Sandals & Pumps",
    category: "shoes",
    gender: "ladies",
    genderLabel: "Ladies Collection",
    image: "assets/ladies_shoes.jpg",
    description: "Stylish ankle-strap heel sandals and pumps. Comfortable cushioned sole designed for all-day comfort and elegance.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'prod-4',
    title: "Men's Casual Sneakers & Loafers",
    category: "shoes",
    gender: "mens",
    genderLabel: "Men Collection",
    image: "assets/mens_footwear.jpg",
    description: "Trendy men's sneakers, classic leather loafers, and durable daily wear sandals in all standard sizes.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'prod-5',
    title: "Ladies Handbag & Leather Belts Set",
    category: "bags",
    gender: "both",
    genderLabel: "Men & Ladies Accessories",
    image: "assets/bags_belts.jpg",
    description: "Spacious designer ladies handbag and genuine men's leather belts with durable metal buckles.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'prod-6',
    title: "Ladies Ankle Boot & Heel Footwear",
    category: "shoes",
    gender: "ladies",
    genderLabel: "Ladies Collection",
    image: "assets/ladies_shoes.jpg",
    description: "Chic black glossy ankle boots and wedge sandals for ladies. Premium quality & durable sole.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'prod-7',
    title: "Men's Casual Shirts & Trousers",
    category: "clothes",
    gender: "mens",
    genderLabel: "Men Collection",
    image: "assets/hero_banner.jpg",
    description: "Clean gents official and casual trousers, button-down shirts, and polo t-shirts in various colors.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'prod-8',
    title: "Travel & Daily Backpacks",
    category: "bags",
    gender: "both",
    genderLabel: "Unisex Wear",
    image: "assets/bags_belts.jpg",
    description: "Multi-compartment durable backpacks and side bags for daily business, travel, and school.",
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
      `Hello Moyale Fashion Shop! I am interested in inquiring about "${product.title}" (${product.genderLabel}). Please let me know the price and available sizes.`
    );
    const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;

    return `
      <div class="product-card">
        <div class="product-img-wrap">
          <img src="${product.image}" alt="${product.title}" loading="lazy">
          <span class="product-badge-slogan"><i class="fa-solid fa-tag"></i> ${product.badge}</span>
          <span class="product-gender-badge">${product.genderLabel}</span>
        </div>
        <div class="product-info">
          <span class="product-cat-name">${product.category.toUpperCase()}</span>
          <h3 class="product-title">${product.title}</h3>
          <p class="product-desc">${product.description}</p>
          <div class="product-actions">
            <button class="btn btn-sm btn-primary" onclick="openProductModal('${product.id}')" style="flex:1;">
              <i class="fa-solid fa-eye"></i> Quick View
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

  if (modalImg) modalImg.src = product.image;
  if (modalTitle) modalTitle.textContent = product.title;
  if (modalCat) modalCat.textContent = product.category.toUpperCase();
  if (modalGender) modalGender.textContent = product.genderLabel;
  if (modalDesc) modalDesc.textContent = product.description;

  const encodedMsg = encodeURIComponent(
    `Hello Moyale Fashion Shop! I am interested in "${product.title}" (${product.genderLabel}). Please let me know the price and available sizes at your shop in Nandi Hills Town.`
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
