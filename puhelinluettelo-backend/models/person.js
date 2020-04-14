const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('useFindAndModify', false)
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

console.log('connecting to', url)
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 100,
    required: true,
  },
  number: {
    type: String,
    maxlength: 100,
    required: true,
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)