import { useEffect, useState } from 'react'
import countriesService from './services/countries'
import weatherService from './services/weather'
import './index.css'

function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [currentCountry, setCurrentCountry] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentWeather, setCurrentWeather] = useState(null)

  useEffect(() => {
    countriesService.getAll().then(result => {
        setCountries(result)
        setIsLoaded(true)
      })
  }, [])

  useEffect(() => {
    if (currentCountry == null) {
      setCurrentWeather(null)
      return
    }
    weatherService.getCurrentWeather(currentCountry.latlng[0], currentCountry.latlng[1])
      .then(result => setCurrentWeather(result))
      .catch(err => console.log("error fetching weather data"))
  }, [currentCountry])
  
  const handleFilter = (event) => {
    var new_filter = event.target.value
    setFilter(new_filter)
    const filtered = countries.filter(c => c.name.common.toLowerCase().includes(new_filter.toLowerCase()))
    setFilteredCountries(filtered)
    if (filtered.length == 1) showCurrentCountry(filtered[0])
  }

  const showCurrentCountry = (country) => {
    if (currentCountry !== country) setCurrentCountry(country)
  }

  return (
    <div>
      <p>find countries <input value={filter} onChange={handleFilter}/></p>
      <Loading data={countries}/>
      <ResultList isLoaded={isLoaded} filter={filter} toShow={filteredCountries} showAction={showCurrentCountry}/>
      <CountryInfo country={currentCountry} weather={currentWeather}/>
    </div>
  );
}

const Loading = ({data}) => {
  if (data == null) return(<p>data loading...</p>)
  return null
}

const ResultList = ({isLoaded, filter, toShow, showAction}) => {
  if (!isLoaded) return(<p>...loading</p>)
  if (filter.trim() === '' || toShow.length <= 1) return null
  if (toShow.length > 10) return(<p>Too many matches, specify another filter</p>)
  return (
    <div>
      {toShow.map(c => 
      <span key={c.cca2}>
        {c.name.common}
        <button onClick={() => showAction(c)}>show</button>
        <br/> 
      </span>
      )}
    </div>
  )
}

const CountryInfo = ({country, weather}) => {
  if (country == null) return null
  let langs = Object.entries(country.languages)
  return(
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}<br/>area {country.area}</p>
      <p></p>
      <p><b>languages:</b></p>
      <ul>
        {langs.map(x => <li key={x[0]}>{x[1]}</li>)}
      </ul>
      <img src={country.flags.png}/>
      <h2>Weather in {country.capital[0]}</h2>
      <Weather weather={weather}/>
    </div>
  )
}

const Weather = ({weather}) => {
  if (weather == null) return null
  return (
    <>
      <p>temperature {weather.main.temp} celcius</p>
      <img src={weatherService.getWeatherIcon(weather.weather[0].icon)} />
      <p>wind {weather.wind.speed} m/s</p>
    </>
  ); 
}

export default App;
