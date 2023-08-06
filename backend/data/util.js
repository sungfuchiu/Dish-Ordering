const fs = require('node:fs/promises');

async function readData() {
  const data = await fs.readFile('meals.json', 'utf8');
  return JSON.parse(data);
}

async function writeData(data) {
  await fs.writeFile('meals.json', JSON.stringify(data));
}

exports.readData = readData;
exports.writeData = writeData;