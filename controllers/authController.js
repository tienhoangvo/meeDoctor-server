const crypto = require('crypto');
const {
  HttpUnauthenticatedError,
  HttpBadRequestError,
  HttpInternalServerError,
} = require('../helpers/HttpErrors');
const { createToken } = require('../helpers/JWT');
const tryCatch = require('../helpers/tryCatch');
const Provider = require('../models/Provider');
const User = require('../models/User');
const {
  sendWelcome,
  sendResetPasswordToken,
} = require('../services/Email');
const {
  ACCESS_TOKEN_COOKIE_EXPIRES_IN,
} = require('./../env');

const logUserIn = (res, statusCode, user) => {
  const accessToken = createToken({
    _id: user._id,
  });

  // PATCH ACCESS TOKEN TO RES OBJ
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    maxAge:
      ACCESS_TOKEN_COOKIE_EXPIRES_IN *
      24 *
      60 *
      60 *
      1000,
  });

  res.status(statusCode).json(user);
};

exports.signup = tryCatch(
  async (req, res, next) => {
    const {
      title,
      firstName,
      lastName,
      roomName,
      email,
      password,
    } = req.body;

    const provider = await Provider.create({
      title,
      firstName,
      lastName,
      roomName,
      email,
      password,
    });

    sendWelcome(provider);

    logUserIn(res, 201, provider);
  }
);

exports.login = tryCatch(
  async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findLoginUser({
      email,
      password,
    });

    if (!user) {
      return next(
        new HttpUnauthenticatedError(
          'Email or password is not correct!'
        )
      );
    }

    logUserIn(res, 200, user);
  }
);

exports.changeEmail = tryCatch(
  async (req, res, next) => {
    const {
      currentPassword,
      newEmail,
    } = req.body;

    if (!currentPassword && !newEmail)
      return next(
        new HttpBadRequestError(
          `Please provide your current password and new email address!`
        )
      );

    const matched = await req.user.comparePasswords(
      currentPassword
    );

    if (!matched)
      return next(
        new HttpBadRequestError(
          `Incorrect password`,
          [
            {
              keyName: 'currentPassword',
              message: 'Incorrect password!',
            },
          ]
        )
      );

    req.user.email = newEmail;

    await req.user.save();

    res.status(200).json(req.user);
  }
);

exports.changePassword = tryCatch(
  async (req, res, next) => {
    const {
      currentPassword,
      newPassword,
    } = req.body;

    if (!currentPassword && !newPassword)
      return next(
        new HttpBadRequestError(
          `Please provide your current password and new password!`
        )
      );

    const matched = await req.user.comparePasswords(
      currentPassword
    );

    if (!matched)
      return next(
        new HttpBadRequestError(
          `Incorrect password`,
          [
            {
              keyName: 'currentPassword',
              message: 'Incorrect password!',
            },
          ]
        )
      );

    req.user.password = newPassword;

    await req.user.save();

    res.status(200).json(req.user);
  }
);

exports.forgotPassword = tryCatch(
  async (req, res, next) => {
    // 01 -- Get email from user
    const { email } = req.body;

    if (!email)
      return next(
        new HttpBadRequestError(
          'Please provide the signed up email'
        )
      );

    // 02 -- Find the associate account
    const user = await User.findOne({ email });
    if (!user)
      return next(
        new HttpBadRequestError(
          `No account found with the email ${email}!`
        )
      );

    // 03 -- Send the reset token via email
    const resetPasswordToken = await user.createResetPasswordToken();

    // 03 -- Send the reset token via email
    try {
      await sendResetPasswordToken({
        email: email,
        displayName: user.displayName,
        resetPasswordToken,
      });

      res.status(200).json({
        status: 'success',
        message: `We sent a reset password token to this email ${user.email}. Please check it out.`,
      });
    } catch (error) {
      user.hashedResetPasswordToken = undefined;
      user.resetPasswordTokenExpiresAt = undefined;
      await user.save();

      next(
        new HttpInternalServerError(
          'We cannot sent the reset token to your email right now. Please try later!'
        )
      );
    }
  }
);

exports.resetPassword = tryCatch(
  async (req, res, next) => {
    // 01 -- Retrieve the resetToken from the request params, the passwords from the request's body
    const {
      password,
      resetPasswordToken,
    } = req.body;

    // 02 -- Verify the reset token
    const hashedResetPasswordToken = crypto
      .createHash('sha256')
      .update(resetPasswordToken)
      .digest('hex');

    const user = await User.findOne({
      hashedResetPasswordToken,
      resetPasswordTokenExpiresAt: {
        $gt: new Date(),
      },
    });

    if (!user) {
      return next(
        new HttpBadRequestError(
          'The reset password token has been expired or the user belongs to it no longer exists!'
        )
      );
    }

    // 03 -- Reset the passwords
    user.password = password;
    user.hashedResetPasswordToken = undefined;
    user.resetPasswordTokenExpiresAt = undefined;
    await user.save();

    // 04 -- Response with succesfull message
    res.status(200).json({
      status: 'success',
      message:
        'Your password was reset succesfully!',
    });
  }
);

exports.logout = (req, res) => {
  res.clearCookie('accessToken');
  res
    .status(200)
    .json({ message: 'You logged out!' });
};
