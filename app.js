const express = require('express');
const parser = require('body-parser');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const ADDRESS = 'localhost';

const app = express();


app.use(parser.urlencoded({  extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  let doc = fs.readFileSync('./public/index.html', "utf8");
  res.send(doc);
});

app.listen(PORT, ADDRESS, () => {
  console.log(`Listening on ${PORT}:${ADDRESS}`);
});
