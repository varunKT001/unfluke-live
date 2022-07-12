const postgresClient = require('../config/dbPostgres');
const PSAR = require('technicalindicators').PSAR;

async function getPSAR(database, table, params) {
  try {
    const client = await postgresClient(database);

    const query = `SELECT * FROM ${table}`;

    let { rows } = await client.query(query);

    const input = {
      high: rows.map((row) => parseFloat(row.high)).slice(0, rows.length - 2),
      low: rows.map((row) => parseFloat(row.low)).slice(0, rows.length - 2),
      step: params.step,
      max: params.max,
    };

    const psar = new PSAR(Object.assign({}, input, { reversedInput: true }));

    console.log(psar.result[psar.result.length - 1]);
  } catch (error) {
    console.log(error);
  }
}

module.exports = getPSAR;
