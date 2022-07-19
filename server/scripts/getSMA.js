const SMA = require('technicalindicators').SMA;

async function getSMA(rows, period, amount = 0) {
  rows = rows.slice(0, rows.length - amount);

  const sma = new SMA({
    period,
    values: rows.map((row) => parseFloat(row.close)),
  });

  return sma.result[sma.result.length - 1];
}

module.exports = getSMA;
