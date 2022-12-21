const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

const phoneNumberValidator = (val) => {
  return !(val.indexOf(`-`) > -1 && val.length <9) && /^(\d{2,3}-\d{5,})$|^\d{8,}$/.test(val)
}

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const peopleSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    validate: phoneNumberValidator,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
})

peopleSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', peopleSchema)