export const Button = ({text, eventHandler})=>{
  return(
    <div>
      {
      eventHandler ?
      <button type="submit" onClick ={eventHandler} >{text}</button>:
      <button type="submit" >{text}</button>
     }
      
    </div>
  )
}

export default Button;