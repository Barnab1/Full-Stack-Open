import { useState, useEffect } from 'react';
import axios from 'axios';
import Display from './components/Display.jsx';

const App = ()=> {

  const [countryName, setCountryName] = useState('');
  const [countryInfos, setCountryInfos] = useState([]);

  //state for managing weather data

  const [weatherData, setWeatherData] = useState(null);

  //WeatherData key
  
  const api_key = import.meta.env.VITE_SOME_KEY

  //export VITE_SOME_KEY=keyvalue && npm run dev // For Linux/macOS Bash

  //First useEffect, triggers on countryName
  useEffect(()=>{
    console.log('Started queries...');

    //setting the weatherData to null when there is nothing to show
    
    setWeatherData(null);

    if(countryName){
      axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response=>{

        const filteredCountries = response.data.filter(country=>{
          return country.name.common.toLowerCase().includes(countryName.toLowerCase());
        })

        console.log("Here are filtered countries: ",filteredCountries);
        setCountryInfos(filteredCountries);
      })
      .catch(error=>{

        console.log('An error happened');
        setCountryInfos(`There is nothing to show`);

      })
    }
  },[countryName])


  //second UseEffect, triggers when a single country is visible
  useEffect(()=>{
    if(countryInfos.length === 1){
    const country = countryInfos[0];

    //Handle countries without capital
    const capital = country.capital && country.capital.length > 0 ? country.capital[0]:null;

    console.log(`Capital from App components`, capital);

    if(!capital){
      setWeatherData(
        {
          error: 'No capital defined for this country'
        }
      );
      return;
    }

    //Reset state before new request

    setWeatherData(null);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${api_key}`;
    axios.get(url)
    .then(response=>{
      console.log("Data fetched", response.data);
      setWeatherData(response.data);
    })
    .catch((error)=>{
      console.log('Error fetching weather data:', error );
      setWeatherData({error: 'Could not fetch Weather data'});
    })
  }
  },[countryInfos])
  

  const onSearch = (event)=>{
    if(event.target.value === ""){
      return;
    }
    setCountryName(event.target.value);
  }

  return (

    <div>
      <form>
        <label>Find countries: </label>
        <input type="text" onChange={onSearch}/>
      </form>
    {
      
      <Display 
      countryInfos={countryInfos}
      setCountryInfos= {setCountryInfos}
      weatherData={weatherData}
      />  
    }
    </div>
  )

  }

export default App ;
