const mongoose = require('mongoose');
const mongoose_cloud = require('../config/dbCloud');

const unflukeLiveAdminModel = mongoose.Schema({
  year: { type: String },
});

module.exports = mongoose_cloud.model(
  'unflukelive_admin',
  unflukeLiveAdminModel,
  'unflukelive_admin'
);
