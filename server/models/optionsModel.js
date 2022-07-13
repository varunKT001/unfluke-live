const mongoose = require('mongoose');
const mongoose_cloud = require('../config/dbCloud');

const optionsModel = mongoose.Schema({
  instrument_token: {
    type: Number,
  },
  option: {
    type: String,
  },
  database: {
    type: String,
  },
  tablename: {
    type: String,
  },
  multiple: {
    type: Number,
  },
  buy_leverage: {
    type: Number,
  },
  sell_leverage: {
    type: Number,
  },
  truedata: {
    type: String,
  },
});

module.exports = mongoose_cloud.model('Options', optionsModel);
