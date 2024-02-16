const path = require('path');
const socket = require('socket.io');
const express = require('express');

const app = express();

const messages = [];

app.use(express.static(path.join(__dirname, 'client')));

app.get('/', (req, res) => {
  res.send(path.join(__dirname, 'client/index.html'));
});

const server = app.listen(8000, () => {
  console.log('Server is running on port 8000');
});

const io = socket(server);

const users = {};

io.on('connection', (socket) => {
  socket.on('login', (message) => {
    users[socket.id] = {
      id: socket.id,
      name: message.name,
    };

    socket.broadcast.emit('message', {
      author: 'Chat Bot',
      content: `${message.name} has joined the conversation!`,
    });
  });

  socket.on('disconnect', () => {
    const name = users[socket.id] ? users[socket.id].name : '';

    socket.broadcast.emit('message', {
      author: 'Chat Bot',
      content: `${name} has left the conversation... :(`,
    });

    delete users[socket.id];
  });

  socket.on('message', (message) => {
    messages.push(message);
    socket.broadcast.emit('message', message);
  });
});
