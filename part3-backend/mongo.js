/***
 * mongo.js
 * 
 * That file was the first one used to try MongoDB. It allows
 * me to learn data insertion and retrieval from MongoDb documents
 */

import mongoose from "mongoose";

if(process.argv.length < 3){
    console.log('give password as argument');
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://Barnabe:${password}@cluster0.6nbxdsl.mongodb.net/noteApp?appName=Cluster0`;

mongoose.set('strictQuery', false);

mongoose.connect(url,{family: 4});

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean
});
const Note = mongoose.model('Note', noteSchema);

const note = new Note({
    content: 'Tomorrow will be last world day, last world day be sure',
    important: false
})

/*
    note.save().then(result=>{
    console.log("note saved!");
    console.log(result);
    mongoose.connection.close();
}) 

*/

Note.find({important: true}).then(result=>{
    result.forEach(({id, content, important})=>{
        console.log(`Note ${id}: ${content}`)
    })
    mongoose.connection.close()
})
    