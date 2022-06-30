const router = require('express').Router();
const auth = require('../middleware/Auth');
const strategyController = require('../controllers/strategyController');

router
  .route('/')
  // send all strategies
  .get(auth.checkUserAuthentication, strategyController.sendAllStrategies)
  // create new strategy
  .post(auth.checkUserAuthentication, strategyController.addStrategy)
  // edit strategy
  .patch(auth.checkUserAuthentication, strategyController.editStrategy)
  // delete strategies
  .delete(auth.checkUserAuthentication, strategyController.deleteStrategies);

module.exports = router;
