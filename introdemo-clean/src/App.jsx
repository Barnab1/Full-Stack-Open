import {useState, useEffect} from 'react';
import axios from 'axios';
import Note from './components/Note';


const App = ()=>{

  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('A new Note...');
  const [showAll, setShowAll] = useState(true);

  const hook = ()=>{
     console.log('effect');
    axios
    .get('/notes')
    .then((response)=>{
      console.log('Promise fulfilled');
      setNotes(response.data)
    })
  }

  useEffect(hook,[])

  console.log('render', notes.length, 'notes');

  const notesToShow = showAll ? notes : notes.filter((note)=> note.important);


  const addEvent= (event)=>{
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: String(notes.length + 1)
    }

    setNotes(notes.concat(noteObject));
    setNewNote(''); // clear input content after saving its previous value
  }

  const handleNoteChange = (event)=>{
    console.log(event.target.value);
    setNewNote(event.target.value);
  }
  return(
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={()=> setShowAll(!showAll)}>
          show {showAll ? 'Important': 'All'}
        </button>
      </div>
      <ul>
        {
        notesToShow.map((note)=>
          <Note key= {note.id} note={note} />)
        }
      </ul>
      <form onSubmit={addEvent}>
        <input value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}



export default App;