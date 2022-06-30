const CatchAsyncErrors = require('../middleware/CatchAsyncErrors');
const Strategy = require('../models/strategyModel');

// to add new strategy
exports.addStrategy = CatchAsyncErrors(async (req, res, next) => {
  const strategy = await Strategy.create(req.body);
  return res.status(200).json({
    success: true,
    data: strategy,
  });
});

// send all strategies
exports.sendAllStrategies = CatchAsyncErrors(async (req, res, next) => {
  const strategies = await Strategy.find({ user: req.user.id });
  return res.status(200).json({
    success: true,
    data: strategies,
  });
});

// edit existing strategy
exports.editStrategy = CatchAsyncErrors(async (req, res, next) => {
  const { id, state } = req.body;
  const strategy = await Strategy.findOneAndUpdate(
    { _id: id, user: req.user.id },
    state
  );
  return res.status(200).json({
    success: true,
    data: strategy,
  });
});

// delete strategies
exports.deleteStrategies = CatchAsyncErrors(async (req, res, next) => {
  const strategies = await Strategy.deleteMany({
    _id: req.body,
    user: req.user.id,
  });
  return res.status(200).json({
    success: true,
    message: 'Strategies deleted',
  });
});
