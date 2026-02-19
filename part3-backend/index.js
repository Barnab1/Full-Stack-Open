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

app.get('/api/notes/:id', (request, response)=>{
  Note.findById(request.params.id)
  .then(note=>{
    response.json(note);
  })
  .catch(error=>{
    response.json(`Note not found`);
  })
})
/**generatedId() 
 * 
 * Helper function used to generate new inserted note Id
*/
const generatedId = ()=>{
  const maxId = notes.length > 0 ? 
    Math.max(...notes.map(n => Number(n.id))) : 0;
  
  return String(maxId +1);
}

/**Note posting function */
app.post('/api/notes',(request, response)=>{

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


  note.save().then(savedNote=>{
    response.json(savedNote);
  })
})

const unknownEndpoint = (request, response)=>{
  response.status(404).send({error: 'unknown endpoint'});
}

app.use(unknownEndpoint);

const PORT = config.PORT;
app.listen(PORT,()=>{
  console.log('Everything works correctly 😊');
})