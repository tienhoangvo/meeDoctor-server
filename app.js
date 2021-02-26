const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send({ greet: "Hi I'm Tien" });
});

module.exports = app;
