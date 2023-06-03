const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');

const user = new Schema(
  {
    name: {
      required: [true, 'Name is required'],
      type: String,
    },
    tweets: {
      required: [true, 'Tweets is required'],
      type: Number,
    },
    followers: {
      required: [true, 'Followers is required'],
      type: Number,
    },
    avatar: {
      required: [true, 'Avatar is required'],
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

user.post('save', handleMongooseError);

const User = model('user', user);

module.exports = { User };
