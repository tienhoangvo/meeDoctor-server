const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const {
  ACCESS_TOKEN_EXPIRES_IN,
  JWT_SECRET,
} = require('../env');

exports.createToken = (payload) =>
  jwt.sign(payload, JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });

exports.decodeToken = async (token) =>
  await jwt.verify(token, JWT_SECRET, {
    maxAge: ACCESS_TOKEN_EXPIRES_IN,
  });
