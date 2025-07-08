import { useState } from 'react'

const App = () => {
   const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const [filteredPersons, setFilteredPersons] = useState(persons);

  const handleNewName = (event)=>{
    console.log(event.target.value);
    setNewName(event.target.value);
  }
  
   const handleNewNumber = (event)=>{
    console.log(event.target.value);
    setNewNumber(event.target.value);
  }

  const add = (event)=>{

  event.preventDefault();
  const findNameAdded = persons.find((person)=>person.name === newName);

  if(findNameAdded){
    alert(`${newName} is already added to phonebook`);
    return;
  }else{
  const newNameObj = {
    name: newName,
    number: newNumber,
    id: persons.length +1
  }

  const updated = persons.concat(newNameObj) ;
  setPersons(updated);
  setFilteredPersons(updated);

  setNewName('');
  setNewNumber('');
  }
  }



  const filterResult = (event)=>{

    const search = event.target.value.toLowerCase();

    if(search == ""){
      setFilteredPersons(persons);
    }else{
      const filtered = persons.filter((person)=>
        person.name.toLowerCase().includes(search)
      );

      setFilteredPersons(filtered);
    }
  } 
  
  return (
    <div>
      <h1>Phonebook</h1>

      <div>
        Filter shown with 
        <input type="text"  onChange={filterResult}/>
      </div>

    <h2>Add a new </h2>
      <form>

        <div>

          Name: <input type="text" value={newName} onChange={handleNewName}/>
        </div>

        <div>
          Number: <input  value={newNumber} onChange={handleNewNumber} />
        </div>

        <div>
          <button type="submit" onClick={add}>add</button>
        </div>

      </form>

      <h2>Numbers</h2>

      <div>
        {
        filteredPersons.map(person =>
          <p key={person.name}>{person.name} {person.number}</p>
        )
        }
        </div>
    </div>
  )


  }

export default App ;
