const express = require('express')

require('dotenv').config()
const connectDB = require('./config/db')

const cors = require('cors')
const helmet = require('helmet')

// init
const app = express()
connectDB()

// security
app.use(cors())
app.use(helmet())

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
app.get('/', (req, res) => res.send('API is running'))
app.use('/api/users', require('./routes/users'))

// 404
app.use((req, res) => res.status(404).send('Not found'))

// run
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server running on port ${port}`))
