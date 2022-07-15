// load env-vars
require('dotenv').config();

// load cron
// require('./scripts')();

(async function () {
  // await require('./scripts').updateAdminAccessToken();
  // require('./subscribe')();
  require('./scripts/checkFuturesCondition')();
})();

// requiring dependencies
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// initialize express
const app = express();

// requiring routers
const userRouter = require('./routes/userRouter');
const strategyRouter = require('./routes/strategyRouter');
const brokerRouter = require('./routes/brokerRouter');

// requiring middlewares
const errorMiddleware = require('./middleware/Error');

// uncaught exception
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Server shutting down due to uncaught exception`);
  process.exit(1);
});

// connect to db
require('./config/dbLocal');
require('./config/dbCloud');

// using middlewares
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json({ limit: '20mb' }));
app.use(cookieParser());

// using routers
app.use('/api/user', userRouter);
app.use('/api/strategy', strategyRouter);
app.use('/api/broker', brokerRouter);

// using other middlewares
app.use(errorMiddleware);

// deployment setup
if (process.env.NODE_ENV === 'production') {
  const __directory = path.resolve();
  app.use(express.static(path.join(__directory, '/client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__directory, 'client', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API service running 🚀');
  });
}

// starting server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log('server running 🚀');
});

// unhandled promise rejection
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Server shutting down due to unhandled promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
