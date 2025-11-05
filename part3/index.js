const express = require('express');
const app = express();

app.use(express.json());

const persons = [
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

const PORT = 3001;
app.listen(PORT, ()=>{
    console.log('Application working');
})