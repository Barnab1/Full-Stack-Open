import { useState } from 'react'
import SearchFilter from './components/SearchFilter.jsx';
import Persons from './components/Persons.jsx';


const Input = ({text, value,onChangeHandler})=>{
  return(
    <div>
     {text} :<input type="text" value={value} onChange ={onChangeHandler} />
    </div>
  )
}
const Button = ({text, onClickHandler})=>{
  return(
    <div>
      <button onClick ={onClickHandler}>{text}</button>
    </div>
  )
}

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

  /**
   * Add new user
   */
  const add = (event)=>{
  if(newName == ''){
    alert('Name cannot be empty');
    return;
  }
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


/**
 * Filter users
 */
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
      <h2>Phonebook</h2>
    <SearchFilter onChangeFunction = {filterResult} /> 
    <h3>Add a new </h3>
      <form>
        <Input text = 'Name' value = {newName} onChangeHandler = {handleNewName} />
        <Input text = 'Number' value = {newNumber} onChangeHandler = {handleNewNumber} />
        <Button text="add" OnclickHandler={add} />
      </form>
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />
    </div>
  )


  }

export default App ;
