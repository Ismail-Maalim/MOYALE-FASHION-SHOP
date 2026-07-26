const mongoose = require('mongoose');

const VisitorSchema = new mongoose.Schema({
  visitorId: { type: String, required: true, unique: true },
  theme: { type: String, default: 'light' },
  lastVisit: { type: Date, default: Date.now },
  pageViews: { type: Number, default: 1 },
  cartItems: [{
    productId: String,
    title: String,
    qty: Number,
    addedAt: { type: Date, default: Date.now }
  }],
  userAgent: String
}, { timestamps: true });

module.exports = mongoose.models.Visitor || mongoose.model('Visitor', VisitorSchema);
