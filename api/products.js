const dbConnect = require('../lib/db');
const Product = require('../models/Product');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const conn = await dbConnect();
    if (!conn) {
      return res.status(503).json({ success: false, message: 'MongoDB connection unconfigured' });
    }
    const products = await Product.find({}).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, count: products.length, data: products });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
