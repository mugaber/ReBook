require('dotenv').config()
const path = require('path')

const express = require('express')
const connectDB = require('./config/db')

const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')

// init
const app = express()
connectDB()

// security
app.use(cors())
app.use(helmet())

// middlewares
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
app.use('/users', require('./routes/users'))
app.use('/books', require('./routes/books'))

// serve static files
if ((process.env.NODE_ENV = 'production')) {
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

// 404
app.use((req, res) => res.status(404).send('Not found'))

// run
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server running on port ${port}`))
