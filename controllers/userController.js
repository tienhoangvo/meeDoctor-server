const AppQuery = require('../helpers/AppQuery');
const {
  HttpNotFoundError,
} = require('../helpers/HttpErrors');
const tryCatch = require('../helpers/tryCatch');
const User = require('../models/User');

exports.listAllUsers = tryCatch(
  async (req, res, next) => {
    const listUsers = new AppQuery(
      User.find({}),
      req.query
    )
      .filter()
      .search()
      .paginate()
      .sort()
      .limitFields();

    const users = await listUsers.query;
    res.status(200).json({
      status: 'sucess',
      page: listUsers.page,
      limit: listUsers.limit,
      results: users.length,
      users,
    });
  }
);

exports.getUser = tryCatch(
  async (req, res, next) => {
    if (id === 'me')
      return this.getMe(req, res, next);

    const user = await User.findById(
      req.params.id
    );

    if (!user) {
      return next(
        new HttpNotFoundError(
          'No user found with that ID'
        )
      );
    }

    res.json(user);
  }
);

exports.getMe = (req, res, next) => {
  return res.json(req.user);

  next();
};

exports.updateMe = tryCatch(
  async (req, res, next) => {
    const { _id } = req.user;

    const {
      title,
      firstName,
      lastName,
      profilePicture,
    } = req.body;

    const user = await User.findByIdAndUpdate(
      _id,
      {
        title,
        firstName,
        lastName,
        profilePicture,
      },
      {
        new: true,
      }
    );

    res.status(200).json(user);
  }
);
