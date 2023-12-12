//importing modules
require('dotenv').config()

const express = require('express') 

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

//listen for requests
app.listen(process.env.PORT, () => {
    console.log('Listening . . .')
})