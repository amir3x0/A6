const express = require('express')
const {
    getRecipe,
    getRecipes,
    createRecipe,
    deleteRecipe,
    updateRecipe,
} = require('../controllers/recipeController')

const router = express.Router()

//Get all recipes
router.get('/', getRecipes)

//Get single recipe
router.get('/findone/:id', getRecipe)

//Post a new recipe
router.post('/',createRecipe)

//Update a recipe 
router.patch('/:id',updateRecipe)

//Delete a recipe 
router.delete('/:id', deleteRecipe)


module.exports = router