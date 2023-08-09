const mongoose = require("mongoose");

// define Schema Class
const Schema = mongoose.Schema;

// Create a Schema object
const mealSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price:  { type: Number, required: true },
  imageURL:  { type: String, required: true },
});

const Meal = mongoose.model("Meal", mealSchema);
module.exports = Meal;