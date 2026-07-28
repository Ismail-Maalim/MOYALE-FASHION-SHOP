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

// --- API Route 1: CRUD Products ---
app.get('/api/products', async (req, res) => {
  try {
    const conn = await dbConnect();
    if (!conn) {
      return res.status(200).json({ success: true, mode: 'local', message: 'Operating in local catalog mode' });
    }
    const products = await Product.find({}).sort({ createdAt: -1 });
    return res.json({ success: true, count: products.length, data: products });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const conn = await dbConnect();
    if (!conn) return res.status(503).json({ success: false, message: 'Database disconnected' });

    const newProduct = await Product.create(req.body);
    return res.status(201).json({ success: true, data: newProduct });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

app.put('/api/products', async (req, res) => {
  try {
    const conn = await dbConnect();
    if (!conn) return res.status(503).json({ success: false, message: 'Database disconnected' });

    const { id, productId, ...updateData } = req.body;
    const targetId = productId || id;
    const updated = await Product.findOneAndUpdate(
      { $or: [{ productId: targetId }, { _id: targetId }] },
      { $set: updateData },
      { new: true }
    );
    return res.json({ success: true, data: updated });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/api/products', async (req, res) => {
  try {
    const conn = await dbConnect();
    if (!conn) return res.status(503).json({ success: false, message: 'Database disconnected' });

    const { deleteId } = req.body;
    await Product.deleteOne({ $or: [{ productId: deleteId }, { _id: deleteId }] });
    return res.json({ success: true, message: 'Product deleted' });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// --- API Route 2: Track Visitor Session & Theme Preference ---
app.post('/api/visitors', async (req, res) => {
  try {
    const conn = await dbConnect();
    if (!conn) return res.status(200).json({ success: true, mode: 'local' });

    const { visitorId, theme, cartItems } = req.body;
    if (!visitorId) return res.status(200).json({ success: true, mode: 'local' });

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
    return res.status(200).json({ success: true, mode: 'local' });
  }
});

// --- API Route 3: Save Customer WhatsApp Inquiry ---
app.post('/api/inquiries', async (req, res) => {
  try {
    const conn = await dbConnect();
    if (!conn) return res.status(200).json({ success: true, mode: 'local' });

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
