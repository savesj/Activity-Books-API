require('dotenv').config()

const MONGO_URI = process.env.MONGO_URI

console.log(`ENV MONGO_URI Length: ${MONGO_URI.length}`)

const mongoose = require('mongoose')
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  })
  
module.exports.Book = require('./books')
