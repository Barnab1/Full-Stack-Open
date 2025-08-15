import { useState, useEffect } from 'react'
import personService from './services/persons';
import Button from './components/Button.jsx';
import Input from './components/Input.jsx';

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
    //console.log('start');
    personService.getAll()
    .then(personsData=>{
      setPersons(personsData);
      setFilteredPersons(personsData)
    })
  }

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
  
  const exPersonObj = persons.find((person)=>person.name === newName);

  if(exPersonObj){

  const {id, name, number} = exPersonObj;
  console.log("Person Object found: ", exPersonObj);

   const updateNumber = window.confirm(`${newName} is already added to phonebook, replace the old number with the new one`);

    if(updateNumber){
      const person = persons.filter(person=> person.id === id);
      const changedPerson = { ...person, name: newName, number: newNumber};

      personService
      .update(id, changedPerson)
      .then(returnedPerson =>{
        console.log("Returned Person object: ",returnedPerson);
        setPersons(persons.map(person=> person.id === id ? returnedPerson: person));
      })
    }
  }else{
  const newNameObj = {
    name: newName,
    number: newNumber
  }

personService.create(newNameObj)
.then((newlyCreatedObj)=>{

  setPersons(persons.concat(newlyCreatedObj));
  setFilteredPersons(persons.concat(newlyCreatedObj));
  setNewName('');
  setNewNumber('');
})

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
  
const clearPerson= (personObj)=>{

  const {id, name} = personObj;
  console.log(`Id ${id} got clicked`);
  const proceed = window.confirm(`Delete ${name} ?`);
  if(proceed){
    personService.deleteEntry(id);
    setPersons(persons.filter(person=> person.id !== id));
    setFilteredPersons(filteredPersons.filter(person=> person.id !== id));
  }else{
    return;
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
       <div>
              {
                filteredPersons.map((person)=>
                  <div key={person.id}>
                    <p>{person.name} {person.number}</p>
                    <Button text="Delete" eventHandler= {()=> clearPerson(person)}/>
                  </div>
                )
              }
            </div>
    </div>
  )


  }

export default App ;
