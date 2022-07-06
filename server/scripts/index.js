const getAccessToken = require('./getAccessToken');
const Admin = require('../models/adminModel');

exports.updateAdminAccessToken = async function () {
  const admin = await Admin.findOne();
  const access_token = await getAccessToken(admin);
  admin.access_token = access_token;
  await admin.save();
};
