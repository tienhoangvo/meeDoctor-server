const uploadRouter = require('express').Router();
const S3 = require('aws-sdk/clients/s3');
const uuid = require('uuid');
const {
  authenticate,
} = require('../middlewares/authMiddlewares');
const {
  S3U_ACCESS_KEY_ID,
  S3U_SECRET_ACCESS_KEY,
} = require('./../env');

const tryCatch = require('./../helpers/tryCatch');

const s3 = new S3({
  accessKeyId: S3U_ACCESS_KEY_ID,
  secretAccessKey: S3U_SECRET_ACCESS_KEY,
});

const createUploadUrl = async ({
  currentUserId,
  imageField,
}) => {
  const key = `${currentUserId}${
    imageField ? `/${imageField}s/` : '/'
  }${uuid.v1({})}.jpg`;

  const url = await s3.getSignedUrlPromise(
    'putObject',
    {
      Bucket: 'meedoctor-bucket',
      Key: key,
      Expires: 60 * 5,
      ContentType: 'image/jpeg',
    }
  );

  return { key, url };
};

uploadRouter.get(
  '/:imageField',
  authenticate,
  tryCatch(async (req, res, next) => {
    const { imageField } = req.params;
    const currentUserId = req.user._id;

    const { key, url } = await createUploadUrl({
      currentUserId,
      imageField,
    });

    res.status(200).json({
      key,
      url,
    });
  })
);

module.exports = uploadRouter;
