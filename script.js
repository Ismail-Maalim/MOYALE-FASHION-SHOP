/* ==========================================================================
   Garissa and Moyale Fashion Ltd - Interactive Catalog Script
   Location: Opposite Migingo/KCB, Nandi Hills Town, Kenya
   WhatsApp & Phone: 0793788938
   Operating Hours: Open 8:00 AM - 9:00 PM Daily
   ========================================================================== */

// --- 1. Comprehensive Cloudinary Product Store ---
const products = [
  // Outerwear & Jackets
  {
    id: 'prod-varsity-1',
    title: "Varsity Bomber Jacket",
    category: "clothes",
    gender: "mens",
    genderLabel: "Men's & Unisex Outerwear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012781/varsity_mont_dos6ks.png",
    description: "Stylish varsity bomber jacket with premium ribbed cuffs, front snap buttons, and sleek urban design. Available wholesale and retail.",
    badge: "Best Seller"
  },
  {
    id: 'prod-varsity-2',
    title: "Urban Varsity Jacket",
    category: "clothes",
    gender: "mens",
    genderLabel: "Men's & Unisex Outerwear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785008418/varsity_mont_txvc8z.png",
    description: "Trendy urban varsity jacket suitable for casual wear, college, and outdoor styling. Available in multiple colors & sizes.",
    badge: "Popular"
  },
  {
    id: 'prod-pillow-jacket',
    title: "Puffer Pillow Jacket",
    category: "clothes",
    gender: "both",
    genderLabel: "Heavy Winter Wear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012775/pillow_jacket_qyzlnw.png",
    description: "Ultra-warm quilted puffer pillow jacket with high neck wind resistant lining for cold weather.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'prod-planda-jacket',
    title: "Planda Winter Jacket",
    category: "clothes",
    gender: "mens",
    genderLabel: "Heavy Winter Wear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012776/planda_jacket_n1lpyr.png",
    description: "Heavy-duty Planda winter jacket crafted for maximum thermal comfort and durability.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'prod-jacket-xl',
    title: "XL Heavy Winter Jacket",
    category: "clothes",
    gender: "mens",
    genderLabel: "Men Outerwear (XL)",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012769/jacket_xl_g6wlw8.png",
    description: "Insulated heavy winter jacket in XL size. Dual zip closure and storm hood.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'prod-jacket-2xl',
    title: "2XL Insulated Jacket",
    category: "clothes",
    gender: "mens",
    genderLabel: "Men Outerwear (2XL)",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012765/jacket_2xl_ubsy2e.png",
    description: "Cold-resistant insulated winter jacket in 2XL size with deep fleece-lined pockets.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'prod-jacket-3xl',
    title: "3XL Heavy Winter Jacket",
    category: "clothes",
    gender: "mens",
    genderLabel: "Men Outerwear (3XL)",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012766/jacket_3xl_ctvj0w.png",
    description: "Heavy winter puffer jacket in 3XL size. Reversible design with adjustable hood.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'prod-jacket-4xl-1',
    title: "4XL Puffer Jacket",
    category: "clothes",
    gender: "mens",
    genderLabel: "Men Outerwear (4XL)",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012768/jacket_4xl_cpb4mw.png",
    description: "Extra spacious 4XL puffer winter jacket for maximum warmth and room.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'prod-jacket-4xl-2',
    title: "4XL Heavy Coat",
    category: "clothes",
    gender: "mens",
    genderLabel: "Men Outerwear (4XL)",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012768/jacket_4xl_emkjvs.png",
    description: "Heavyweight 4XL winter coat built for tough weather conditions.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'prod-denim-fleece',
    title: "Fleece-Lined Denim Jackets",
    category: "clothes",
    gender: "both",
    genderLabel: "Denim Collection",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012759/denim_jackets_bzej0i.png",
    description: "Warm fleece-lined denim jackets with soft shearling collars. Available in Black, Royal Blue, and Acid Wash.",
    badge: "Top Rated"
  },
  {
    id: 'prod-denim-classic',
    title: "Classic Denim Jacket",
    category: "clothes",
    gender: "both",
    genderLabel: "Denim Collection",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012758/denim_jacket_1_sxxyvp.png",
    description: "Timeless classic denim button-down jacket with chest pockets.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'prod-classic-jacket',
    title: "Executive Classic Jacket",
    category: "clothes",
    gender: "mens",
    genderLabel: "Men Official Wear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012757/classic_jacket_vlcbaz.png",
    description: "Smart executive casual jacket for office and weekend smart casual looks.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'prod-jackets-casual',
    title: "Men's Casual Zip Jackets",
    category: "clothes",
    gender: "mens",
    genderLabel: "Men Outerwear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012769/jackets_gtzshh.jpg",
    description: "Lightweight zip casual jackets in Khaki, Olive Green, Navy Blue, and Dark Navy.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'prod-sweater',
    title: "Cozy Warm Sweater",
    category: "clothes",
    gender: "both",
    genderLabel: "Knitwear Collection",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012780/sweater_hvzoth.png",
    description: "Soft knit sweater designed for cozy warmth and comfortable daily layering.",
    badge: "Kwa Bei Nafuu"
  },

  // Women's Wear & Jeans
  {
    id: 'prod-womens-jeans',
    title: "Women's Stylish Denim Jeans",
    category: "clothes",
    gender: "ladies",
    genderLabel: "Ladies Collection",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012783/women_s_jeans_c8ggmu.jpg",
    description: "High-waist stretch denim jeans for ladies with perfect fit and durable denim fabric.",
    badge: "Hot Deal"
  },
  {
    id: 'prod-jeans-unisex',
    title: "Premium Denim Jeans",
    category: "clothes",
    gender: "both",
    genderLabel: "Jeans Collection",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012770/jeans_p7hqif.jpg",
    description: "Quality straight-leg denim jeans in dark blue and washed denim finishes.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'prod-elegance',
    title: "Elegance Fashion Dress",
    category: "clothes",
    gender: "ladies",
    genderLabel: "Ladies Collection",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012760/elegance_r5wgct.png",
    description: "Elegant ladies fashion dress for events, church, and official occasions.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'prod-leopard',
    title: "Leopard Pattern Fashion Wear",
    category: "clothes",
    gender: "ladies",
    genderLabel: "Ladies Collection",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012772/leopard_ci9ijf.jpg",
    description: "Chic leopard print fashion top and dress collection for ladies.",
    badge: "Trendy"
  },

  // Women's Mary Jane Shoes & Heels
  {
    id: 'prod-mj-white-1',
    title: "White Mary Jane Strap Heels",
    category: "shoes",
    gender: "ladies",
    genderLabel: "Ladies Footwear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012782/white_marry_jane_kkvxqs.png",
    description: "Elegant white Mary Jane pumps with double adjustable ankle straps and gold embroidery detail.",
    badge: "Featured"
  },
  {
    id: 'prod-mj-white-2',
    title: "White Mary Jane Wedge Heels",
    category: "shoes",
    gender: "ladies",
    genderLabel: "Ladies Footwear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012782/white_marry_jane_2_tjrnge.png",
    description: "Comfortable white low-wedge Mary Jane pumps for office and event wear.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'prod-mj-black',
    title: "Black Mary Jane Strap Heels",
    category: "shoes",
    gender: "ladies",
    genderLabel: "Ladies Footwear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012756/black_marry_jane_k2hs1s.png",
    description: "Classic glossy black Mary Jane shoes with cushioned insoles.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'prod-mj-beige',
    title: "Beige Mary Jane Low Wedge Heels",
    category: "shoes",
    gender: "ladies",
    genderLabel: "Ladies Footwear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012756/bej_marry_jane_wxdze9.png",
    description: "Stylish beige khaki Mary Jane pumps with golden side embroidery.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'prod-mj-grey-1',
    title: "Grey Mary Jane Wedge Heels",
    category: "shoes",
    gender: "ladies",
    genderLabel: "Ladies Footwear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012763/grey_marry_jane_rkbi8x.png",
    description: "Sleek dark grey Mary Jane wedge shoes with supportive ankle straps.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'prod-mj-grey-2',
    title: "Grey Mary Jane Pumps (MB26-25J)",
    category: "shoes",
    gender: "ladies",
    genderLabel: "Ladies Footwear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785007996/grey_marry_jane_mxapol.png",
    description: "Classy grey Mary Jane pumps (Model MB26-25J) available in all sizes.",
    badge: "Kwa Bei Nafuu"
  },

  // Sneakers & Athletic Shoes
  {
    id: 'prod-samba-1',
    title: "Samba Classic White Sneakers",
    category: "shoes",
    gender: "both",
    genderLabel: "Sneaker Collection",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012778/samba_sneakers_w7o66r.png",
    description: "Iconic Samba classic white sneakers with grey suede toe cap and black stripes.",
    badge: "Hot Seller"
  },
  {
    id: 'prod-samba-2',
    title: "Samba Leather Sneakers",
    category: "shoes",
    gender: "both",
    genderLabel: "Sneaker Collection",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012777/samba_sneakers_hpp9uh.jpg",
    description: "Durable leather Samba sneakers for casual streetwear styling.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'prod-samba-adidas',
    title: "Samba Retro Edition Sneakers",
    category: "shoes",
    gender: "both",
    genderLabel: "Sneaker Collection",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012776/samba_adidas_rhrfrn.jpg",
    description: "Retro Samba low-top sneakers with gum rubber sole.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'prod-sneakers-urban',
    title: "Urban Streetwear Sneakers",
    category: "shoes",
    gender: "both",
    genderLabel: "Sneaker Collection",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012778/sneakers2_doypsp.jpg",
    description: "Trendy thick-soled urban sneakers for daily comfort and street fashion.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'prod-sport-shoe',
    title: "Athletic Sport Shoes",
    category: "shoes",
    gender: "both",
    genderLabel: "Sport Footwear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012779/sport_shoe_bkzzm9.jpg",
    description: "Breathable athletic sport shoes for running, training, and active wear.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'prod-nike-1',
    title: "Nike Style Athletic Sneakers",
    category: "shoes",
    gender: "both",
    genderLabel: "Sport Footwear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012774/nikes_edp97b.jpg",
    description: "High performance athletic sneakers with cushioned sole support.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'prod-nike-running',
    title: "Nike Running Shoes",
    category: "shoes",
    gender: "both",
    genderLabel: "Sport Footwear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012774/nike_runningshoe_ljn4pj.png",
    description: "Lightweight flexible mesh running shoes for maximum breathability.",
    badge: "Kwa Bei Nafuu"
  },

  // Men's Leather Official Shoes, Loafers & Boots
  {
    id: 'prod-leather-shoe',
    title: "Kaisifeier Men's Leather Dress Shoes",
    category: "shoes",
    gender: "mens",
    genderLabel: "Men Official Shoes",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012772/leathershoe_fchd8h.jpg",
    description: "Premium Kaisifeier black slip-on leather dress shoes (KS-P2035 BLK) for suits and official wear.",
    badge: "Executive"
  },
  {
    id: 'prod-leather-loafers',
    title: "Men's Leather Loafers",
    category: "shoes",
    gender: "mens",
    genderLabel: "Men Footwear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012771/Leather_loafers_oep6r7.png",
    description: "Classic men's genuine leather loafers with comfortable slip-on fit.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'prod-hiking-boots',
    title: "Outdoor Hiking & Work Boots",
    category: "shoes",
    gender: "mens",
    genderLabel: "Men Footwear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012764/hiking_boots_fondbk.png",
    description: "Heavy-duty outdoor hiking and work boots with deep grip rubber soles.",
    badge: "Durable"
  },
  {
    id: 'prod-freedom-shoe',
    title: "Freedom Comfort Shoes",
    category: "shoes",
    gender: "both",
    genderLabel: "Casual Footwear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012761/freedom_oyhilp.jpg",
    description: "Flexible lightweight Freedom comfort shoes for daily walking.",
    badge: "Kwa Bei Nafuu"
  },
  {
    id: 'prod-footwear-coll',
    title: "Casual Footwear Collection",
    category: "shoes",
    gender: "both",
    genderLabel: "Casual Footwear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/v1785012761/footware_tjufch.jpg",
    description: "Quality casual shoes and slip-ons for everyday wear.",
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
      `Hello Garissa and Moyale Fashion Ltd! I am interested in inquiring about "${product.title}" (${product.genderLabel}). Please let me know the wholesale/retail price and stock availability.`
    );
    const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;

    return `
      <div class="product-card">
        <div class="product-img-wrap">
          <img src="${product.image}" alt="${product.title}" loading="lazy" onerror="this.onerror=null; this.src='https://res.cloudinary.com/omvbgydr/image/upload/v1785012781/varsity_mont_dos6ks.png'">
          <span class="product-badge-slogan"><i class="fa-solid fa-tag"></i> ${product.badge}</span>
          <span class="product-price-badge">Wholesale & Retail</span>
        </div>
        <div class="product-info">
          <span class="product-cat-name">${product.category.toUpperCase()} &bull; ${product.genderLabel}</span>
          <h3 class="product-title">${product.title}</h3>
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
  }
  if (modalTitle) modalTitle.textContent = product.title;
  if (modalCat) modalCat.textContent = product.category.toUpperCase();
  if (modalGender) modalGender.textContent = `${product.genderLabel} • Wholesale & Retail`;
  if (modalDesc) modalDesc.textContent = product.description;

  const encodedMsg = encodeURIComponent(
    `Hello Garissa and Moyale Fashion Ltd! I am interested in "${product.title}" (${product.genderLabel}). Please send me the wholesale/retail price and stock availability at your shop.`
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
  const orderType = document.getElementById('form-order-type')?.value || 'Retail/Wholesale';
  const itemType = document.getElementById('form-item-type')?.value || 'Fashion Item';
  const userMsg = document.getElementById('form-message')?.value || '';

  const fullMsg = `Hello Garissa and Moyale Fashion Ltd!\nMy name is ${name}.\nOrder Type: ${orderType}\nProduct Category: ${itemType}\nDetails: ${userMsg}\n(Sent from your website)`;
  
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
