const Strategy = require('../models/strategyModel');
const schedule = require('node-schedule');
const Orders = require('../models/ordersModel');
const liveFeedEmitter = require('../subscribe/emitter');

const DAYS = [
  'sunday',
  'monday',
  'tuesday',
  'wednessday',
  'thursday',
  'friday',
  'saturday',
];

async function checkConditionsForStrategyOne(strategy) {
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const currentHour = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();
  const currentSeconds = currentDate.getSeconds();

  const { hour, minute, second } = strategy.strategySettings.startTime;

  console.log(
    `Checking strategy one: ${strategy._id}
     allowed week days: ${strategy.strategySettings.weekDays}
     startTime = ${hour}:${minute}:${second}
     -----
     day = ${DAYS[currentDay]}
     currentTime = ${currentHour}:${currentMinutes}:${currentSeconds}
     -----
     condition = ${
       strategy.strategySettings.weekDays.includes(DAYS[currentDay]) &&
       parseInt(hour) === currentHour &&
       parseInt(minute) === currentMinutes
     }   
    `
  );

  if (strategy.strategySettings.weekDays.includes(DAYS[currentDay])) {
    if (parseInt(hour) === currentHour) {
      if (parseInt(minute) === currentMinutes) {
        const legs = strategy.positions.legs;
        for (let i = 0; i < legs.length; i++) {
          let leg = legs[i];

          console.log(
            `Taking entry: (Name: ${strategy.name}, Leg: ${leg._id})`
          );
          ``;

          const strategyId = strategy._id;
          const legId = leg._id;
          const date = currentDate.toString();
          const time = currentDate.toLocaleTimeString();
          const entry = { date, time };
          const order = await Orders.create({ strategyId, legId, entry });
        }
      }
    }
  }
}

async function checkConditionsForStrategyTwo(strategy) {
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const currentHour = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();
  const currentSeconds = currentDate.getSeconds();

  const { hour, minute, second } = strategy.strategySettings.startTime;

  console.log(
    `Checking strategy two: ${strategy._id}
     allowed week days: ${strategy.strategySettings.weekDays}
     startTime = ${hour}:${minute}:${second}
     -----
     day = ${DAYS[currentDay]}
     currentTime = ${currentHour}:${currentMinutes}:${currentSeconds}
     -----
     date/time conditions = ${
       strategy.strategySettings.weekDays.includes(DAYS[currentDay]) &&
       parseInt(hour) === currentHour &&
       parseInt(minute) === currentMinutes
     }   
    `
  );

  if (strategy.strategySettings.weekDays.includes(DAYS[currentDay])) {
    if (parseInt(hour) === currentHour) {
      if (parseInt(minute) === currentMinutes) {
        const legs = strategy.positions.legs;
        for (let i = 0; i < legs.length; i++) {
          let leg = legs[i];
        }
      }
    }
  }
}

function scheduleFuturesForStrategyOne() {
  const job = schedule.scheduleJob('0 * * ? * *', async function () {
    const strategies = await Strategy.find({
      $and: [
        {
          'positions.legs': {
            $not: { $elemMatch: { segment: { $ne: 'futures' } } },
          },
        },
        {
          strategyType: 'strategy_one',
        },
      ],
    });

    for (let i = 0; i < strategies.length; i++) {
      let strategy = strategies[i];

      const tempStrategy = await Orders.findOne({ strategyId: strategy._id });

      if (tempStrategy) {
        const date = new Date(tempStrategy.entry.date);
        const oldHour = date.getHours();
        const oldMinute = date.getMinutes();

        const { hour, minute } = strategy.strategySettings.startTime;

        if (oldHour === parseInt(hour) && oldMinute === parseInt(minute)) {
          continue;
        }
      }

      await checkConditionsForStrategyOne(strategy);
    }
  });
}

function scheduleFuturesForStrategyTwo() {
  const job = schedule.scheduleJob('* * * ? * *', async function () {
    const strategies = await Strategy.find({
      $and: [
        {
          'positions.legs': {
            $not: { $elemMatch: { segment: { $ne: 'futures' } } },
          },
        },
        {
          strategyType: 'strategy_two',
        },
      ],
    });

    for (let i = 0; i < strategies.length; i++) {
      let strategy = strategies[i];

      const tempStrategy = await Orders.findOne({ strategyId: strategy._id });

      if (tempStrategy) {
        const date = new Date(tempStrategy.entry.date);
        const oldHour = date.getHours();
        const oldMinute = date.getMinutes();

        const { hour, minute } = strategy.strategySettings.startTime;

        if (oldHour === parseInt(hour) && oldMinute === parseInt(minute)) {
          continue;
        }
      }

      await checkConditionsForStrategyTwo(strategy);
    }
  });
}

function scheduleFutureConditionChecks() {
  scheduleFuturesForStrategyOne();
  scheduleFuturesForStrategyTwo();
}

module.exports = scheduleFutureConditionChecks;
