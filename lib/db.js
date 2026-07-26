const mongoose = require('mongoose');
const dns = require('dns');

// Configure Node.js to use public DNS servers (Google/Cloudflare)
// This resolves Windows local ISP SRV query errors (querySrv ECONNREFUSED)
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {}

const MONGODB_URI = process.env.MONGODB_URI;

/**
 * Global cached Mongoose connection to prevent pool exhaustion
 * during Vercel serverless function invocations & Node server restarts.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (!process.env.MONGODB_URI || process.env.MONGODB_URI.includes('<db_password>')) {
    console.warn('⚠️ MONGODB_URI contains default placeholder <db_password>. Please update .env.local with your database password.');
    return null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
    };

    cached.promise = mongoose.connect(process.env.MONGODB_URI, opts).then((mongooseInstance) => {
      console.log('✅ Connected successfully to MongoDB Atlas database!');
      return mongooseInstance;
    }).catch((err) => {
      console.error('❌ MongoDB Atlas connection error:', err.message);
      cached.promise = null;
      return null;
    });
  }
  
  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = dbConnect;
