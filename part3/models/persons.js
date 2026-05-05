
import mongoose from 'mongoose';


mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

//Test side
console.log(`Here is the url: ${url}`);

//end test side

console.log('connecting to', url);

mongoose.connect(url, { family: 4 })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

//Database Modelization
const personSchema = new mongoose.Schema({
    id: Number,
    name: String,
    number: String
});

//Format objects returned by Mongoose

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default mongoose.model('Person', personSchema);