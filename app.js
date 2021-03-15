const express = require('express');
const cookieParser = require('cookie-parser');

const path = require('path');
const { static } = require('express');
const env = require('./env');
const errorDispatcher = require('./controllers/errorDispatcher');
const app = express();

if (env.NODE_ENV === 'development') {
  // Log the http request info
  app.use(require('morgan')('dev'));
}
app.use(cookieParser());
app.use(express.json({ limit: '10kb' }));

require('./routes')(app);

app.use(errorDispatcher);

module.exports = app;
