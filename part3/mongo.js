import mongoose from 'mongoose';

//Password Check
if (process.argv.length < 3){
    console.log('Give password as argument');
    process.exit(1);
}

//Database connection
const password = process.argv[2];

const url = `mongodb+srv://Barnabe:${password}@cluster0.6nbxdsl.mongodb.net/personApp?appName=Cluster0`;

mongoose.set('strictQuery',false);
mongoose.connect(url, {family: 4});

//Database Modelization
const personSchema = new mongoose.Schema({
    id: Number,
    name: String,
    number: String
});

const Person = mongoose.model('Person',personSchema);


if(process.argv.length === 5){
    //Data insertion


const person = new Person({
    id: (Math.floor(Math.random() * 1000)) + 1,
    name: process.argv[3],
    number: process.argv[4]
})


person.save().then(result=>{
    console.log(`Note saved`);
    mongoose.connection.close();
})


}else{

    Person.find()
            .then((result)=>{
                result.forEach(({id,name,number})=>{
                console.log(`Entry ${id}: ${name}-${number}`)
        })
        mongoose.connection.close();
    })
}


  

    


