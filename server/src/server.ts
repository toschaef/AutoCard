// src/server.ts

import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { connectToDatabase, defaultDBConfig } from './config/db';
import cardSetRoutes from './routes/cardSetRoutes';
import authRoutes from './routes/authRoutes';
import { handleGameEvents } from './controllers/gameController';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

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

// Main API route entry point
// All card set and card routes will be prefixed with /api/sets

app.use('/api/sets', cardSetRoutes);

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
  await connectToDatabase(defaultDBConfig);

  const PORT = process.env.PORT || 3001;
  httpServer.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();