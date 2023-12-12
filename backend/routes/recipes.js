const express = require('express')
const Recipe = require('../models/recipeModel')
const router = express.Router()

// get all recipes
router.get('/', (req, res) => {
    res.json({message: 'Get all recipes'})
})

// get one recipe
router.get('/:id', (req, res) => {
    res.json({message: `Get a recipe `})
})

// POST a recipe
router.post('/', async (req, res) => {
    const {name, ingredients, instructions} = req.body
    
    try {
        const newRecipe = await Recipe.create({name, ingredients, instructions})
        res.status(200).json(newRecipe)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// Delete a recipe
router.delete('/:id', (req, res) => {
    res.json({message: 'Delete a recipe'})
})

// Update a recipe
router.patch('/:id', (req, res) => {
    res.json({message: 'Update a recipe'})
})

module.exports = router