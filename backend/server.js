//importing modules
require('dotenv').config()

const express = require('express') 
const mongoose = require('mongoose')
const recipesRoutes = require('./routes/recipes')
//express app
const app = express()

//middleware - every requests

//attach body to req
app.use(express.json())

//logger
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes - certain endpoints (last middleware to execute)
app.use('/api/recipes', recipesRoutes)

//Connect to db - Async
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
        console.log('Connected to DB and Listening on port', process.env.PORT)
    })
}).catch((error) => {
    console.log(error);
}) 
