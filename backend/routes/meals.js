const express = require('express');

const { getAll, get, add, replace, remove } = require('../data/meal');
const { checkAuth } = require('../util/auth');
const {
  isValidText,
  isValidPrice,
  isValidImageUrl,
} = require('../util/validation');

const router = express.Router();

router.get('/', async (req, res, next) => {
  console.log(req.token);
  try {
    const meals = await getAll();
    res.json({ meals: meals });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const meal = await get(req.params.id);
    res.json({ meal: meal });
  } catch (error) {
    next(error);
  }
});

router.use(checkAuth);

router.post('/', async (req, res, next) => {
  console.log(req.token);
  const data = req.body;

  let errors = {};
      
  if (!isValidText(data.name)) {
    errors.name = 'Invalid name.';
  }

  if (!isValidText(data.description)) {
    errors.description = 'Invalid description.';
  }

  if (!isValidPrice(data.price)) {
    errors.price = 'Invalid price.';
  }

  if (!isValidImageUrl(data.imageURL)) {
    errors.imageURL = 'Invalid imageURL.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: 'Adding the meal failed due to validation errors.',
      errors,
    });
  }
  console.log('finish validation');

  try {
    await add(data);
    res.status(201).json({ message: 'Meal saved.', meal: data });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  const data = req.body;

  let errors = {};

  if (!isValidText(data.name)) {
    errors.name = 'Invalid name.';
  }

  if (!isValidText(data.description)) {
    errors.description = 'Invalid description.';
  }

  if (!isValidPrice(data.price)) {
    errors.price = 'Invalid price.';
  }

  if (!isValidImageUrl(data.imageURL)) {
    errors.imageURL = 'Invalid imageURL.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: 'Updating the meal failed due to validation errors.',
      errors,
    });
  }

  try {
    await replace(req.params.id, data);
    res.json({ message: 'Meal updated.', meal: data });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await remove(req.params.id);
    res.json({ message: 'Meal deleted.' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
