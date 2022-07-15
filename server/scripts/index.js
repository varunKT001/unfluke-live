const schedule = require('node-schedule');
const getAccessToken = require('./getAccessToken');
const getEncToken = require('./getEncToken');
const updateFutureStrategies = require('./updateFutureStrategies');
const Admin = require('../models/adminModel');
const UserBroker = require('../models/userBroker');
const kiteTickerInit = require('../subscribe');
const checkFuturesCondition = require('./checkFuturesCondition');

async function updateAdminAccessToken() {
  const admin = await Admin.findOne();
  const access_token = await getAccessToken(admin);
  admin.access_token = access_token;
  await admin.save();
}

async function updateUserAccessToken(user_id) {
  const user = await UserBroker.findOne({ user: user_id });
  const access_token = await getAccessToken(user);
  user.access_token = access_token;
  await user.save();
}

async function updateUserEncToken(user_id) {
  const user = await UserBroker.findOne({ user: user_id });
  const enctoken = await getEncToken(user);
  user.enctoken = enctoken;
  await user.save();
}

async function init() {
  const job = schedule.scheduleJob('0 30 8 1/1 * ? *', async function () {
    try {
      await updateAdminAccessToken();
      const users = await UserBroker.find();
      for (let key in users) {
        if (users[key].api) {
          await updateUserAccessToken(users[key].user);
        } else {
          await updateUserEncToken(users[key].user);
        }
      }
      await updateFutureStrategies();
      kiteTickerInit();
      checkFuturesCondition();
    } catch (error) {
      console.log(error);
    }
  });
}

module.exports = { init, updateAdminAccessToken };
