import React, { useState, useEffect} from 'react'
import { Box, Typography } from '@mui/material';
import aqiImg from '../../../Utils/images/aqi2.jfif';
import CircularText from '../CircularText';

function AQIResult({aqi}) {
    const [airQuality, setAqiQuality] = useState('');

    useEffect(() => {
        function getAqiType(aqiValue) {
            if (aqiValue >= 0 && aqiValue <= 50) {
                return 'Good';
            } else if (aqiValue > 50 && aqiValue <= 100) {
                return 'Moderate';
            } else if (aqiValue > 100 && aqiValue <= 200) {
                return 'Unhealthy';
            } else if (aqiValue > 200 && aqiValue <= 300) {
                return 'Very Unhealthy';
            } else if (aqiValue > 300 && aqiValue <= 500) {
                return 'Hazardous';
            } 
        }

        if (aqi) {
            const aqiType = getAqiType(aqi);
            setAqiQuality(aqiType);
        } else {
            setAqiQuality('');
        }
    }, [aqi]);

    // Render only if 'aqi' is truthy
    if (!aqi) return null;

    return (
        <Box className="aqiweather">
            <Box className='weatherType'>
                <CircularText text={airQuality}  />
            </Box>

            <Box className="container">
                <Box component='img' src={aqiImg} className='aqiImg2' />
                <Typography className='aqiNumber'>{aqi}</Typography>
            </Box>
        </Box>
    )
}

export default AQIResult
