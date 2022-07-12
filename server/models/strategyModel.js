const mongoose = require('mongoose');
const mongoose_local = require('../config/dbLocal');

const strategyModel = mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: 'User' },
  name: { type: String },
  strategyType: { type: String },
  status: { type: String },
  strategySettings: {
    underlying: { type: String },
    tradeType: { type: String },
    duration: { type: String },
    weekDays: [{ type: String }],
    daysBeforeExpiry: { type: String },
    startTime: {
      hour: { type: String },
      minute: { type: String },
      second: { type: String },
    },
    endTime: {
      hour: { type: String },
      minute: { type: String },
      second: { type: String },
    },
    nextDayEndTime: {
      hour: { type: String },
      minute: { type: String },
      second: { type: String },
    },
    checkConditionNextDayAfter: {
      hour: { type: String },
      minute: { type: String },
      second: { type: String },
    },
  },
  positions: {
    legs: [
      {
        instrument: { type: String },
        segment: { type: String },
        options: { type: String },
        buysell: { type: String },
        strike: { type: String },
        strikeDetails: { type: String },
        quantity: { type: String },
        tradeType: { type: String },
        timeFrame: { type: String },
        conditions: [
          {
            indicator_1: {
              name: { type: String },
              parameters: {},
            },
            operator: { type: String },
            RHS: { type: String },
            indicator_2: {
              name: { type: String },
              parameters: {},
            },
          },
        ],
        legType: {
          type: { type: String },
          value: { type: String },
        },
        target: {
          type: { type: String },
          value: { type: String },
        },
        stopLoss: {
          type: { type: String },
          value: { type: String },
        },
        trailingStopLoss: {
          type: { type: String },
          value: {
            x: { type: String },
            y: { type: String },
          },
        },
        waitTime: {
          type: { type: String },
          value: { type: String },
        },
        reEntrySettings: {
          type: { type: String },
          maxEntries: { type: String },
        },
        squareOff: { type: String },
      },
    ],
    legOptions: {
      waitAndTrade: { type: Boolean },
      reEntry: { type: Boolean },
      moveSlToCost: { type: Boolean },
      tradeOnlyFirstEntry: { type: Boolean },
    },
  },
  MTMTraget: {
    type: { type: String },
    value: { type: String },
  },
  MTMStopLoss: {
    fixedStopLoss: { type: String },
    value: { type: String },
  },
  MTMTrailing: {
    value: { type: String },
    type: { type: String },
    values: {
      x: { type: String },
      y: { type: String },
    },
  },
  advancedSettings: {
    entry: {
      type: { type: String },
      options: {
        triggerAndPriceLimitBufferIn: { type: String },
        triggerAndPriceLimitBufferValue: { type: String },
        entryWithMarketOrderIfOpenForN: { type: String },
      },
    },
    exit: {
      type: { type: String },
      options: {
        triggerAndPriceLimitBufferIn: { type: String },
        triggerAndPriceLimitBufferValue: { type: String },
        entryWithMarketOrderIfOpenForN: { type: String },
      },
    },
  },
});

module.exports = mongoose_local.model('Strategy', strategyModel);
