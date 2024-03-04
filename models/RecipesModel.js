const mongoose = require('mongoose');

const { Schema } = mongoose;

// Enum for recipe difficulty levels
const difficultyEnum = ['Easy', 'Intermediate', 'Hard', 'Chef Level'];

// Enum for recipe categories
const categoryEnum = ['Appetizers', 'Starters', 'Main Dish', 'Dessert'];

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: difficultyEnum,
    required: true,
  },
  category: {
    type: String,
    enum: categoryEnum,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  instructions: {
    type: [String],
    required: true,
  },
  ingredients: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: String,
        required: true,
      },
    },
  ],
  calories: {
    total: {
      type: Number,
      required: true,
    },
    protein: {
      type: Number,
      required: true,
    },
    carbs: {
      type: Number,
      required: true,
    },
    fat: {
      type: Number,
      required: true,
    },
  },
  picture: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
