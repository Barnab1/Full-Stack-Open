import {useState} from 'react';


const History = ({allClicks}) =>{
  if(allClicks.length === 0){
    return (
      <div>The App is used by pressing the buttons</div>
    )
  } 
  return (
    <p>Button press History : {allClicks.join(' ')} </p>
  )
}

const Button = ({onClick, text}) => <button onClick = {onClick}>{text}</button>
const App = () =>{

const [left, setLeft]= useState(0);
const [right, setRight]= useState(0);
const [allClicks, setAll] = useState([]);
const [total, setTotal] = useState(0);

const handleLeftClick = ()=>{
  setAll(allClicks.concat('L'));
  const updatedLeft = left + 1;
  setLeft(updatedLeft);
  setTotal(updatedLeft + right)
}

const handleRightClick = ()=>{
  setAll(allClicks.concat('R'));
  const updatedRight = right +1;
  setRight(updatedRight);
  setTotal(updatedRight + left);
}
 
  return (
    <div>
      {left}
      <Button onClick = {handleLeftClick} text = "Left"/>
      <Button onClick = {handleRightClick} text = "Right"/>
      {right} 
      <History allClicks = {allClicks}/>
      <p>Total of clicks : {total} </p>
    </div>
  )
}

export default App;