const Admin = require('../models/adminModel');
const KiteTicker = require('kiteconnect').KiteTicker;

async function init() {
  const { api_key, access_token } = await Admin.findOne();
  const ticker = new KiteTicker({
    api_key,
    access_token,
  });

  ticker.connect();
  ticker.on('ticks', onTicks);
  ticker.on('connect', subscribe);
  ticker.on('error', onError);

  function onTicks(ticks) {
    console.log('Ticks', ticks);
  }

  function subscribe() {
    var items = [738561];
    ticker.subscribe(items);
    ticker.setMode(ticker.modeFull, items);
  }

  function onError(error) {
    console.log(error.message);
  }
}

module.exports = init;
