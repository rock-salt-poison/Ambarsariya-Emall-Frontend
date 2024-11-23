import { Box, Typography } from '@mui/material'
import React from 'react';

function Sunrise_Sunset({ text, imgSrc, imgCName, optionalCname, componentToRender, temp }) {

    return (
        <Box className="col">
            <Box className='wrapper-one'>
                <Box component='img' src={imgSrc} alt='shadow' className={imgCName} />
                <Box className={`text ${optionalCname}`}>
                    <Box>
                    {text.split('').map((letter, index) => (
                        <Typography
                            component='span'
                            key={index}
                            className={`${text}-${index}`}
                        >
                            {letter}
                        </Typography>
                    ))}

                    </Box>
                    <Typography>{temp && `${temp}°C`}</Typography>
                </Box>

            </Box>
            <Box className='wrapper-two'>
                {componentToRender}
            </Box>

        </Box>
    )
}

export default Sunrise_Sunset