import express from 'express';
import morgan from 'morgan';

import {fileURLToPath} from 'url';
import {dirname, join} from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BUILD_PATH = join(__dirname, 'dist');

const app = express();

app.use(express.json());

app.use(express.static(BUILD_PATH));


morgan.token('post-body', function (request) {
  //Only log the console if the request method is POST
  if(request.method === "POST"){
    return JSON.stringify(request.body);
  }

  return ""; //return empty on other methods
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-body'));


let persons = [
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

const output = (people, date)=>{
  return `<p>Phonebook has info for ${people} people</p><p>${date}</p>`
}

app.get("/",(request, response)=>{

    const numberOfEntry = persons.length;
    
    const currentDate = new Date();
    response.send(output(numberOfEntry,currentDate));

})

app.get("/api/persons",(request, response)=>{
        response.json(persons);
})

app.get('/api/persons/:id',(request, response)=>{
  const id = request.params.id;
  
  const person = persons.find(person => person.id === id);
    if(person){
  response.json(person);
    }else{
      response.status(404).end();
    }
})

app.delete('/api/persons/:id',(request, response)=>{

  const id = request.params.id;
  console.log("The id is: ",id);
  persons = persons.filter(person => person.id !== id);

  response.status(204).end();
})

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
  const newPerson = {
    'id': generatedId(),
    'name':body.name,
    'number':body.number
  }

//Checking name or number 
  if(newPerson.name == "" || newPerson.number == "" ){
    return response.status(400).json({'error':"Please fill in both name and number"});
  }

  //ending the session  if the name already exist
  const isNameExisting = persons.find(people => people.name == newPerson.name);

  //console.log(isNameExisting);
  if(isNameExisting != undefined){

    return response.status(400).json({'error':"name must be unique"})
  }

//concatenating the anwser and following the best practice of just sending
//back the newly created resource only

  persons = persons.concat(newPerson);
  response.json(newPerson);
})

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

const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=>{
    console.log('Application working');
})