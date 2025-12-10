const CountryDisplay = ({countryInfo, weatherData})=>{
 
  console.log("Here are weatherData from CountryDisplay.jsx file: ",weatherData);

  if(!countryInfo){
    return;
  }
  /*
  console.log("Here is the country: ",countryInfo);
  console.log("Here is the weather Data from CountryDisplayComponent: ",weatherData);
*/

//Helper functions
  const kelvinToCelsius = (k)=> (k-273.15).toFixed(2);
  
   return (
     <div className="resultArea">
      
        <h2 className="country-name">{countryInfo.name.common}</h2>
        <p>Capital: {countryInfo.capital[0]}</p>
        <p>Area: {countryInfo.area}</p>

        <h3>Languages</h3>
        <ul>
            {
              Object.values(countryInfo.languages).map(language=>{
                return (
                  <li key={language}>
                    {language}
                  </li>
                )
              })
            }
        </ul>

        <div>
             <img src = {countryInfo.flags['png']} alt="country-map"/>  
        </div> 
        {
          weatherData && (
            <div>
              <h3>Weather in {weatherData.name}</h3>
              <div>
                  <p>Temperature : {kelvinToCelsius(weatherData.main.temp)} Celsius </p>
                  <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} alt="Moment Weather in country capital"/>
                  <p>Wind: {weatherData.wind.speed} m/s</p>
              </div>
            </div>
          )
        }
      </div>

  )
      
}

export default CountryDisplay;