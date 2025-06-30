import {useState} from 'react';

const Button = ({onClick, text})=> <button onClick={onClick}>{text}</button>
const DisplayVotes = (props)=> <div> Has {props.value} votes</div> 
const Display = ({text})=> <div> {text} </div>


const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];
   
  const [selected, setSelected] = useState(0);
  const [vote, setUserVote] = useState(new Array(8).fill(0));

  console.log(vote)
  /**
   * Select a random number based on array length
   */
  const randomSelecter = (array)=> Math.floor(Math.random() * array.length );

  const handleVotes = (anecdoteIndex)=>{
    let copy = [...vote];
    copy[anecdoteIndex] += 1;
    setUserVote(copy);
  }

  const mostVoted = ()=>{

let numbers = [...vote];

let maxNumber = numbers[0];
let maxIndex = 0;

for(let i = 1; i <= numbers.length; i++){
  if(numbers[i] > maxNumber){
    maxNumber = numbers[i];
    maxIndex = i;
  }
}
return maxIndex;
  }

console.log("Most voted index is: ", mostVoted());

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <DisplayVotes value={vote[selected]}/>
      <Button onClick={(e)=>handleVotes(selected)} text="vote"/>
      <Button onClick={()=> setSelected(randomSelecter(anecdotes))} text="next anecdote"/>
      
      <h2>Anecdote with most votes</h2>
      <Display text={anecdotes[mostVoted()]}/>
      <DisplayVotes value = {vote[mostVoted()]}/>
    </div>
  )
}

export default App