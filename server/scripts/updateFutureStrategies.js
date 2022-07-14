const Strategy = require('../models/strategyModel');
const Futures = require('../models/futuresModel');

async function updateFutureStrategies() {
  try {
    const strategies = await Strategy.find({
      'positions.legs': {
        $not: { $elemMatch: { segment: { $ne: 'futures' } } },
      },
    });

    for (let i = 0; i < strategies.length; i++) {
      let strategy = strategies[i];

      for (let j = 0; j < strategy.positions.legs.length; j++) {
        let leg = strategy.positions.legs[j];

        const instrument = leg.instrument;

        const regex = new RegExp(instrument);

        const future = await Futures.findOne({ future: { $regex: regex } });

        if (!future) continue;

        leg['instrument_token'] = future.instrument_token;
        leg['database'] = future.database;
        leg['tablename'] = future.tablename;
      }

      await strategy.save();
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = updateFutureStrategies;
