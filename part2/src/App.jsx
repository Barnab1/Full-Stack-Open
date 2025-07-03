const Header = ({courseName}) => <h1>{courseName}</h1>

const Course = ({course})=>{
  return (
    <div>
      <Header courseName={course.name}/>
      <Content parts = {course.parts}/>
    </div>
  )
}

//const Total = (props) => <p>Number of exercises {props.total}</p>
const Part = ({part})=>{
  return (
        <div>
          <span>{part.name} </span>

          <span> {part.exercises}</span>
        </div>)
}

const Content = ({parts})=>{
  return (
    <div>
      {
      parts.map((part)=>
        <Part key={part.id} part={part}/>
      )}
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id:1
      },
      {
        name: 'Using props to pass data',
        exercises: 7, 
        id:2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id:3
      },
    ],
  }

  return <Course course={course}/>
}

export default App ;
