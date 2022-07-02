const CatchAsyncErrors = require('../middleware/CatchAsyncErrors');
const UserBroker = require('../models/userBroker');

exports.addBroker = CatchAsyncErrors(async (req, res, next) => {
  const userBroker = await UserBroker.create(req.body);
  return res.status(200).json({
    success: true,
    data: userBroker,
  });
});
