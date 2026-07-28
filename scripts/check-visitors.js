/**
 * Query MongoDB Atlas - Show all visitor/cookie data
 * Run: node scripts/check-visitors.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const dns = require('dns');

dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

const VisitorSchema = new mongoose.Schema({
  visitorId: String,
  theme: String,
  lastVisit: Date,
  pageViews: Number,
  cartItems: [{ productId: String, title: String, qty: Number, addedAt: Date }],
  userAgent: String
}, { timestamps: true });
const Visitor = mongoose.models.Visitor || mongoose.model('Visitor', VisitorSchema);

async function main() {
  console.log('\n🔌 Connecting to MongoDB Atlas...\n');
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ Connected!\n');

  const visitors = await Visitor.find({}).sort({ lastVisit: -1 }).lean();

  if (visitors.length === 0) {
    console.log('⚠️  No visitor records found in the database yet.\n');
  } else {
    console.log(`📋 Found ${visitors.length} visitor record(s):\n`);
    console.log('━'.repeat(60));

    visitors.forEach((v, i) => {
      console.log(`\n[${i + 1}] Visitor ID : ${v.visitorId}`);
      console.log(`    Theme      : ${v.theme}`);
      console.log(`    Last Visit : ${v.lastVisit}`);
      console.log(`    Page Views : ${v.pageViews}`);
      console.log(`    User Agent : ${v.userAgent || 'N/A'}`);

      if (v.cartItems && v.cartItems.length > 0) {
        console.log(`    Cart Items : ${v.cartItems.length} item(s)`);
        v.cartItems.forEach((item, j) => {
          console.log(`      [${j + 1}] ${item.title} — qty: ${item.qty} (added: ${item.addedAt})`);
        });
      } else {
        console.log(`    Cart Items : (empty)`);
      }

      console.log('━'.repeat(60));
    });
  }

  await mongoose.disconnect();
  console.log('\n🔌 Disconnected. Done.\n');
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
