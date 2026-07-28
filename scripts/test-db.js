require('dotenv').config({ path: '.env.local' });
const dbConnect = require('../lib/db');
const Product = require('../models/Product');

async function testConnection() {
  console.log('🔍 Testing MongoDB Atlas Connection...');
  const conn = await dbConnect();
  if (!conn) {
    console.error('❌ Failed to connect to MongoDB Atlas. Check your .env.local file.');
    process.exit(1);
  }

  try {
    const count = await Product.countDocuments();
    console.log(`✅ SUCCESS! Connected to MongoDB Atlas. Total products in database: ${count}`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Database Query Error:', err.message);
    process.exit(1);
  }
}

testConnection();
