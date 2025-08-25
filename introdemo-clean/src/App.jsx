import {useState, useEffect} from 'react';
import Note from './components/Note';
import Notification from './components/Notification';
import noteService from './services/notes';
import Footer from './components/Footer';

const App = ()=>{

  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('A new Note...');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState("some error happened ...");

  const hook = ()=>{
     console.log('effect');
    noteService
    .getAll()
    .then((initialNotes)=>{
      console.log('Promise fulfilled');
      setNotes(initialNotes);
    })
  }

  useEffect(hook,[])

  console.log('render', notes.length, 'notes');

  const notesToShow = showAll ? notes : notes.filter((note)=> note.important);


  const addNote= (event)=>{
    event.preventDefault();

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5
    }

   noteService
    .create(noteObject)
    .then(returnedNote =>{
      setNotes(notes.concat(returnedNote));
      setNewNote(''); // clear input content after saving its previous value
    })
    
  }

  
  const handleNoteChange = (event)=>{
    console.log(event.target.value);
    setNewNote(event.target.value);
  }

  const toggleImportanceOf= (id)=>{
    console.log(`Importance of ${id} needs to be toggled`);
    const note = notes.find(n=> n.id === id);
    const changedNote = {...note, important: !note.important};

   noteService
   .update(id,changedNote)
   .then(returnedNote =>{
    setNotes(notes.map(note=> note.id === id ? returnedNote: note));
   })
   .catch(error=>{
        setErrorMessage(`Note:  '${note.content}' was already deleted from the server`);
        setTimeout(()=>{
          setErrorMessage(null);
        },5000);

        setNotes(notes.filter(n=> n.id !== id));
   })
  }

  return(
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      <div>
        <button onClick={()=> setShowAll(!showAll)}>
          show {showAll ? 'Important': 'All'}
        </button>
      </div>
      <ul>
        {
        notesToShow.map((note)=>
          <Note 
        key= {note.id} 
        note={note }
        toggleImportance = {()=>toggleImportanceOf(note.id)} 
        />)
        }
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">Save</button>
      </form>

      <Footer />
    </div>
  )
}



export default App;