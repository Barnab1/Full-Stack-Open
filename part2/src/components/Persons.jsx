import Button from './Button.jsx';

const Persons = ({persons, eventHandler})=>{
    return (
      <div>
        {
          persons.map((person)=>
            <div key={person.id}>
            <p>{person.name} {person.number}</p>
            <Button text="Delete" eventHandler= {eventHandler}/>
            </div>
          )
        }
      </div>
    )
      }
      
export default Persons;