import { MongoClient } from 'mongodb';
import 'dotenv/config';


const mongo_uri = process.env.MONGODB_URI;
const client = new MongoClient(mongo_uri);

async function testConnection() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB!");
    
    const db = client.db('study_materials');
    const collections = await db.listCollections().toArray();
    console.log("Collections:", collections.map(c => c.name));
    
  } finally {
    await client.close();
  }
}

testConnection();