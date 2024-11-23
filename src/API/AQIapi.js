// src/utils/api.js
import axios from 'axios';

export const fetchAQIData = async (city) => {
    const API_KEY = process.env.REACT_APP_AQI_API_KEY;
  try {
    const response = await axios.get(`https://api.waqi.info/feed/${city}/?token=${API_KEY}`);

    const { aqi } = response.data.data;
        return aqi;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
