require('dotenv').config();

const { User } = require('../schemas');
const { httpError, ctrlWrapper } = require('../helpers');

const totalPages = (total, limit) => Math.ceil(total / limit);

const getAllUsers = async (req, res) => {
  const users = await User.find({});
  const total = await User.countDocuments({});

  res.status(200).json({ users, total });
};

const getUsers = async (req, res) => {
  const { type = all, page = 1, limit = 3 } = req.query;

  const Followings = req.body;

  const skip = (page - 1) * limit;

  const findFilter = () => {
    if (type === 'follow') {
      return {
        _id: {
          $nin: Followings,
        },
      };
    }

    if (type === 'followings') {
      return { _id: { $in: Followings } };
    }
    return {};
  };

  const users = await User.find(findFilter(), '', {
    skip,
    limit,
  });

  const total = await User.countDocuments(findFilter());

  res.status(200).json({ users, totalPages: totalPages(total, limit) });
};

const follow = async (req, res) => {
  const { _id } = req.params;

  const result = await User.findByIdAndUpdate(
    _id,
    {
      $inc: { followers: 1 },
    },
    { new: true }
  );

  res.status(200).json(result);
};

const unfollow = async (req, res) => {
  const { _id } = req.params;

  const result = await User.findByIdAndUpdate(
    _id,
    {
      $inc: { followers: -1 },
    },
    { new: true }
  );

  res.status(200).json(result);
};

module.exports = {
  getUsers: ctrlWrapper(getUsers),
  getAll: ctrlWrapper(getAllUsers),
  follow: ctrlWrapper(follow),
  unfollow: ctrlWrapper(unfollow),
};
