const mongoose = require('mongoose');

const mongoose_local = mongoose.createConnection(process.env.DB_URI);

mongoose_local.once('open', () => {
  console.log('Database connected with local');
});

module.exports = mongoose_local;
