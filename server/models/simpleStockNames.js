const mongoose = require('mongoose');
const mongoose_cloud = require('../config/dbCloud');

const simpleStockNamesModel = mongoose.Schema({
  database: {
    type: String,
  },
  equity: {
    type: String,
  },
  instrument_token: {
    type: String,
  },
  leverage: {
    type: Number,
  },
  multiple: {
    type: Number,
  },
  tablename: {
    type: String,
  },
  truedata: {
    type: String,
  },
  subscribeDate: {
    type: String,
  },
});

module.exports = mongoose_cloud.model(
  'SimpleStockNames',
  simpleStockNamesModel
);
