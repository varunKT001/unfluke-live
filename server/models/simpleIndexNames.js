const mongoose = require('mongoose');
const mongoose_cloud = require('../config/dbCloud');

const simpleIndexNamesModel = mongoose.Schema({
  instrument_token: {
    type: Number,
  },
  index: {
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
  leverage: {
    type: Number,
  },
  subscribeDate: {
    type: String,
  },
  truedata: {
    type: String,
  },
});

module.exports = mongoose_cloud.model(
  'simpleIndexNames',
  simpleIndexNamesModel
);
