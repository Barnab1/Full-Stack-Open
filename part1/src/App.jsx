
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

   const course = 'Half Stack application development';

   const parts = [
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

  return (
    <div>
<Header course ={course} />

<Content informations = {[[parts[0].name,' ',parts[0].exercises],[parts[1].name,' ',parts[1].exercises],[parts[2].name,' ',parts[1].exercises]]} />

<Footer exercices = {parts[0].exercises + parts[1].exercises + parts[2].exercises} />

    </div>
  )
}


export default App
