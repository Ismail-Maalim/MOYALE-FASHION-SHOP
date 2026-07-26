require('dotenv').config({ path: '.env.local' });
const express = require('express');
const cors = require('cors');
const path = require('path');
const dbConnect = require('./lib/db');
const Product = require('./models/Product');
const Visitor = require('./models/Visitor');
const Inquiry = require('./models/Inquiry');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static frontend files (HTML, CSS, JS, Assets)
app.use(express.static(path.join(__dirname)));

// --- API Route 1: Get Products Catalog ---
app.get('/api/products', async (req, res) => {
  try {
    const conn = await dbConnect();
    if (!conn) {
      return res.status(503).json({ success: false, message: 'MongoDB not connected. Operating in offline/static mode.' });
    }
    const products = await Product.find({}).sort({ createdAt: -1 });
    return res.json({ success: true, count: products.length, data: products });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// --- API Route 2: Track Visitor Session & Theme Preference ---
app.post('/api/visitors', async (req, res) => {
  try {
    const conn = await dbConnect();
    if (!conn) return res.status(503).json({ success: false });

    const { visitorId, theme, cartItems } = req.body;
    if (!visitorId) return res.status(400).json({ success: false, message: 'visitorId is required' });

    const updated = await Visitor.findOneAndUpdate(
      { visitorId },
      {
        $set: { theme, cartItems, lastVisit: new Date(), userAgent: req.headers['user-agent'] },
        $inc: { pageViews: 1 }
      },
      { upsert: true, new: true }
    );

    return res.json({ success: true, visitor: updated });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// --- API Route 3: Save Customer WhatsApp Inquiry ---
app.post('/api/inquiries', async (req, res) => {
  try {
    const conn = await dbConnect();
    if (!conn) return res.status(503).json({ success: false });

    const { name, orderType, itemType, message } = req.body;
    if (!name || !message) return res.status(400).json({ success: false, message: 'Missing required fields' });

    const newInquiry = await Inquiry.create({
      name,
      orderType,
      itemType,
      message,
      ipAddress: req.ip
    });

    return res.json({ success: true, data: newInquiry });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, async () => {
  console.log(`🚀 Garissa & Moyale Fashion Ltd Server running on http://localhost:${PORT}`);
  await dbConnect();
});

module.exports = app;
