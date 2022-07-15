const mongoose = require('mongoose');
const mongoose_local = require('../config/dbLocal');

const ordersModel = mongoose.Schema({
  strategyId: {
    type: mongoose.Types.ObjectId,
    ref: 'Strategy',
    required: true,
  },
  legId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  entry: {
    date: { type: String },
    time: { type: String },
  },
});

module.exports = mongoose_local.model('OrdersUnflukeLive', ordersModel);
