const express = require('express')
require('dotenv').config()

const connectDB = require('./config/db')

// init
const app = express()

connectDB()

// middlewares
app.get('/', (req, res) => res.send('API is running'))
app.use((req, res) => res.send('not found'))

// run
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server running on port ${port}`))
