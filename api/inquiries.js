const dbConnect = require('../lib/db');
const Inquiry = require('../models/Inquiry');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const conn = await dbConnect();
    if (!conn) return res.status(503).json({ success: false });

    const { name, orderType, itemType, message } = req.body || {};
    if (!name || !message) return res.status(400).json({ success: false, message: 'Missing required fields' });

    const newInquiry = await Inquiry.create({
      name,
      orderType,
      itemType,
      message,
      ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress
    });

    return res.status(200).json({ success: true, data: newInquiry });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
