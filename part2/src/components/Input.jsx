
export const Input = ({text, value,onChangeHandler})=>{
  return(
    <div>
     {text} :<input type="text" value={value} onChange ={onChangeHandler} />
    </div>
  )
}

export default Input;