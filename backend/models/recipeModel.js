const mongoose = require('mongoose') //create model and schema

const Schema = mongoose.Schema

//cooking schema
const cookingSchema = new Schema({
    rate: {type: Number, required: true},
    instructions: {type: String, required: true},
    ingredients: {type: String, required: true},
}, {timestamps: true})

//create schema for recipe
const recipeSchema = new Schema({
    name: {type: String, required: true},
    ingredients: {type: String, required: true},
    instructions: {type: String, required: true},
    cookings: [cookingSchema],
} , {timestamps: true})

//create model for recipe
module.exports = mongoose.model('Recipe', recipeSchema)