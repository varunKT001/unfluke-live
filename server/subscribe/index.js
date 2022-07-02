const KiteTicker = require('kiteconnect').KiteTicker;

function init() {
  const ticker = new KiteTicker({
    api_key: process.env.ZERODHA_API_KEY,
    access_token: process.env.ZERODHA_ACCESS_TOKEN,
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
