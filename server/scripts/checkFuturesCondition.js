const Strategy = require('../models/strategyModel');
const schedule = require('node-schedule');
const Orders = require('../models/ordersModel');
const liveFeedEmitter = require('../subscribe/emitter');
const getSMA = require('./getSMA');
const getPSAR = require('./getPSAR');

const DAYS = [
  'sunday',
  'monday',
  'tuesday',
  'wednessday',
  'thursday',
  'friday',
  'saturday',
];

function getOperator(name) {
  let operator;

  if (name === 'greater_than') {
    operator = '>';
  } else if (name === 'less_than') {
    operator = '<';
  } else if (name === 'greater_than_equal_to') {
    operator = '>=';
  } else if (name === 'less_than_equal-to') {
    operator = '<=';
  }

  return operator;
}

async function getIndicatorValue(indicator, database, tablename) {
  let indicatorValue;

  if (indicator.name === 'sma') {
    const period = indicator?.parameters?.period || 1;
    indicatorValue = await getSMA(database, tablename, period);
  } else if (indicator.name === 'psar') {
    const params = {
      step: indicator?.parameters?.step || 0.02,
      max: indicator?.parameters?.max || 0.2,
    };
    indicatorValue = await getPSAR(database, tablename, params);
  }

  return indicatorValue;
}

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

          const conditions = leg.conditions;

          let conditionsEvaluationString = '';

          for (let j = 0; j < conditions.length; j++) {
            const condition = conditions[j];

            if (conditionsEvaluationString) {
              conditionsEvaluationString +=
                conditions[j - 1]?.logic === 'AND'
                  ? '&&'
                  : conditions[j - 1]?.logic === 'OR'
                  ? '||'
                  : '';
            }

            let indicator_1 = await getIndicatorValue(
              {
                name: condition.indicator_1.name,
                parameters: condition.indicator_1.parameters,
              },
              leg.database,
              leg.tablename
            );

            let indicator_2;

            if (condition.RHS === 'indicator') {
              indicator_2 = await getIndicatorValue(
                {
                  name: condition.indicator_2.name,
                  parameters: condition.indicator_2.parameters,
                },
                leg.database,
                leg.tablename
              );
            } else if (condition.RHS === 'number') {
              indicator_2 = condition.RHSValue;
            }

            conditionsEvaluationString += `${indicator_1}`;
            if (condition.RHS !== 'stock_ltp') {
              conditionsEvaluationString += `${getOperator(
                condition.operator
              )}${indicator_2}`;
            }
          }
          console.log(
            conditionsEvaluationString,
            eval(conditionsEvaluationString)
          );
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
  const job = schedule.scheduleJob('* * * * *', async function () {
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
