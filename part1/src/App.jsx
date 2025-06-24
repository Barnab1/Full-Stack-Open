import {useState} from 'react';

const Button = ({onClick, text})=> <button onClick={onClick}>{text}</button>

const StatisticLine = ({text, value})=>{
  return <div>{text}: {value}</div>
}
const Statistics = (props)=>{

  let good = props.good;
  let neutral = props.neutral;
  let bad = props.bad;

  if(good === 0 & neutral === 0 & bad === 0){
    return (
      <div>No feedback given</div>
    )
  }

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
      return `${impressions[0]/all(impressions)} %`;
    }

  return (
    <div>
      <h2>Statistics</h2>
      <StatisticLine text="good" value = {good}/>
      <StatisticLine text="neutral" value = {neutral}/>
      <StatisticLine text="bad" value = {bad}/>
      <StatisticLine text="all" value = {all([good,neutral,bad])}/>
      <StatisticLine text="average" value = {average([good,neutral,bad])}/>
      <StatisticLine text="positive" value = {positive([good,neutral,bad])}/>
    </div>
  )
}

const App = ()=>{
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

 
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick ={()=>setGood(good+1)} text="good"/>
      <Button onClick ={()=>setNeutral(neutral+1)} text="neutral"/>
      <Button onClick ={()=>setBad(bad +1)} text="bad"/>

      <Statistics good={good} neutral={neutral} bad={bad}/>
       

    </div>
  )
  }


export default App
