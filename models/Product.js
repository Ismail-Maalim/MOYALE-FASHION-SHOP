const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true }, // 'clothes', 'shoes', 'bags'
  subCat: { type: String, required: true },  // 'jackets', 'sneakers', 'mary-jane', 'loafers', 'sports', 'jeans', 'dresses', 'sweaters'
  gender: { type: String, required: true },  // 'mens', 'ladies', 'both'
  genderLabel: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  badge: { type: String, default: 'Kwa Bei Nafuu' },
  inStock: { type: Boolean, default: true },
  wholesaleAvailable: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.models.Product || mongoose.model('Product', ProductSchema);
