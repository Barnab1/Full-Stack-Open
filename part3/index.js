const express = require('express');
const app = express();

app.use(express.json());

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
      response.status(400).end();
    }
})

app.delete('/api/persons/:id',(request, response)=>{

  const id = request.params.id;
  console.log("The id is: ",id);
  persons = persons.filter(person => person.id !== id);

  response.status(204).end();
})

const generatedId = ()=>{
  const maxId = Math.ceil(2*2*(Math.random() * persons.length));

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

//concatenating the anwser and returning it
  persons = persons.concat(newPerson);
  response.json(persons);
console.log('New entry was succesfully added');
})



const PORT = 3001;
app.listen(PORT, ()=>{
    console.log('Application working');
})