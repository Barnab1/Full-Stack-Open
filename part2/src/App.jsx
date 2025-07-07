import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567'},

  ]) 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

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
    number: newNumber
  }
  setPersons(persons.concat(newNameObj));
  setNewName('');
  setNewNumber('');
  }
  }

  return (
    <div>
      <h2>Phonebook</h2>

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
        {
        persons.map(person =>
          <p key={person.name}>{person.name} {person.number}</p>
        )
        }
    </div>
  )
}


export default App ;
