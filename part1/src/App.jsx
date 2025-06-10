  const course = 'Hallf Stack application develpment';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Usings props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

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
  return (
    <div>
      <Part informations = {[part1," ",exercises1]}/>
      <Part informations = {[part2," ",exercises2]}/>
      <Part informations = {[part3," ",exercises3]}/>
    </div>
  )
}

const Footer = (props) =>{
  return (
    <p>Number of exercices {props.exercices} </p>
  )
}

const App = ()=>{


  return (
    <div>
<Header course ={course} />

<Content />

<Footer exercices = {exercises1 + exercises2 + exercises3} />

    </div>
  )
}


export default App
