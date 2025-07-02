const Header = (props) => <h1>{props.courseName}</h1>

const Course = ({course})=>{
  return (
    <div>
      <Header courseName={course.name}/>
    </div>
  )
}

//const Total = (props) => <p>Number of exercises {props.total}</p>


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

export default App
