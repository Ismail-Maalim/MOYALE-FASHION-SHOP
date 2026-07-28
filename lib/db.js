const mongoose = require('mongoose');
const dns = require('dns');

// Configure Node.js to use public DNS servers (Google/Cloudflare)
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {}

/**
 * Global cached Mongoose connection to prevent pool exhaustion
 * during Vercel serverless function invocations & Node server restarts.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.includes('<db_password>')) {
    console.warn('⚠️ MONGODB_URI is unconfigured or contains default placeholder <db_password>.');
    return null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 8000,
    };

    cached.promise = mongoose.connect(uri, opts).then((mongooseInstance) => {
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
