const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

app.use(express.json())
app.use(cors());

const BUILD_PATH = path.join(__dirname, 'dist'); 

// Serve the static assets (JS, CSS, images) from the 'dist' folder
app.use(express.static(BUILD_PATH)); 

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

app.get('/',(request,response)=>{
  response.send('<h1>Hello World</h1>');
})
app.get('/api/notes',(request, response)=>{
  response.json(notes);
})

const generatedId = ()=>{
  const maxId = notes.length > 0 ? 
    Math.max(...notes.map(n => Number(n.id))) : 0;
  
  return String(maxId +1);
}

app.post('/api/notes',(request, response)=>{

  //fetching the request body
  const body = request.body;

  //checking the content existence
  if(!body.content){
    return response.status(400).json({
      error: 'Content missing'
    });
  }
  
  const note = {
    content: body.content,
    important: body.important || false,
    id: generatedId()
  }


  notes = notes.concat(note);
  response.json(note)
})

app.use((request, response, next) => {
    // Check if the request is NOT for an API path (it has already failed to match API routes)
    if (!request.path.startsWith('/api')) {
        response.sendFile(path.join(BUILD_PATH, 'index.html'));
    } else {
        // If it's an API path that didn't match any route above, pass it to the 404 handler
        next();
    }
});

const unknownEndpoint = (request, response)=>{
  response.status(404).send({error: 'unknown endpoint'});
}



app.use(unknownEndpoint);





const PORT = process.env.PORT || 3001;
app.listen(PORT,()=>{
  console.log('Even more excited');
})
  