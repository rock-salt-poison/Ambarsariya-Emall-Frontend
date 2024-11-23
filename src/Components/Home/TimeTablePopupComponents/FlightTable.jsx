import React, { useState , useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import baggageImg from '../../../Utils/images/baggageVectorImg.png'
import waitImg from '../../../Utils/images/waitImg.png'
import { fetchFlightSchedulesData } from '../../../API/flightSchedulesAPI'

const flightData = [
    { destination: 'ATR Singapore to ASR', time: '05:30 PM', baggageImg: baggageImg },
    { destination: 'ATR Singapore to ASR', time: '05:30 PM', baggageImg: waitImg },
    { destination: 'ATR Singapore to ASR', time: '05:30 PM', baggageImg: baggageImg },
    { destination: 'ATR Singapore to ASR', time: '05:30 PM', baggageImg: baggageImg },
    { destination: 'ATR Singapore to ASR', time: '05:30 PM', baggageImg: baggageImg },

];

const FlightTable = (id) => {

    const city = 'ATQ'
    const [flightSchedule, setFlightSchedule] = useState([]);

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


    return (
        <Box className="flightDataContainer">
            {
                flightData.map((flight, index) => (
                    <Box key={index} className="row">
                        <Box className="col">
                            <Typography>
                                <Typography variant="span">{flight.destination}</Typography>
                                <Typography variant="span">-</Typography>
                                <Typography variant="span">{flight.time}</Typography>
                            </Typography>
                        </Box>
                        <Box className="col">
                            <Box component="img" src={flight.baggageImg} alt="baggage" className="baggageImg" />
                        </Box>
                    </Box>
                ))
            }
        </Box>
    )
};

export default FlightTable