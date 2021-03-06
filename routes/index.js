const authRouter = require('./authRoutes');
const billingRouter = require('./billingRoutes');
const userRouter = require('./userRoutes');
const sessionRouter = require('./sessionRoutes');
const {
  HttpNotFoundError,
} = require('../helpers/HttpErrors');
const uploadRouter = require('./uploadRoutes');

const mainRouter = (app) => {
  app.use('/api/auth', authRouter);
  app.use('/api/users', userRouter);
  app.use('/api/sessions', sessionRouter);
  app.use('/api/billings', billingRouter);
  app.use('/api/upload', uploadRouter);
  app.all('*', (req, res, next) => {
    return next(
      new HttpNotFoundError(
        `Can't find ${req.method} ${req.originalUrl} on this server!`
      )
    );
  });
};

module.exports = mainRouter;
