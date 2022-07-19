const Strategy = require('../models/strategyModel');
const schedule = require('node-schedule');
const Orders = require('../models/ordersModel');
const liveFeedEmitter = require('../subscribe/emitter');
const getSMA = require('./getSMA');
const getPSAR = require('./getPSAR');
const getRows = require('./getRows');

const DAYS = [
  'sunday',
  'monday',
  'tuesday',
  'wednessday',
  'thursday',
  'friday',
  'saturday',
];

let TICK;

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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

async function getIndicatorValue(indicator, rows, amount = 0) {
  let indicatorValue;

  if (indicator.name === 'sma') {
    const period = indicator?.parameters?.period || 14;
    indicatorValue = await getSMA(rows, period, amount);
  } else if (indicator.name === 'psar') {
    const params = {
      step: indicator?.parameters?.step || 0.02,
      max: indicator?.parameters?.max || 0.2,
    };
    indicatorValue = await getPSAR(rows, params, amount);
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

          const rows = await getRows(leg.database, leg.tablename);

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
              rows
            );

            let indicator_2;

            if (condition.RHS === 'indicator') {
              indicator_2 = await getIndicatorValue(
                {
                  name: condition.indicator_2.name,
                  parameters: condition.indicator_2.parameters,
                },
                rows
              );
            } else if (condition.RHS === 'number') {
              indicator_2 = condition.RHSValue;
            }

            if (condition.RHS !== 'stock_ltp') {
              if (
                condition.operator === 'cross_below_from_above' ||
                condition.operator === 'cross_above_from_below'
              ) {
                let tempConditionString = ``;

                const indicator_1_temp = await getIndicatorValue(
                  {
                    name: condition.indicator_1.name,
                    parameters: condition.indicator_1.parameters,
                  },
                  rows,
                  1
                );

                const tempOperators = [
                  condition.operator === 'cross_above_from_below' ? '>' : '<',
                  condition.operator === 'cross_above_from_below' ? '<' : '>',
                ];

                tempConditionString += `${indicator_1}${tempOperators[0]}${indicator_2}&&${indicator_1_temp}${tempOperators[1]}${indicator_2}`;

                conditionsEvaluationString += tempConditionString;

                continue;
              }

              conditionsEvaluationString += `${indicator_1}${getOperator(
                condition.operator
              )}${indicator_2}`;
            } else {
              const startTime = new Date(Date.now());
              const endTime = new Date(startTime.getTime() + 60000);

              const job = schedule.scheduleJob(
                { start: startTime, end: endTime, rule: '*/1 * * * * *' },
                function () {
                  let tempEvaluationString = '';
                  const feed = TICK.find(
                    (l) => l.instrument_token === parseInt(leg.instrument_token)
                  );

                  if (feed) {
                    tempEvaluationString += `${indicator_1}${getOperator(
                      condition.operator
                    )}${feed.last_price}`;

                    if (eval(tempEvaluationString)) {
                      conditionsEvaluationString += tempEvaluationString;
                      job.cancel();
                    }
                  }
                }
              );

              await sleep(60000);
            }
          }
          if (
            conditionsEvaluationString.endsWith('&&') ||
            conditionsEvaluationString.endsWith('||')
          ) {
            conditionsEvaluationString = conditionsEvaluationString.slice(
              0,
              conditionsEvaluationString.length - 2
            );
          }

          console.log(
            conditionsEvaluationString,
            eval(conditionsEvaluationString)
          );

          if (eval(conditionsEvaluationString)) {
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
  liveFeedEmitter.on('tick', (tick) => {
    TICK = tick;
  });

  scheduleFuturesForStrategyOne();
  scheduleFuturesForStrategyTwo();
}

module.exports = scheduleFutureConditionChecks;
