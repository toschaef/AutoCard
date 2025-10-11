// src/controllers/gameController.ts

import { Socket, Server } from 'socket.io';
import { GameSession, Player } from '../../../types';
import { getCardSets } from './cardSetController';

// Dummy data store for game sessions
const gameSessions: { [key: string]: GameSession } = {};

export const handleGameEvents = (io: Server, socket: Socket) => {
  console.log(`User connected: ${socket.id}`);

  // Host creates a new game session
  socket.on('createGame', (setId: string, callback: (gameCode: string) => void) => {
    const cardSet = getCardSets()[setId];
    if (!cardSet) {
      return socket.emit('error', 'Card set not found.');
    }
    const gameCode = Math.random().toString(36).substring(2, 6).toUpperCase();
    gameSessions[gameCode] = {
      hostId: socket.id,
      cardSet: cardSet,
      players: [],
      state: 'waiting',
      currentQuestionIndex: 0,
    };
    socket.join(gameCode);
    console.log(`Game created with code: ${gameCode}`);
    if (callback) {
      callback(gameCode);
    }
  });

  // Player joins a game session
  socket.on('joinGame', (gameCode: string, playerName: string, callback: (success: boolean) => void) => {
    const session = gameSessions[gameCode];
    if (!session) {
      socket.emit('error', 'Game not found.');
      return;
    }
    const newPlayer: Player = { id: socket.id, name: playerName, score: 0 };
    session.players.push(newPlayer);
    socket.join(gameCode);
    io.to(gameCode).emit('playerJoined', newPlayer);
    console.log(`${playerName} joined game ${gameCode}`);
    if (callback) {
      callback(true);
    }
  });

  // Host starts the game
  socket.on('startGame', (gameCode: string) => {
    const session = gameSessions[gameCode];
    if (!session || session.hostId !== socket.id) {
      return socket.emit('error', 'Unauthorized or game not found.');
    }
    session.state = 'playing';
    io.to(gameCode).emit('gameStarted');
  });

  // Handle player answer submission
  socket.on('submitAnswer', (gameCode: string, answer: string) => {
    const session = gameSessions[gameCode];
    if (!session || session.state !== 'playing') {
      return;
    }
    io.to(session.hostId).emit('playerAnswered', { playerId: socket.id, answer });
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    for (const gameCode in gameSessions) {
      if (gameSessions[gameCode].hostId === socket.id) {
        console.log(`Game ${gameCode} ended due to host disconnection.`);
        io.to(gameCode).emit('gameEnded', 'Host disconnected.');
        delete gameSessions[gameCode];
      }
    }
  });
};