import React, { useState , useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import baggageImg from '../../../Utils/images/baggageVectorImg.png'
import waitImg from '../../../Utils/images/waitImg.png'
import { fetchFlightSchedulesData } from '../../../API/flightSchedulesAPI'


const FlightTable = ({id, data}) => {

    const city = 'ATQ'
    const [flightSchedule, setFlightSchedule] = useState([]);
    console.log(data);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const flightResponse = await fetchFlightSchedulesData(city, id);
                setFlightSchedule(flightResponse);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        // const intervalId = setInterval(fetchData, 1000); // Fetch every minute

        // return () => clearInterval(intervalId); 
    });


    const convertTo12HourFormat = (time) => {
        if (!time) return "";
        const [hours, minutes] = time.split(":");
        const hour = parseInt(hours, 10);
        const period = hour >= 12 ? "PM" : "AM";
        const adjustedHour = hour % 12 || 12; // Convert 0 to 12 for 12-hour format
        return `${adjustedHour}:${minutes} ${period}`;
      };

    return (
        <Box className="flightDataContainer">
            {
                data?.map((flight, index) => (
                    <Box key={index} className="row">
                        <Box className="col">
                            <Typography>
                                <Typography variant="span">{flight.travel_from} to {flight.travel_to}</Typography>
                                <Typography variant="span"> -</Typography>
                                <Typography variant="span">{id === "Arrival"? convertTo12HourFormat(flight.arrival_time) : convertTo12HourFormat(flight.departure_time)}
                                </Typography>
                            </Typography>
                        </Box>
                        <Box className="col">
                            <Box component="img" src={baggageImg} alt="baggage" className="baggageImg" />
                        </Box>
                    </Box>
                ))
            }
        </Box>
    )
};

export default FlightTable