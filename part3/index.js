
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

//Reading database entries
app.get("/api/persons",(request, response)=>{
        Person.find({})
        .then(persons=>{
          response.json(persons)
        })
        .catch(error=> response.json(`Look at those people, while we bring more, ${localPersons}`));
})

//Reading specific information
app.get('/api/persons/:id',(request, response,next)=>{
  const id = request.params.id;

  Person.findById(id)
  .then(person=>{
    response.json(person);})
  .catch(error=>next(error))
})

//Deletion functionality

app.delete('/api/persons/:id',(request, response,next)=>{

  const id = request.params.id;
  Person.findByIdAndDelete(id)
        .then(result=> response.status(204).end)
        .catch(error=>next(error))
})


/**Inserting new item */             

app.post('/api/persons',(request, response)=>{
  const body= request.body;

  if(!body){
    return response.status(400).json({'error':"content missing"});
  }

// creating a new entry
  const newPerson = new Person({
    'name':body.name,
    'number':body.number
  })

//Checking name or number
 
  if(newPerson.name == "" || newPerson.number == "" ){
    return response.status(400).json({'error':"Please fill in both name and number"});
  }

newPerson.save()
          .then(savedPerson=> response.json(savedPerson))
          .catch(error=> response.json(error))
})

/**End Person Insertion section*/

//Update operations
app.put('/api/persons/:id',(request, response, next)=>{
  const {name, number} = request.body;
  
  if (!name || !number) {
    return response.status(400).json({ error: 'name and number are required' });
  }
  
  Person.findById(request.params.id)
                  .then(person=>{
                    if(!person) return response.status(404).json({ error: 'person not found' });
                      //updating entries
                    person.name = name;
                    person.number = number;

                    return person.save().then(updatedPerson=> response.json(updatedPerson));
                  })
                  .catch(error=>next(error))
})
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
//Moving error handling into middleware

const unknownEndpoint = (request, response)=>{
    response.status(400).send({error: 'unknown endpoint'});
}

//Handler of request with unknow endpoint
app.use(unknownEndpoint);

const errorHandler = (error, request, response,next)=>{
  
  console.log(error.message);
  if(error.name === "CastError"){
    return response.status(400).send({error :'malformatted id'})
  }
  next(error)
}

//Handler of request that result in errors
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log('Application working');
})