const PSAR = require('technicalindicators').PSAR;

async function getPSAR(rows, params, amount = 0) {
  rows = rows.slice(0, rows.length - amount);

  const input = {
    high: rows.map((row) => parseFloat(row.high)).slice(0, rows.length - 2),
    low: rows.map((row) => parseFloat(row.low)).slice(0, rows.length - 2),
    step: params.step,
    max: params.max,
  };

  const psar = new PSAR(Object.assign({}, input, { reversedInput: true }));

  return psar.result[psar.result.length - 1];
}

module.exports = getPSAR;
