const dbConnect = require('../lib/db');
const Product = require('../models/Product');

// Fallback catalog list if MongoDB database connection is offline or unconfigured
const fallbackProducts = [
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
    productId: 'kaisifeier-leather-dress-shoes',
    title: "Kaisifeier Men's Leather Dress Shoes",
    category: "shoes",
    subCat: "loafers",
    gender: "mens",
    genderLabel: "Men Official Shoes",
    image: "https://res.cloudinary.com/omvbgydr/image/upload/f_auto,q_auto/v1785012772/leathershoe_fchd8h.jpg",
    description: "Premium Kaisifeier black slip-on leather dress shoes (KS-P2035 BLK) for suits and official wear.",
    badge: "Executive"
  }
];

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const conn = await dbConnect();

  try {
    switch (req.method) {
      case 'GET': {
        if (!conn) {
          return res.status(200).json({ success: true, fallback: true, count: fallbackProducts.length, data: fallbackProducts });
        }
        const products = await Product.find({}).sort({ createdAt: -1 });
        if (!products || products.length === 0) {
          return res.status(200).json({ success: true, fallback: true, count: fallbackProducts.length, data: fallbackProducts });
        }
        return res.status(200).json({ success: true, count: products.length, data: products });
      }

      case 'POST': {
        if (!conn) {
          return res.status(503).json({ success: false, message: 'Database unconfigured for write operations' });
        }
        const body = req.body || {};
        if (!body.title || !body.category) {
          return res.status(400).json({ success: false, message: 'Missing required product fields' });
        }
        const newProduct = await Product.create({
          productId: body.productId || 'p_' + Date.now(),
          title: body.title,
          category: body.category,
          subCat: body.subCat || 'general',
          gender: body.gender || 'both',
          genderLabel: body.genderLabel || 'Fashion Collection',
          image: body.image,
          description: body.description || '',
          badge: body.badge || 'Kwa Bei Nafuu'
        });
        return res.status(201).json({ success: true, data: newProduct });
      }

      case 'PUT': {
        if (!conn) {
          return res.status(503).json({ success: false, message: 'Database unconfigured for update operations' });
        }
        const { id, productId, ...updateData } = req.body || {};
        const queryId = productId || id;
        if (!queryId) {
          return res.status(400).json({ success: false, message: 'Product ID is required for update' });
        }
        const updated = await Product.findOneAndUpdate(
          { $or: [{ productId: queryId }, { _id: queryId }] },
          { $set: updateData },
          { new: true }
        );
        return res.status(200).json({ success: true, data: updated });
      }

      case 'DELETE': {
        if (!conn) {
          return res.status(503).json({ success: false, message: 'Database unconfigured for delete operations' });
        }
        const { deleteId } = req.body || {};
        if (!deleteId) {
          return res.status(400).json({ success: false, message: 'deleteId is required for deletion' });
        }
        await Product.deleteOne({ $or: [{ productId: deleteId }, { _id: deleteId }] });
        return res.status(200).json({ success: true, message: 'Product deleted successfully' });
      }

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
    }
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
