
const Header = (props)=>{
  
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props)=>{
  return (
    <p>
      {props.informations}
    </p>
  )
}
const Content = (props)=>{
  console.log(props);
  return (
    <div>
      <Part informations = {props.informations[0]} />
      <Part informations = {props.informations[1]} />
      <Part informations = {props.informations[2]} />
    </div>
  )
}

const Footer = (props) =>{
  return (
    <p>Number of exercices {props.exercices} </p>
  )
}

const App = ()=>{

   const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
<Header course ={course} />

<Content informations = {[['Fundamentals of React',' ',10],["Using props to pass data",' ',7],["State of a component",' ',14]]} />

<Footer exercices = {part1.exercises + part2.exercises + part3.exercises} />

    </div>
  )
}


export default App
