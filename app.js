const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const path = require('path');
const { static } = require('express');
const env = require('./env');
const errorDispatcher = require('./controllers/errorDispatcher');
const app = express();

app.use(cors());
app.options('*', cors());

if (env.NODE_ENV === 'development') {
  // Log the http request info
  app.use(require('morgan')('dev'));
}
app.use(cookieParser());
app.use(express.json({ limit: '10kb' }));

require('./routes')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(
    static(path.join(__dirname, 'client/build'))
  );

  app.all('*', (req, res) => {
    res.sendFile(
      path.resolve(
        __dirname,
        'client',
        'build',
        'index.html'
      )
    );
  });
}

app.use(errorDispatcher);

module.exports = app;
