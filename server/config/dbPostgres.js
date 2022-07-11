const Client = require('pg').Client;

function postgresClient(database) {
  const client = new Client({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database,
  });

  client
    .connect()
    .then(() => console.log(`Postgres connected with ${database}`))
    .catch((error) => console.log(error));

  return client;
}

module.exports = postgresClient;
