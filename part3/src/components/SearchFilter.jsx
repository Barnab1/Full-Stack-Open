const SearchFilter = ({onChangeFunction}) =>{
  return(
    <div>
        Filter shown with 
        <input type="text"  onChange={onChangeFunction} />
    </div>
  )
}

export default SearchFilter;