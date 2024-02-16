const path = require('path');
const express = require('express');

const app = express();

const messages = [];

app.use(express.static(path.join(__dirname, 'client')));

app.get('/', (req, res) => {
  res.send(path.join(__dirname, 'client/index.html'));
});

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
