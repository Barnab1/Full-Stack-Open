const Hello = (props) =>{
  console.log("From Hello Component");
  return (
    <div>
      <p>Hello {props.name} and all the best for your  {props.age} birthday </p>
    </div>
  )
}

const App = ()=> {
  
  return (
    <div>
      <h1>My best Name Stand</h1> 
    </div>
  )
}

export  default App;