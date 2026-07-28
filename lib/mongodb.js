const { MongoClient } = require('mongodb');
const dns = require('dns');

// Configure public DNS servers to resolve Windows SRV query errors
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {}

const uri = process.env.MONGODB_URI;
const options = {
  serverSelectionTimeoutMS: 8000
};

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise && uri && !uri.includes('<db_password>')) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else if (uri && !uri.includes('<db_password>')) {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

module.exports = clientPromise;
