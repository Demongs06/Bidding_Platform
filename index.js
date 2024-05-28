const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const sequelize = require('./config/database');
const userRoutes = require('./routes/users');
const itemRoutes = require('./routes/items');
const bidRoutes = require('./routes/bids');
const notificationRoutes = require('./routes/notifications');

const app = express();
require('dotenv').config();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/items', itemRoutes);
app.use('/bids', bidRoutes);
app.use('/notifications', notificationRoutes);

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

sequelize.sync()
  .then(() => server.listen(3000, () => console.log('Server with WebSocket is running on port 3000')))
  .catch(err => console.error('Unable to connect to the database:', err));
