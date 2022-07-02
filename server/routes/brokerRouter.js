const router = require('express').Router();
const auth = require('../middleware/Auth');
const brokerController = require('../controllers/brokerController');

router
  .route('/')
  // create new broker
  .post(auth.checkUserAuthentication, brokerController.addBroker);

module.exports = router;
