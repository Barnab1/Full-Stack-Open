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
app.get('/api/notes',(request, response)=>{
  response.json(notes);
  console.log(notes);
})


const PORT = 3001;
app.listen(PORT,()=>{
  console.log('Even more excited');
})
  