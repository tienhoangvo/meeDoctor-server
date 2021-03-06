const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

//////////////////////////////////
// SCHEMA
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, 'First name is required!'],
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, 'Last name is required!'],
    },
    email: {
      type: String,
      required: [true, 'Email is required!'],
      trim: true,
      lowercase: true,
      validate: [isEmail, 'Invalid email value!'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required!'],
      trim: true,
      minlength: [
        8,
        'Password must be longer or equal to 8 characters!',
      ],
      select: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    profilePicture: String,
    passwordChangedAt: Date,
    hashedResetPasswordToken: String,
    resetPasswordTokenExpiresAt: Date,
  },
  { timestamps: true, discriminatorKey: 'role' }
);

//////////////////////////////////
// STATICS AND INSTANCE METHODS
userSchema.statics.findLoginUser = async function ({
  email,
  password,
}) {
  const user = await this.findOne({
    email,
  });

  if (!user) return null;

  const verified = await bcrypt.compare(
    password,
    user.password
  );

  return verified ? user : null;
};

userSchema.methods.comparePasswords = function (
  candidatePassword
) {
  return bcrypt.compare(
    candidatePassword,
    this.password
  );
};

userSchema.methods.changedPasswordAfter = function (
  initialJWTTimestamp
) {
  if (!this.changedPasswordAt) return false;

  const changedPasswordTimestamp = parseInt(
    this.changedPasswordAt.getTime() / 1000,
    10
  );

  return (
    changedPasswordTimestamp > initialJWTTimestamp
  );
};

userSchema.methods.createResetPasswordToken = async function () {
  const resetPasswordToken = crypto
    .randomBytes(4)
    .toString('hex');

  this.hashedResetPasswordToken = crypto
    .createHash('sha256')
    .update(resetPasswordToken)
    .digest('hex');

  this.resetPasswordTokenExpiresAt =
    Date.now() + 3 * 60 * 1000; // expires after 3 minutes since the reset token initialized
  await this.save();
  return resetPasswordToken;
};

userSchema.pre(/^findOne/, function (next) {
  this.select('+password');
  next();
});

//////////////////////////////////
// HOOKS
userSchema.pre('save', async function (next) {
  // 1) Check if password is modified
  if (!this.isModified('password')) return next();

  // 2) Hash the password if it was provided
  this.password = await bcrypt.hash(
    this.password,
    12
  );

  if (this.isNew) return next();

  this.passwordChangedAt = new Date();

  next();
});

const User = model('User', userSchema);

module.exports = User;
