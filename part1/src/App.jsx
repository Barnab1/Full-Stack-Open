
const Header = (props)=>{
 // console.log(props);
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props)=>{
  return(
    <p>
      {props.name} {props.exercises}
    </p>
  )
}

const Content = (props) =>{
const parts = props['parts']

  return (
    <div>
      <Part name={parts[0].name} exercises= {parts[0].exercises}/>
      <Part name={parts[1].name} exercises= {parts[1].exercises}/>
      <Part name={parts[2].name} exercises= {parts[2].exercises}/>
    </div>
  )
}


const Footer = (props) =>{
  const totalExercises = props['parts'][0].exercises + props['parts'][1].exercises + props['parts'][2].exercises;
  return (
    <p>Number of exercices {totalExercises} </p>
  )
}

const App = ()=>{

   const course =
   {
      name: 'Half Stack application development',
      parts: [
        {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
      ]
  
    }

      return (
        <div>
          <Header course = {course.name} />
          <Content parts = {course.parts} />
          <Footer parts = {course.parts} />
        </div>
      )
  }


export default App
