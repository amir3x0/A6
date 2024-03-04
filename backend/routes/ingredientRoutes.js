// routes/ingredientRoutes.js

const express = require('express');
const ingredientController = require('../controllers/ingredientController');

const router = express.Router();

router.get('/:name/information', ingredientController.getIngredientInfoByName);

module.exports = router;
