const { Schema } = require('mongoose');
const User = require('./User');

const adminSchema = new Schema(
  {
    _createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  { discriminatorKey: 'role' }
);

const Admin = User.discriminator(
  'Admin',
  adminSchema
);

module.exports = Admin;
