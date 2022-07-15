const KiteTicker = require('kiteconnect').KiteTicker;
const liveFeedEmitter = require('./emitter');
const Admin = require('../models/adminModel');
const SimpleStockNames = require('../models/simpleStockNames');
const SimpleIndexNames = require('../models/simpleIndexNames');
const Options = require('../models/optionsModel');
const Futures = require('../models/futuresModel');

async function init() {
  const { api_key, access_token } = await Admin.findOne();

  const simpleStockNames = await SimpleStockNames.find({});
  const simpleIndexNames = await SimpleIndexNames.find({});
  const options = await Options.find({});
  const futures = await Futures.find({});

  const instrument_tokens = []
    .concat(simpleStockNames.map((item) => parseInt(item.instrument_token)))
    .concat(simpleIndexNames.map((item) => parseInt(item.instrument_token)))
    .concat(options.map((item) => parseInt(item.instrument_token)))
    .concat(futures.map((item) => parseInt(item.instrument_token)));

  const ticker = new KiteTicker({
    api_key,
    access_token,
  });

  ticker.connect();
  ticker.on('ticks', onTicks);
  ticker.on('connect', subscribe);
  ticker.on('error', onError);

  function onTicks(ticks) {
    liveFeedEmitter.emit('tick', ticks);
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
