const express = require('express');
const parser = require('body-parser');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const PORT = 8080;
const ADDRESS = 'localhost';

const app = express();


app.use(parser.urlencoded({  extended: true}));
app.use('/CSS', express.static('CSS'));
app.use('/HTML', express.static('HTML'));
app.use('/js', express.static('js'));
app.use('/data', express.static('js/data'));

app.get('/', function (req, res) {
  let doc = fs.readFileSync('./HTML/index.html', "utf8");
  res.send(doc);
})

app.listen(PORT, ADDRESS, () => {
  console.log(`Listening on ${PORT}:${ADDRESS}`);
})


