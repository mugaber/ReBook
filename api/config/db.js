const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    console.log('DB CONNECTED')
  } catch (err) {
    console.log('DB CONNECTON ERROR', err.message)
    process.exit(1)
  }
}

module.exports = connectDB
