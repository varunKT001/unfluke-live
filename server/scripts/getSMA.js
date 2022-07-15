const postgresClient = require('../config/dbPostgres');
const SMA = require('technicalindicators').SMA;

async function getSMA(database, table, period) {
  try {
    const client = await postgresClient(database);

    const query = `SELECT * FROM ${table}`;

    let { rows } = await client.query(query);

    rows = rows.slice(Math.max(rows.length - 5, 1));

    const sma = new SMA({
      period,
      values: rows.map((row) => parseFloat(row.close)),
    });

    return sma.result[sma.result.length - 1];
  } catch (error) {
    console.log(error);
  }
}

module.exports = getSMA;
