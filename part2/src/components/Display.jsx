import CountryDisplay from './CountryDisplay.jsx';

const Display = ({countryInfos, setCountryInfos, weatherData})=>{

  //This component is a pure function
  // Which decide what to show based on its info props

  console.log('Infos is ', countryInfos.length, ' long')
  console.log("Here is what infos contain: ",countryInfos);
 
  if(typeof countryInfos == 'string')
  {
    return <p>{countryInfos}</p>
  }
  
  if(countryInfos.length === 0) {
    return <p>Nothing to show</p>;
  }
  
  if(countryInfos.length > 1 && countryInfos.length <= 10){

    return(
      <ul>
        {countryInfos.map((info)=>{
          return (
        <li key={info.name.common}>
          <span>{info.name.common} </span>  
          <button
          type="button"
          //Filter the existing list down to the clicked one
          onClick={()=>setCountryInfos([info])}
          >
            Show 
          </button>
        </li>
          )
    })}
    </ul>
    )
  }

  if(countryInfos.length === 1){
    const countryInfo = countryInfos[0];
    
    return <CountryDisplay countryInfo={countryInfo} weatherData={weatherData} />

}

  return(
    <p>Too many matches, specify another filter</p>
  )

}

export default Display;