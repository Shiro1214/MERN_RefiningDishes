const express = require('express')

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
router.post('/', (req, res) => {
    res.json({message: 'Post a recipe'})
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