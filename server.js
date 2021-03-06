const mongoose = require('mongoose');
const app = require('./app');
const env = require('./env');

const {
  PORT,
  MONGODB_DBNAME,
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
  MONGODB_DBURI,
} = env;

const server = app.listen(PORT, () => {
  console.log(
    `--EXPRESS is listening on port ${PORT}`
  );
});

mongoose.connect(
  MONGODB_DBURI.replace(
    'MONGODB_USERNAME',
    MONGODB_USERNAME
  )
    .replace('MONGODB_PASSWORD', MONGODB_PASSWORD)
    .replace('MONGODB_DBNAME', MONGODB_DBNAME),
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  () => {
    console.log(
      '--MONGODB connected successfully!'
    );
  }
);

process.on('unhandledRejection', (err) => {
  console.error(err);
  console.log(
    '--CRITICAL ERROR: Shutting down the app ...!'
  );
  server.close(() => {
    process.exit(1);
  });
});
