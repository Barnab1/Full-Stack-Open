/**note.js
 * 
 * This file's purpose is to facilitate connection with MongoDB database
 * It handle the database connection, set the Schema, proper format displayed data
 * and export it
 */

import config from '../src/utils/config.js';

import mongoose from "mongoose";

mongoose.set('strictQuery', false);

const url = config.MONGODB_URI;

//Connection establishing

mongoose.connect(url,{family:4})
        .then(result =>{
            console.log('Connected to MongoDB');
        })
        .catch(error =>{
            console.log(`error connecting to MongoDB: ${error.message}`);
        })

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean
});


noteSchema.set('toJSON',{
    transform: (document,  returnedObject)=>{
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})


export default mongoose.model('Note', noteSchema);


