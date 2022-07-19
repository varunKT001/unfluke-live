const postgresClient = require('../config/dbPostgres');

async function getRows(database, table) {
  try {
    const client = await postgresClient(database);

    const query = `SELECT * FROM ${table}`;

    let { rows } = await client.query(query);

    return rows;
  } catch (error) {
    console.log(error);
  }
}

module.exports = getRows;
