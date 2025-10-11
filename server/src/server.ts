// src/server.ts

import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import cardSetRoutes from './routes/cardSetRoutes';
import { handleGameEvents } from './controllers/gameController';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// Middleware
app.use(express.json());

// Main route
app.get('/', (req, res) => {
  res.send('Welcome to the scalable Kahoot-like game backend!');
});

// Use the API routes
app.use('/api/cardsets', cardSetRoutes);

// Handle WebSocket connections and events
io.on('connection', (socket: Socket) => {
  handleGameEvents(io, socket);
});

// Start the server
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});