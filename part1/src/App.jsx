import {useState} from 'react';

const Button = ({onClick, text})=> <button onClick={onClick}>{text}</button>

const App = ()=>{
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = (numbers)=>numbers.reduce((prev, acc)=> prev + acc,0);

  const average = (impressions)=>{
  if(all(impressions) === 0){
    return 0;
  }

   return ((impressions[0] *1)+(impressions[1]*0) + impressions[2]*(-1))/all(impressions)
  }
  const positive = (impressions)=>
    { 
      if(all(impressions) === 0){
      return 0;
      }
      return impressions[0]/all(impressions)
    } 
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick ={()=>setGood(good+1)} text="good"/>
      <Button onClick ={()=>setNeutral(neutral+1)} text="neutral"/>
      <Button onClick ={()=>setBad(bad +1)} text="bad"/>

      <h2>Statistics</h2>

      <div>good {good}</div>
      <div>neutral {neutral} </div>
      <div>bad {bad}</div>
      <div>all {all([good,neutral,bad])}</div>
      <div>average {average([good,neutral,bad])} </div>
      <div>positive {positive([good, neutral, bad])} %</div>

    </div>
  )
  }


export default App
