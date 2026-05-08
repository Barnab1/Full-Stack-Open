
import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import Person from '../part3/models/persons.js';
import cors from 'cors'; //Enable external connections

import {fileURLToPath} from 'url';
import {dirname, join} from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BUILD_PATH = join(__dirname, 'dist');

const app = express();

 
//CONNECTING THE BACKEND TO FRONT END
//This section refers to middleware and the right way to use it in applications

app.use(express.json());

app.use(express.static(BUILD_PATH));

app.use(cors());

/*
morgan.token('post-body', (request) {
  if(request.method === "POST"){
    return JSON.stringify(request.body);
  }
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-body'));
*/


let localPersons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


//Database Integration

app.get("/",(request, response)=>{

    response.json("Hello world");

})

app.get("/api/persons",(request, response)=>{
        Person.find({})
        .then(persons=>{
          response.json(persons)
        })
        .catch(error=> response.json(`Look at those people, while we bring more, ${localPersons}`));
})

app.get('/api/persons/:id',(request, response)=>{
  const id = request.params.id;

  Person.findById(id)
  .then(person=>{
    response.json(person);})
  .catch(error=>response.json(`The entered id is not recognized`))
})

/* 
app.delete('/api/persons/:id',(request, response)=>{

  const id = request.params.id;
  console.log("The id is: ",id);
  persons = persons.filter(person => person.id !== id);

  response.status(204).end();
})
*/

/**Inserting new item */
const generatedId = ()=>{
  const maxId = Math.floor((Math.random() *1000));

  return String(maxId + 1);
}              

app.post('/api/persons',(request, response)=>{
  const body= request.body;

  //console.log('Here is the requested body', body);

  if(!body){
    return response.status(400).json({'error':"content missing"});
  }

// creating a new entry
  const newPerson = new Person({
    'id': generatedId(),
    'name':body.name,
    'number':body.number
  })

console.log(`Value of new person is `, response.json(newPerson));

//Checking name or number
 
  if(newPerson.name == "" || newPerson.number == "" ){
    return response.status(400).json({'error':"Please fill in both name and number"});
  }

  //ending the session  if the name already exist
  const isNameExisting = Person.find({name: newPerson.name});

  //console.log(isNameExisting);
  if(isNameExisting != undefined){

    return response.status(400).json({'error':"name must be unique"})
  }

//sending the newly created person to backend

newPerson.save()
          .then(savedPerson=> response.json(savedPerson));
})

/**End Person Insertion section*/

/** connecting BACKEND TO FRONTEND */

/*
app.use((request, response, next) => {
    // Check if the request is NOT for an API path (it has already failed to match API routes)
    if (!request.path.startsWith('/api')) {
      console.log(`Here is the Build path: ${BUILD_PATH}`);
        response.sendFile(join(BUILD_PATH, 'index.html'));
    } else {
        // If it's an API path that didn't match any route above, pass it to the 404 handler
        next();
    }
});
*/


const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log('Application working');
})