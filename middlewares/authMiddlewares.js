const {
  HttpUnauthorizedError,
  HttpUnauthenticatedError,
} = require('../helpers/HttpErrors');
const { decodeToken } = require('../helpers/JWT');
const User = require('../models/User');

exports.authenticate = async (req, res, next) => {
  // 01 Get token from the user request
  const { accessToken } = req.cookies;

  if (!accessToken)
    return next(
      new HttpUnauthenticatedError(
        'You are not logged in!'
      )
    );

  // 02 Decode the token and get the user ID
  const decoded = await decodeToken(accessToken);

  console.log({ decoded });

  // 03 Lookup the user with the decoded id
  const user = await User.findOne({
    _id: decoded._id,
    isActive: true,
  });

  if (!user)
    return next(
      new HttpUnauthenticatedError(
        'User belongs to this token has been blocked or deleted!'
      )
    );

  // 04 Check if the user has changed his/her password
  // after the token initialized
  if (user.changedPasswordAfter(decoded.iat))
    return next(
      new HttpUnauthenticatedError(
        'User has changed the password! Please log in again'
      )
    );

  // 05 Percist the user to the req object.

  req.user = user;
  next();
};

exports.restrictTo = (...roles) => (
  req,
  res,
  next
) => {
  if (!roles.includes(req.user.role))
    return next(
      new HttpUnauthorizedError(
        'You have no permission to access this endpoint!'
      )
    );
  next();
};
