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

        const { main: { temp }, weather } = response.data;
        const temperature = (temp - 273.15).toFixed(0); // Convert from Kelvin to Celsius and round to 1 decimal place
        const weatherType = weather[0].description; // Assuming you want the main weather type, e.g., "Clouds", "Rain", etc.

        return {
            temp: temperature, // Current temperature in Celsius
            type: weatherType // Weather description
        };
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
};
