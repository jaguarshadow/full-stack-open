import axios from 'axios'
const api_key = process.env.REACT_APP_API_KEY
const baseUrl='https://api.openweathermap.org/data/2.5'

const getCurrentWeather = (lat, lon) => {
    const request = axios.get(`${baseUrl}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`)
    return request.then(response => response.data)
}

const getWeatherIcon = (icon) => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`
}

export default { getCurrentWeather, getWeatherIcon }