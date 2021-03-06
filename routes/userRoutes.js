const {
  getUser,
  getMe,
  listAllUsers,
  updateMe,
} = require('../controllers/userController');
const {
  authenticate,
  restrictTo,
} = require('../middlewares/authMiddlewares');

const userRouter = require('express').Router();

userRouter
  .route('/')
  .get(
    authenticate,
    restrictTo('Admin'),
    listAllUsers
  );

userRouter
  .route('/:id')
  .get(
    authenticate,
    getMe,
    restrictTo('Admin'),
    getUser
  )
  .patch(authenticate, updateMe);

module.exports = userRouter;
