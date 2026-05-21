/**index.js
 * 
 * This is the back end side of the App
 * which is connected through the note.js interface 
 * to the Mongo Database
 */

import config from '../part3-backend/src/utils/config.js';

import express from 'express';
import cors from 'cors';

import Note from '../part3-backend/models/note.js';


const app = express();

app.use(express.json())
app.use(cors());


/**Notes were used the first time since they were hardcoded */
let notes = [
  {
    id: 1,
    content: "I love Paris",
    important: true
  },
   {
    id: 2,
    content: "He loves Paris",
    important: true
  },

  {
    id: 3,
    content: "We loves Paris",
    important: true
  }
]

const requestLogger = (request, response, next)=>{
  console.log('Method: ', request.method);
  console.log('Path: ', request.path);
  console.log('Body: ', request.body);
  console.log('---');
  next();
}

app.use(requestLogger);

/**Index Page */
app.get('/',(request,response)=>{
  response.send('<h1>Hello World</h1>');
})

/**Notes Pages */
app.get('/api/notes',(request, response)=>{
  Note.find({}).then(notes=> response.json(notes))
})

/** Specific Id finding*/

app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).json({ error: 'note not found' });
      }
    })
    .catch(error => next(error));
});

/**Note posting function */
app.post('/api/notes',(request, response,next)=>{

  //fetching the request body
  const body = request.body;

  //checking the content existence
  if(!body.content){
    return response.status(400).json({
      error: 'Content missing'
    });
  }
  
const note = new Note({
  content: body.content,
  important: body.important || false
})


  note.save()
      .then(savedNote=>{
    response.json(savedNote);
  })  .catch(error=> next(error))
})

/**Note deletion */
app.delete('/api/notes/:id',(request,response, next)=>{
  Note.findByIdAndDelete(request.params.id)
      .then(result=> response.status(204).end())
      .catch(error=>next(error))
})

/**Note updating */
app.put('/api/notes/:id', (request, response, next) => {
  const { content, important } = request.body;

  Note.findByIdAndUpdate(request.params.id)
    .then(note => {
      if (!note){
        response.status(404).json({ error: 'note not found' });
      }
      note.content = content;
      note.important = important;

      note.save().then(updatedNote=>response.json(updatedNote));
    })
    .catch(error => next(error));
});

/**
 * Error Handler
 */
const unknownEndpoint = (request, response)=>{
  response.status(404).send({error: 'unknown endpoint'});
}

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next)=>{
  console.log(error.message);
  if(error.name === "CastError"){
    return response.status(400).send({error: 'malformatted id'});
  }else if(error.name === "ValidationError"){
    return response.status(400).json({error: error.message})
  }
  next(error);
}

app.use(errorHandler);

const PORT = config.PORT;
app.listen(PORT,()=>{
  console.log('Everything works correctly 😊');
})