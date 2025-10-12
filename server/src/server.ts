// src/server.ts

import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import cardSetRoutes from './routes/cardSetRoutes';
import authRoutes from './routes/authRoutes';
import { handleGameEvents } from './controllers/gameController';


import './types/Card'; // Ensure Card model is registered
import './types/Set';  // Ensure Set model is registered
import './types/User'; // Ensure User model is registered

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  throw new Error('MONGO_URI must be defined in the .env file');
}

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(express.json());


import mongoose from 'mongoose';
// Function to connect to the database
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error('MONGO_URI is not defined in the .env file');
    }
    await mongoose.connect(mongoURI);
    if (!mongoose.connection.db) {
      throw new Error('Failed to connect to MongoDB');
    }
    //  // 2. Get the admin database object
    // const adminDb = mongoose.connection.db.admin();

    // // 3. List all databases
    // const databasesList = await adminDb.listDatabases();
    
    // console.log('Available databases:');
    // databasesList.databases.forEach((db) => {
    //   console.log(`- ${db.name}`);
    // });
    // // connect to specific database
    // await mongoose.connection.useDb(process.env.DB_NAME || "test");
    console.log('MongoDB connected successfully! 🎉');
  } catch (err: any) {
    console.error('Failed to connect to MongoDB', err.message);
    // Exit process with failure
    process.exit(1);
  }
};


// Handle WebSocket connections
io.on('connection', (socket: Socket) => {
  console.log(`User connected: ${socket.id}`);
  handleGameEvents(io, socket);
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Start the server
async function startServer() {
  // Connect to DB before starting
  // Connect to the database before starting the server
  connectDB().then(() => {
    const PORT = process.env.PORT || 5001;
    // Define your API routes
    app.use('/api', cardSetRoutes); // Mount your controller routes

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  });
}

startServer();
