// src/components/AQIPopup.js
import React, { useState, useEffect } from 'react';
import { Box, Dialog, DialogContent, Typography } from '@mui/material';
import Calendar from '../AQIPopupComponents/Calendar';
import Sunrise_Sunset from '../AQIPopupComponents/Sunrise_Sunset';
import sunriseImg from '../../../Utils/images/sunrise.png';
import sunsetImg from '../../../Utils/images/sunset.png';
import aqiImg from '../../../Utils/images/aqi.png';
import Cube from '../AQIPopupComponents/Cube';
import AQIResult from '../AQIPopupComponents/AQIResult';
import { fetchWeatherData } from '../../../API/weathermapapi';
import { fetchAQIData } from '../../../API/AQIapi';

function AQIPopup({ open, handleClose }) {
    const [sunriseSunsetData, setSunriseSunsetData] = useState({ sunrise: null, sunset: null, temp: '' });
    const [aqiData, setAqiData] = useState('');
    const [city, setCity] = useState('Amritsar');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchWeatherData(city);
                const aqiResponse = await fetchAQIData(city);
                setSunriseSunsetData(data);

                setAqiData(aqiResponse);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        const intervalId = setInterval(fetchData, 1000); // Fetch every minute

        return () => clearInterval(intervalId); 
    });

    const ComponentList = [
        { text: "Sunrise", imgSrc: sunriseImg, imgCName: "sunriseImg", componentToRender: <Cube time={sunriseSunsetData.sunrise} temp={sunriseSunsetData.temp} /> , temp:sunriseSunsetData.temp},
        { text: "Sunset", imgSrc: sunsetImg, imgCName: "sunsetImg", optionalCname: "Sunset", componentToRender: <Cube time={sunriseSunsetData.sunset} temp={sunriseSunsetData.temp} />, temp:sunriseSunsetData.temp },
        { text: "AQI", imgSrc: aqiImg, imgCName: "aqiImg", componentToRender: <AQIResult aqi={aqiData}/> }
    ];

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            className="aqi-dialog-paper"
        >
            <DialogContent className='aqiDialogBoxContent'>
                <Box className="content">
                    <Box className="content-header">
                        <Box className='heading'>
                            <Typography component='span'>
                                Feels like
                            </Typography>
                            <Typography component="h1">
                                Amritsar
                            </Typography>
                        </Box>
                        <Box className="calendar">
                            <Calendar display="dateMonth" />
                        </Box>
                    </Box>
                    <Box className="content-body">
                        <Box className="row">
                            {ComponentList.map((item, index) => (
                                <Sunrise_Sunset
                                    key={index}
                                    text={item.text}
                                    imgSrc={item.imgSrc}
                                    imgCName={item.imgCName}
                                    optionalCname={item.optionalCname}
                                    componentToRender={item.componentToRender}
                                    temp={item.temp}
                                />
                            ))}
                        </Box>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default AQIPopup;
