const app = require('./app');
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `--EXPRESS APP is listening on port ${PORT}`
  );
});
