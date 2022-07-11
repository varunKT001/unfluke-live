const KiteTicker = require('kiteconnect').KiteTicker;
const Admin = require('../models/adminModel');
const SimpleStockNames = require('../models/simpleStockNames');

async function init() {
  const { api_key, access_token } = await Admin.findOne();
  const simpleStockNames = await SimpleStockNames.find({});

  const instrument_tokens = simpleStockNames.map((name) => {
    return parseInt(name.instrument_token);
  });

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
    ticker.subscribe(instrument_tokens);
    ticker.setMode(ticker.modeFull, instrument_tokens);
  }

  function onError(error) {
    console.log(error.message);
  }
}

module.exports = init;
