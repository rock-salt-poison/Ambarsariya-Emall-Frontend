// src/utils/api.js
import axios from 'axios';

export const fetchFlightSchedulesData = async (city, type) => {
    const API_KEY = import.meta.env.REACT_APP_FLIGHT_SCHEDULES_API_KEY;

  try {
    const response = await axios.get('http://localhost:3001/api/flight-schedule', {
            params: {
                access_key: API_KEY,
                iataCode: 'ATQ',
                type: type
            }
        });

        console.log(response)
    if(type=='arrival'){
    }

    // const airportNameData = await axios.get(`https://www.airport-data.com/api/ap_info.json?iata=`)

    // const { sys: {sunrise, sunset}, main: { temp, temp_min, temp_max } } = response.data;
    //     const temperature = (temp - 273.15).toFixed(0); // Convert from Kelvin to Celsius and round to 1 decimal place
    //     const minTemp = (temp_min - 273.15).toFixed(0); // Convert from Kelvin to Celsius and round to 1 decimal place
    //     const maxTemp = (temp_max - 273.15).toFixed(0); // Convert from Kelvin to Celsius and round to 1 decimal place

    //     return {
    //         sunrise: new Date(sunrise * 1000),
    //         sunset: new Date(sunset * 1000),
    //         temp: temperature, // Current temperature in Celsius
    //         minTemp: minTemp, // Minimum temperature in Celsius
    //         maxTemp: maxTemp // Maximum temperature in Celsius
    //     };
  } catch (error) {
    console.error('Error fetching flights data:', error);
    throw error;
  }
};
