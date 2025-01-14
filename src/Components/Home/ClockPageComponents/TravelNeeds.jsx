import React from 'react'
import { Box, Typography } from '@mui/material'
import clockPageNeonBg from '../../../Utils/images/clock-page-neon-shadow.png';
import axios from 'axios';

function TravelNeeds({ optionalButton, text }) {

    const fetchData = async () => {
        const options = {
        method: 'GET',
        url: 'https://espn13.p.rapidapi.com/v1/feed',
        params: {
            source: 'soccer',
            offset: '0',
            limit: '15'
        },
        headers: {
            'x-rapidapi-key': '04431b00d0mshf7009ea4b2c3c4fp1b3d08jsn8e574f277271',
            'x-rapidapi-host': 'espn13.p.rapidapi.com'
        }
    };

        try {
            const response = await axios.request(options);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }

    }
    fetchData();
    return (
        <Box className="travelWrapper">
            <Box component="img" src={clockPageNeonBg} className="neonBorderImg" alt="neon-border" />

            <Box className="travelRow">
                <Typography variant='h3'>
                    {text}
                </Typography>
                {optionalButton}
            </Box>
        </Box>
    )
}

export default TravelNeeds