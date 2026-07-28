const dbConnect = require('../lib/db');
const Visitor = require('../models/Visitor');

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
    if (!conn) {
      return res.status(200).json({ success: true, mode: 'local' });
    }

    const { visitorId, theme, cartItems } = req.body || {};
    if (!visitorId) return res.status(200).json({ success: true, mode: 'local' });

    const updated = await Visitor.findOneAndUpdate(
      { visitorId },
      {
        $set: { theme, cartItems, lastVisit: new Date(), userAgent: req.headers['user-agent'] },
        $inc: { pageViews: 1 }
      },
      { upsert: true, new: true }
    );

    return res.status(200).json({ success: true, visitor: updated });
  } catch (err) {
    return res.status(200).json({ success: true, mode: 'local' });
  }
};
