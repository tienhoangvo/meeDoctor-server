const env = require('../env');
const {
  HttpBadRequestError,
  HttpInternalServerError,
} = require('../helpers/HttpErrors');

const errorDispatcher = (err, req, res, next) => {
  debounceError(err);

  let error;

  if (err.name === 'CastError')
    error = handleCastErrorDB(err);

  if (
    err.name === 'MongoError' &&
    err.code === 11000
  )
    error = handleDublicateFieldsDB(err);

  if (err.name === 'ValidationError')
    error = handleValidationErrorDB(err);

  return sendErrorProd(error || err, res);
};

function debounceError(err) {
  if (!err.isOperational) {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    return err;
  }
}

function sendErrorProd(err, res) {
  console.log('--PRODUCTION ERROR');
  if (err.isOperational) {
    res.status(err.statusCode).json({
      name: err.name,
      status: err.status,
      message: err.message,
      data: err.data,
    });
  } else {
    console.error(err);
    const error = new HttpInternalServerError(
      'Something went wrong!'
    );
    res.status(500).json({
      name: error.name,
      status: error.status,
      message: error.message,
    });
  }
}

function handleCastErrorDB(err) {
  return new HttpBadRequestError(
    `Invalid ${err.path}: ${err.value}`
  );
}

function handleDublicateFieldsDB({ keyValue }) {
  const keyMessages = Object.keys(keyValue).map(
    (fieldName) => ({
      fieldName,
      message: `${keyValue[fieldName]} has been used. Please use another one!`,
    })
  );

  return new HttpBadRequestError(
    'Dublicate field value',
    keyMessages
  );
}

function handleValidationErrorDB({ errors }) {
  const keyMessages = Object.keys(errors).map(
    (keyName) => ({
      keyName,
      message: errors[keyName].message,
      value: errors[keyName].value,
    })
  );
  return new HttpBadRequestError(
    `Invalid input data`,
    keyMessages
  );
}

module.exports = errorDispatcher;
