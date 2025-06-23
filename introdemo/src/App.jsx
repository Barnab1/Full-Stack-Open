import {useState} from 'react';

  const Button = (props)=><button onClick= {props.onClick}>{props.text}</button>
  const Display = (props)=><div>{props.value}</div>

  const App = () => {
  const [value, setValue] = useState(10)
  

  const setToValue = (newValue) => ()=> {
    console.log('value now', newValue)  // print the new value to console
    setValue(newValue)
  }
  
  return (
    <div>
      <Display value={value}/>
      <Button onClick={setToValue(1000)} text="Thousand"/>
      <Button onClick={setToValue(0)} text="reset"/>
      <Button onClick={setToValue(value+1)} text="Increment" />
    </div>
  )
}




export default App;