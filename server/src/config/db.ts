// src/config/db.ts

import { MongoClient, Db } from 'mongodb';

export interface DBConfig {
  uri: string;
  databaseName: string;
}

// Load configuration from environment variables for security
export const defaultDBConfig: DBConfig = {
  uri: process.env.MONGO_URI || "",
  databaseName: process.env.DB_NAME || "",
};

// This variable will hold our single database connection
let db: Db;

/**
 * Connects to the MongoDB database and initializes the 'db' instance.
 * This function should be called once when the application starts.
 * @param config - The database configuration object.
 */
export async function connectToDatabase(config: DBConfig): Promise<void> {
  // If the db instance is already connected, do nothing
  if (db) {
    return;
  }

  // First, validate the configuration
  if (!validateConfig(config)) {
      throw new Error("Invalid database configuration. Check environment variables.");
  }
  
  try {
    const client = new MongoClient(config.uri);
    await client.connect();

    // Set the global db instance
    db = client.db(config.databaseName);
    
    console.log(`Connected to database: ${db.databaseName}`);
  } catch (error) {
    console.error("Error connecting to db", error);
    // Exit the process with an error code
    process.exit(1);
  }
}

export function validateConfig(config: DBConfig): boolean {
    if (!config.uri) {
        console.error("DB Config Error: MongoDB URI is missing. Did you set MONGO_URI in your .env file?");
        return false;
    }
    if (!config.databaseName) {
        console.error("DB Config Error: Database name is missing. Did you set DB_NAME in your .env file?");
        return false;
    }
    return true;
}

export { db };