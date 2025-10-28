const express = require('express');
const app = express();

app.use(express.json())

let notes = [
  {
    id: 1,
    note: "I love Paris",
    important: "True"
  },
   {
    id: 2,
    note: "He loves Paris",
    important: "True"
  },

  {
    id: 3,
    note: "We loves Paris",
    important: "True"
  }
]

app.get('/',(request,response)=>{
  response.send('<h1>Hello World</h1>');
})
app.get('/api/notes',(request, response)=>{
  response.json(notes);
  console.log(notes);
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


const PORT = 3001;
app.listen(PORT,()=>{
  console.log('Even more excited');
})
  