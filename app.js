const express = require('express');
const path = require('path');
const PORT = 8080;
const ADDRESS = 'localhost';

const app = express();

// Serve the static folder containing Javascript
app.use(express.static(path.join(__dirname, 'js')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, ADDRESS, () => {
  console.log(`Listening on ${PORT}:${ADDRESS}`);
})


