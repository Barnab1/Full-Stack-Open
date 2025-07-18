import { useState, useEffect } from 'react'
import axios from 'axios';
import Button from './components/Button.jsx';
import Input from './components/Input.jsx';
import Persons from './components/Persons.jsx';

const SearchFilter = ({onChangeFunction}) =>{
  return(
    <div>
        Filter shown with 
        <input type="text"  onChange={onChangeFunction} />
    </div>
  )
}

const App = () => {
  
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filteredPersons, setFilteredPersons] = useState([]);

  const hook=()=>{
    console.log('start');
    axios
    .get('/persons')
    .then(response=>{
      console.log(response.data)
      console.log('Promise fulfilled');
      setPersons(response.data);
      setFilteredPersons(response.data)
    })
  }

  console.log('persons are ', persons.length, ' long');
useEffect(hook,[]);

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
    event.preventDefault();
    
  if(newName == ''){
    alert('Name cannot be empty');
    return;
  }
  
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
      <form onSubmit={add}>
        <Input text = 'Name' value = {newName} onChangeHandler = {handleNewName} />
        <Input text = 'Number' value = {newNumber} onChangeHandler = {handleNewNumber} />
        <Button text="add"/>
      </form>
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />
    </div>
  )


  }

export default App ;
