const { v4: generateId } = require('uuid');

const { NotFoundError } = require('../util/errors');
const { readData, writeData } = require('./util');

async function getAll() {
  const storedData = await readData();
  if (!storedData.meals) {
    throw new NotFoundError('Could not find any meals.');
  }
  return storedData.meals;
}

async function get(id) {
  const storedData = await readData();
  if (!storedData.meals || storedData.meals.length === 0) {
    throw new NotFoundError('Could not find any meals.');
  }

  const event = storedData.meals.find((ev) => ev.id === id);
  if (!event) {
    throw new NotFoundError('Could not find event for id ' + id);
  }

  return event;
}

async function add(data) {
  const storedData = await readData();
  storedData.meals.unshift({ ...data, id: generateId() });
  await writeData(storedData);
}

async function replace(id, data) {
  const storedData = await readData();
  if (!storedData.meals || storedData.meals.length === 0) {
    throw new NotFoundError('Could not find any meals.');
  }

  const index = storedData.meals.findIndex((ev) => ev.id === id);
  if (index < 0) {
    throw new NotFoundError('Could not find event for id ' + id);
  }

  storedData.meals[index] = { ...data, id };

  await writeData(storedData);
}

async function remove(id) {
  const storedData = await readData();
  const updatedData = storedData.meals.filter((ev) => ev.id !== id);
  await writeData({ ...storedData, meals: updatedData });
}

exports.getAll = getAll;
exports.get = get;
exports.add = add;
exports.replace = replace;
exports.remove = remove;
