const Recipe = require('../models/recipeModel')
const mongoose = require('mongoose')
// get all recipes
const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find().sort({createdAt: -1})
        res.status(200).json(recipes)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

// get one recipe
const getRecipe = async (req, res) => {
    const { id } = req.params //destructured and assign to variable(s)
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'Recipe not found' })
    }
    try {
        const recipe = await Recipe.findById(id)
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' })
        }
        res.status(200).json(recipe)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// POST a recipe
const postRecipe = async (req, res) => {
    const { name, ingredients, instructions } = req.body
    try {
        const newRecipe = await Recipe.create({ name, ingredients, instructions })
        res.status(201).json(newRecipe)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Delete a recipe
const deleteRecipe = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Recipe not found' })
    }
    try {
        const deletedRecipe = await Recipe.findOneAndDelete({ _id: id }) //find one object that matches the field _id
        if (!deletedRecipe) {
            return res.status(400).json({ error: 'Recipe not found' })
        }
        res.status(200).json(deletedRecipe)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// update a recipe
const updateRecipe = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Recipe not found' })
    }

    try {
        const updatedRecipe = await Recipe.findOneAndUpdate( { _id: id },{ ...req.body}, { new: true }) //spread and update each field
        if (!updatedRecipe) {
            return res.status(400).json({ error: 'Recipe not found' })
        }
        res.status(200).json(updatedRecipe)
    } catch (error) {
        res.status(500).json({ error: 'Recipe not found' })
    }
}

module.exports = {
    getRecipes,
    getRecipe,
    postRecipe,
    deleteRecipe,
    updateRecipe
}