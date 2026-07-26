const mongoose = require('mongoose');

const InquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  orderType: { type: String, required: true }, // 'Retail Purchase', 'Wholesale Bulk Order', 'Stock Inquiry'
  itemType: { type: String, required: true },
  message: { type: String, required: true },
  ipAddress: String,
  status: { type: String, default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.models.Inquiry || mongoose.model('Inquiry', InquirySchema);
