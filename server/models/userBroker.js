const mongoose = require('mongoose');
const mongoose_local = require('../config/dbLocal');

const userBrokerModel = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'UserUnflukeLive',
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pin: {
    type: String,
  },
  totp_secret: {
    type: String,
    required: true,
  },
  api_key: {
    type: String,
  },
  secret: {
    type: String,
  },
  access_token: {
    type: String,
  },
  enctoken: {
    type: String,
  },
  subscribe_date_time: {
    type: Date,
  },
  api: {
    type: Boolean,
    required: true,
  },
  auth_type: {
    type: String,
    required: true,
  },
  broker: {
    type: String,
    required: true,
  },
});

module.exports = mongoose_local.model('UserBroker', userBrokerModel);
