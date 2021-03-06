const { Schema } = require('mongoose');
const { default: slugify } = require('slugify');
const User = require('./User');

const providerSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required!'],
      enum: {
        values: [
          'Dr',
          'Mr',
          'Mrs',
          'Miss',
          'Ms',
          'Other',
        ],
        message:
          'Title is either: Dr, Mr, Mrs, Miss, Ms or Other',
      },
    },
    roomName: {
      type: String,
      required: [true, 'Room name is required'],
      trim: true,
      unique: true,
    },
    displayName: String,
  },
  {
    discriminatorKey: 'role',
  }
);

providerSchema.pre('save', function (next) {
  const { title, lastName, roomName } = this;

  this.isModified('roomName') &&
    (this.roomName = slugify(roomName, {
      replacement: '',
    }));

  this.isNew &&
    (this.displayName = `${title} ${lastName}`);

  next();
});

const Provider = User.discriminator(
  'Provider',
  providerSchema
);

module.exports = Provider;
