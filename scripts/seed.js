const dns = require('dns');

// Configure Node.js to use public DNS servers (Google/Cloudflare)
// This resolves Windows local ISP SRV query errors (querySrv ECONNREFUSED)
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {}

require('dotenv').config({ path: '.env.local' });
const dbConnect = require('../lib/db');
const Product = require('../models/Product');

const seedProducts = [
  // Outerwear & Jackets
  {
    productId: 'varsity-bomber-jacket',
    title: "Varsity Bomber Jacket",
    category: "clothes",
    subCat: "jackets",
    gender: "mens",
    genderLabel: "Men's & Unisex Outerwear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/f_auto,q_auto/v1785012781/varsity_mont_dos6ks.png",
    description: "Stylish varsity bomber jacket with premium ribbed cuffs, front snap buttons, and sleek urban design. Available wholesale and retail.",
    badge: "Best Seller"
  },
  {
    productId: 'urban-varsity-jacket',
    title: "Urban Varsity Jacket",
    category: "clothes",
    subCat: "jackets",
    gender: "mens",
    genderLabel: "Men's & Unisex Outerwear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/f_auto,q_auto/v1785008418/varsity_mont_txvc8z.png",
    description: "Trendy urban varsity jacket suitable for casual wear, college, and outdoor styling. Available in multiple colors & sizes.",
    badge: "Popular"
  },
  {
    productId: 'puffer-pillow-jacket',
    title: "Puffer Pillow Jacket",
    category: "clothes",
    subCat: "jackets",
    gender: "both",
    genderLabel: "Heavy Winter Wear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/f_auto,q_auto/v1785012775/pillow_jacket_qyzlnw.png",
    description: "Ultra-warm quilted puffer pillow jacket with high neck wind resistant lining for cold weather.",
    badge: "Kwa Bei Nafuu"
  },
  {
    productId: 'planda-winter-jacket',
    title: "Planda Winter Jacket",
    category: "clothes",
    subCat: "jackets",
    gender: "mens",
    genderLabel: "Heavy Winter Wear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/f_auto,q_auto/v1785012776/planda_jacket_n1lpyr.png",
    description: "Heavy-duty Planda winter jacket crafted for maximum thermal comfort and durability.",
    badge: "Kwa Bei Nafuu"
  },
  {
    productId: 'xl-heavy-winter-jacket',
    title: "XL Heavy Winter Jacket",
    category: "clothes",
    subCat: "jackets",
    gender: "mens",
    genderLabel: "Men Outerwear (XL)",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/f_auto,q_auto/v1785012769/jacket_xl_g6wlw8.png",
    description: "Insulated heavy winter jacket in XL size. Dual zip closure and storm hood.",
    badge: "Kwa Bei Nafuu"
  },
  {
    productId: '2xl-insulated-jacket',
    title: "2XL Insulated Jacket",
    category: "clothes",
    subCat: "jackets",
    gender: "mens",
    genderLabel: "Men Outerwear (2XL)",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/f_auto,q_auto/v1785012765/jacket_2xl_ubsy2e.png",
    description: "Cold-resistant insulated winter jacket in 2XL size with deep fleece-lined pockets.",
    badge: "Kwa Bei Nafuu"
  },
  {
    productId: '3xl-heavy-winter-jacket',
    title: "3XL Heavy Winter Jacket",
    category: "clothes",
    subCat: "jackets",
    gender: "mens",
    genderLabel: "Men Outerwear (3XL)",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/f_auto,q_auto/v1785012766/jacket_3xl_ctvj0w.png",
    description: "Heavy winter puffer jacket in 3XL size. Reversible design with adjustable hood.",
    badge: "Kwa Bei Nafuu"
  },
  {
    productId: '4xl-puffer-jacket',
    title: "4XL Puffer Jacket",
    category: "clothes",
    subCat: "jackets",
    gender: "mens",
    genderLabel: "Men Outerwear (4XL)",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/f_auto,q_auto/v1785012768/jacket_4xl_cpb4mw.png",
    description: "Extra spacious 4XL puffer winter jacket for maximum warmth and room.",
    badge: "Kwa Bei Nafuu"
  },
  {
    productId: '4xl-heavy-coat',
    title: "4XL Heavy Coat",
    category: "clothes",
    subCat: "jackets",
    gender: "mens",
    genderLabel: "Men Outerwear (4XL)",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/f_auto,q_auto/v1785012768/jacket_4xl_emkjvs.png",
    description: "Heavyweight 4XL winter coat built for tough weather conditions.",
    badge: "Kwa Bei Nafuu"
  },
  {
    productId: 'fleece-lined-denim-jackets',
    title: "Fleece-Lined Denim Jackets",
    category: "clothes",
    subCat: "jackets",
    gender: "both",
    genderLabel: "Denim Collection",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/f_auto,q_auto/v1785012759/denim_jackets_bzej0i.png",
    description: "Warm fleece-lined denim jackets with soft shearling collars. Available in Black, Royal Blue, and Acid Wash.",
    badge: "Top Rated"
  },
  {
    productId: 'classic-denim-jacket',
    title: "Classic Denim Jacket",
    category: "clothes",
    subCat: "jackets",
    gender: "both",
    genderLabel: "Denim Collection",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/f_auto,q_auto/v1785012758/denim_jacket_1_sxxyvp.png",
    description: "Timeless classic denim button-down jacket with chest pockets.",
    badge: "Kwa Bei Nafuu"
  },
  {
    productId: 'executive-classic-jacket',
    title: "Executive Classic Jacket",
    category: "clothes",
    subCat: "jackets",
    gender: "mens",
    genderLabel: "Men Official Wear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/f_auto,q_auto/v1785012757/classic_jacket_vlcbaz.png",
    description: "Smart executive casual jacket for office and weekend smart casual looks.",
    badge: "Kwa Bei Nafuu"
  },
  {
    productId: 'mens-casual-zip-jackets',
    title: "Men's Casual Zip Jackets",
    category: "clothes",
    subCat: "jackets",
    gender: "mens",
    genderLabel: "Men Outerwear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/f_auto,q_auto/v1785012769/jackets_gtzshh.jpg",
    description: "Lightweight zip casual jackets in Khaki, Olive Green, Navy Blue, and Dark Navy.",
    badge: "Kwa Bei Nafuu"
  },
  {
    productId: 'cozy-warm-sweater',
    title: "Cozy Warm Sweater",
    category: "clothes",
    subCat: "sweaters",
    gender: "both",
    genderLabel: "Knitwear Collection",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/f_auto,q_auto/v1785012780/sweater_hvzoth.png",
    description: "Soft knit sweater designed for cozy warmth and comfortable daily layering.",
    badge: "Kwa Bei Nafuu"
  },

  // Women's Wear & Jeans
  {
    productId: 'women-stylish-denim-jeans',
    title: "Women's Stylish Denim Jeans",
    category: "clothes",
    subCat: "jeans",
    gender: "ladies",
    genderLabel: "Ladies Collection",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/f_auto,q_auto/v1785012783/women_s_jeans_c8ggmu.jpg",
    description: "High-waist stretch denim jeans for ladies with perfect fit and durable denim fabric.",
    badge: "Hot Deal"
  },
  {
    productId: 'premium-denim-jeans',
    title: "Premium Denim Jeans",
    category: "clothes",
    subCat: "jeans",
    gender: "both",
    genderLabel: "Jeans Collection",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/f_auto,q_auto/v1785012770/jeans_p7hqif.jpg",
    description: "Quality straight-leg denim jeans in dark blue and washed denim finishes.",
    badge: "Kwa Bei Nafuu"
  },
  {
    productId: 'elegance-fashion-dress',
    title: "Elegance Fashion Dress",
    category: "clothes",
    subCat: "dresses",
    gender: "ladies",
    genderLabel: "Ladies Collection",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/f_auto,q_auto/v1785012760/elegance_r5wgct.png",
    description: "Elegant ladies fashion dress for events, church, and official occasions.",
    badge: "Kwa Bei Nafuu"
  },
  {
    productId: 'leopard-print-collection',
    title: "Leopard Pattern Fashion Wear",
    category: "clothes",
    subCat: "dresses",
    gender: "ladies",
    genderLabel: "Ladies Collection",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/f_auto,q_auto/v1785012772/leopard_ci9ijf.jpg",
    description: "Chic leopard print fashion top and dress collection for ladies.",
    badge: "Trendy"
  },

  // Women's Mary Jane Shoes & Heels
  {
    productId: 'white-mary-jane-strap-heels',
    title: "White Mary Jane Strap Heels",
    category: "shoes",
    subCat: "mary-jane",
    gender: "ladies",
    genderLabel: "Ladies Footwear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/f_auto,q_auto/v1785012782/white_marry_jane_kkvxqs.png",
    description: "Elegant white Mary Jane pumps with double adjustable ankle straps and gold embroidery detail.",
    badge: "Featured"
  },
  {
    productId: 'white-mary-jane-wedge-heels',
    title: "White Mary Jane Wedge Heels",
    category: "shoes",
    subCat: "mary-jane",
    gender: "ladies",
    genderLabel: "Ladies Footwear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/f_auto,q_auto/v1785012782/white_marry_jane_2_tjrnge.png",
    description: "Comfortable white low-wedge Mary Jane pumps for office and event wear.",
    badge: "Kwa Bei Nafuu"
  },
  {
    productId: 'black-mary-jane-strap-heels',
    title: "Black Mary Jane Strap Heels",
    category: "shoes",
    subCat: "mary-jane",
    gender: "ladies",
    genderLabel: "Ladies Footwear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/f_auto,q_auto/v1785012756/black_marry_jane_k2hs1s.png",
    description: "Classic glossy black Mary Jane shoes with cushioned insoles.",
    badge: "Kwa Bei Nafuu"
  },
  {
    productId: 'beige-mary-jane-wedge-heels',
    title: "Beige Mary Jane Low Wedge Heels",
    category: "shoes",
    subCat: "mary-jane",
    gender: "ladies",
    genderLabel: "Ladies Footwear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/f_auto,q_auto/v1785012756/bej_marry_jane_wxdze9.png",
    description: "Stylish beige khaki Mary Jane pumps with golden side embroidery.",
    badge: "Kwa Bei Nafuu"
  },
  {
    productId: 'grey-mary-jane-wedge-heels',
    title: "Grey Mary Jane Wedge Heels",
    category: "shoes",
    subCat: "mary-jane",
    gender: "ladies",
    genderLabel: "Ladies Footwear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/f_auto,q_auto/v1785012763/grey_marry_jane_rkbi8x.png",
    description: "Sleek dark grey Mary Jane wedge shoes with supportive ankle straps.",
    badge: "Kwa Bei Nafuu"
  },
  {
    productId: 'grey-mary-jane-pumps-mb26',
    title: "Grey Mary Jane Pumps (MB26-25J)",
    category: "shoes",
    subCat: "mary-jane",
    gender: "ladies",
    genderLabel: "Ladies Footwear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/f_auto,q_auto/v1785007996/grey_marry_jane_mxapol.png",
    description: "Classy grey Mary Jane pumps (Model MB26-25J) available in all sizes.",
    badge: "Kwa Bei Nafuu"
  },

  // Sneakers & Athletic Shoes
  {
    productId: 'samba-classic-white-sneakers',
    title: "Samba Classic White Sneakers",
    category: "shoes",
    subCat: "sneakers",
    gender: "both",
    genderLabel: "Sneaker Collection",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/f_auto,q_auto/v1785012778/samba_sneakers_w7o66r.png",
    description: "Iconic Samba classic white sneakers with grey suede toe cap and black stripes.",
    badge: "Hot Seller"
  },
  {
    productId: 'samba-leather-sneakers',
    title: "Samba Leather Sneakers",
    category: "shoes",
    subCat: "sneakers",
    gender: "both",
    genderLabel: "Sneaker Collection",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/f_auto,q_auto/v1785012777/samba_sneakers_hpp9uh.jpg",
    description: "Durable leather Samba sneakers for casual streetwear styling.",
    badge: "Kwa Bei Nafuu"
  },
  {
    productId: 'samba-retro-edition-sneakers',
    title: "Samba Retro Edition Sneakers",
    category: "shoes",
    subCat: "sneakers",
    gender: "both",
    genderLabel: "Sneaker Collection",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/f_auto,q_auto/v1785012776/samba_adidas_rhrfrn.jpg",
    description: "Retro Samba low-top sneakers with gum rubber sole.",
    badge: "Kwa Bei Nafuu"
  },
  {
    productId: 'urban-streetwear-sneakers',
    title: "Urban Streetwear Sneakers",
    category: "shoes",
    subCat: "sneakers",
    gender: "both",
    genderLabel: "Sneaker Collection",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/f_auto,q_auto/v1785012778/sneakers2_doypsp.jpg",
    description: "Trendy thick-soled urban sneakers for daily comfort and street fashion.",
    badge: "Kwa Bei Nafuu"
  },
  {
    productId: 'athletic-sport-shoes',
    title: "Athletic Sport Shoes",
    category: "shoes",
    subCat: "sports",
    gender: "both",
    genderLabel: "Sport Footwear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/f_auto,q_auto/v1785012779/sport_shoe_bkzzm9.jpg",
    description: "Breathable athletic sport shoes for running, training, and active wear.",
    badge: "Kwa Bei Nafuu"
  },
  {
    productId: 'nike-style-athletic-sneakers',
    title: "Nike Style Athletic Sneakers",
    category: "shoes",
    subCat: "sports",
    gender: "both",
    genderLabel: "Sport Footwear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/f_auto,q_auto/v1785012774/nikes_edp97b.jpg",
    description: "High performance athletic sneakers with cushioned sole support.",
    badge: "Kwa Bei Nafuu"
  },
  {
    productId: 'nike-running-shoes',
    title: "Nike Running Shoes",
    category: "shoes",
    subCat: "sports",
    gender: "both",
    genderLabel: "Sport Footwear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/f_auto,q_auto/v1785012774/nike_runningshoe_ljn4pj.png",
    description: "Lightweight flexible mesh running shoes for maximum breathability.",
    badge: "Kwa Bei Nafuu"
  },

  // Men's Leather Official Shoes, Loafers & Boots
  {
    productId: 'kaisifeier-leather-dress-shoes',
    title: "Kaisifeier Men's Leather Dress Shoes",
    category: "shoes",
    subCat: "loafers",
    gender: "mens",
    genderLabel: "Men Official Shoes",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/f_auto,q_auto/v1785012772/leathershoe_fchd8h.jpg",
    description: "Premium Kaisifeier black slip-on leather dress shoes (KS-P2035 BLK) for suits and official wear.",
    badge: "Executive"
  },
  {
    productId: 'leather-loafers',
    title: "Men's Leather Loafers",
    category: "shoes",
    subCat: "loafers",
    gender: "mens",
    genderLabel: "Men Footwear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/f_auto,q_auto/v1785012771/Leather_loafers_oep6r7.png",
    description: "Classic men's genuine leather loafers with comfortable slip-on fit.",
    badge: "Kwa Bei Nafuu"
  },
  {
    productId: 'hiking-outdoor-boots',
    title: "Outdoor Hiking & Work Boots",
    category: "shoes",
    subCat: "boots",
    gender: "mens",
    genderLabel: "Men Footwear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/f_auto,q_auto/v1785012764/hiking_boots_fondbk.png",
    description: "Heavy-duty outdoor hiking and work boots with deep grip rubber soles.",
    badge: "Durable"
  },
  {
    productId: 'freedom-comfort-shoes',
    title: "Freedom Comfort Shoes",
    category: "shoes",
    subCat: "sports",
    gender: "both",
    genderLabel: "Casual Footwear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/f_auto,q_auto/v1785012761/freedom_oyhilp.jpg",
    description: "Flexible lightweight Freedom comfort shoes for daily walking.",
    badge: "Kwa Bei Nafuu"
  },
  {
    productId: 'casual-footwear-collection',
    title: "Casual Footwear Collection",
    category: "shoes",
    subCat: "sports",
    gender: "both",
    genderLabel: "Casual Footwear",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/f_auto,q_auto/v1785012761/footware_tjufch.jpg",
    description: "Quality casual shoes and slip-ons for everyday wear.",
    badge: "Kwa Bei Nafuu"
  }
];

async function seed() {
  const conn = await dbConnect();
  if (!conn) {
    console.error('❌ Could not connect to MongoDB Atlas. Check your .env.local file.');
    process.exit(1);
  }

  try {
    console.log('📦 Seeding products into MongoDB Atlas...');
    await Product.deleteMany({});
    await Product.insertMany(seedProducts);
    console.log(`✅ Successfully seeded ${seedProducts.length} items into MongoDB Atlas database!`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
}

seed();
