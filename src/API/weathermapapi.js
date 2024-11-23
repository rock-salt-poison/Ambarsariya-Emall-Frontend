// src/utils/api.js
import axios from 'axios';

export const fetchWeatherData = async (city) => {
    const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        q: city,
        appid: API_KEY
      }
    });

    const { sys: {sunrise, sunset}, main: { temp, temp_min, temp_max } } = response.data;
        const temperature = (temp - 273.15).toFixed(0); // Convert from Kelvin to Celsius and round to 1 decimal place
        const minTemp = (temp_min - 273.15).toFixed(0); // Convert from Kelvin to Celsius and round to 1 decimal place
        const maxTemp = (temp_max - 273.15).toFixed(0); // Convert from Kelvin to Celsius and round to 1 decimal place

        return {
            sunrise: new Date(sunrise * 1000),
            sunset: new Date(sunset * 1000),
            temp: temperature, // Current temperature in Celsius
            minTemp: minTemp, // Minimum temperature in Celsius
            maxTemp: maxTemp // Maximum temperature in Celsius
        };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
