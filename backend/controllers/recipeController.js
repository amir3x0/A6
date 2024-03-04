const Recipe = require('../models/RecipesModel');
const mongoose = require('mongoose');
// get all recipes
const getRecipes = async (req, res) => {
    const recipes = await Recipe.find({}).sort({createdAt: -1});

    res.status(200).json(recipes);
};

// get a single recipe
const getRecipe = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such recipe'});
    }
    const recipe = await Recipe.findById(id);

    if(!recipe) {
        return res.status(404).json({error: 'No such recipe'});
    }

    res.status(200).json(recipe);
    console.log(recipe);
};
// create new recipe
const createRecipe = async (req, res) => {
    const { title, difficulty, category, description, instructions, ingredients, calories, picture } = req.body;

    try {
        // Create a new recipe document based on the Recipe schema
        const recipe = await Recipe.create({
            title,
            difficulty,
            category,
            description,
            instructions,
            ingredients,
            calories,
            picture
        });

        // Log the created recipe object to the console
        console.log('Created recipe:', recipe);

        res.status(201).json(recipe); // Send the created recipe as a response
    } catch (error) {
        // Log the error
        console.error('Error creating recipe:', error);

        res.status(400).json({ error: error.message }); // Handle errors
    }
};

// delete a recipe
const deleteRecipe = async (req, res) =>{
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){ //Check if the id is valid
        return res.status(404).json({error: 'No such recipe'});
    }

    const recipe = await Recipe.findOneAndDelete({_id: id});

    if(!recipe) { // check if there is such object whit this id in the db
        return res.status(404).json({error: 'No such recipe'});
    }

    res.status(200).json(recipe);

};

// update a recipe
const updateRecipe = async (req, res)=> {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){ //Check if the id is valid
        return res.status(404).json({error: 'No such recipe'});
    }

    const recipe = await Recipe.findOneAndUpdate({_id: id},{
        ...req.body
    })

    if(!recipe) { // check if there is such object whit this id in the db
        return res.status(404).json({error: 'No such recipe'});
    }

    res.status(200).json(recipe);
};

module.exports = {
    getRecipe,
    getRecipes,
    createRecipe,
    deleteRecipe,
    updateRecipe
};