const { NotFoundError } = require("../util/errors");

let Meal = require("../models/meals.model");

async function getAll() {
  const meals = await Meal.find();
  if (!meals) {
    throw new NotFoundError("Could not find any meals.");
  }
  return meals;
}

async function get(id) {
  const meal = await Meal.findById(id);
  if (!meal) {
    throw new NotFoundError("Could not find event for id " + id);
  }

  return meal;
}

async function add(data) {
  const newMeal = new Meal({ ...data });
  await newMeal.save();
}

async function replace(id, data) {
  const meal = await Meal.findById(id);
  meal.name = data.name;
  meal.description = data.description;
  meal.price = data.price;
  meal.imageURL = data.imageURL;
  await meal.save();
}

async function remove(id) {
  await Meal.findByIdAndDelete(id);
}

exports.getAll = getAll;
exports.get = get;
exports.add = add;
exports.replace = replace;
exports.remove = remove;
