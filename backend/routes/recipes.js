const express = require('express')
const Recipe = require('../models/recipeModel')
const router = express.Router()
const { getRecipes, getRecipe, postRecipe, updateRecipe, deleteRecipe } = require('../controllers/recipeController')
// get all recipes
router.get('/', getRecipes)

// get one recipe
router.get('/:id', getRecipe)

// POST a recipe
router.post('/', postRecipe)

// Delete a recipe
router.delete('/:id', deleteRecipe)

// Update a recipe
router.patch('/:id', updateRecipe)

module.exports = router