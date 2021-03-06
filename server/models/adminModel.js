const mongoose = require('mongoose');
const mongoose_local = require('../config/dbLocal');

const adminModel = mongoose.Schema({
  userID: {
    type: String,
  },
  password: {
    type: String,
  },
  pin: {
    type: String,
  },
  totp_secret: {
    type: String,
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
  auth_type: {
    type: String,
  },
  host: {
    type: String,
  },
});

module.exports = mongoose_local.model('AdminUnflukeLive', adminModel);
