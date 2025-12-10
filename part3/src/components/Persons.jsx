
const Persons = ({persons, eventHandler})=>{
    return (
      <div>
        {
          persons.map((person)=>
            <div key={person.id}>
              <p>{person.name} {person.number}</p>
              <Button text="Delete" eventHandler= {eventHandler(person.id)}/>
            </div>
          )
        }
      </div>
    )
      }
      
export default Persons;