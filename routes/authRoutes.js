const {
  signup,
  logout,
  login,
  changeEmail,
  changePassword,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');
const {
  authenticate,
} = require('../middlewares/authMiddlewares');

const authRouter = require('express').Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.post(
  '/forgotPassword',
  forgotPassword
);
authRouter.patch('/resetPassword', resetPassword);

authRouter.patch(
  '/changePassword',
  authenticate,
  changePassword
);
authRouter.patch(
  '/changeEmail',
  authenticate,
  changeEmail
);

authRouter.get('/logout', logout);
module.exports = authRouter;
