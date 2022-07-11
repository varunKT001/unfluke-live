const mongoose = require('mongoose');

const mongoose_cloud = mongoose.createConnection(process.env.CLOUD_DB_URI);

mongoose_cloud.once('open', () => {
  console.log('Database connected with cloud');
});

module.exports = mongoose_cloud;
