import React, {useState} from 'react'
import { Box, Typography, Slider } from '@mui/material'
import radioGif from '../../Utils/gifs/2.gif'
import radio from '../../Utils/images/radio.webp'
import Marquee from './MarqueeComponent'

function RadioSong() {

    const val = "Ambarsar De Papad - By Gippy Grewal.";

    const [songName, setSongName] = useState(val);
    return (
        <Box className='radioMusicParent'>
            <Box component='img' src={radio} alt="music-player" className='radio' />
            <Box className='content'>
                <Box component='img' src={radioGif} alt="music-player" className='radioGif' />
                <Marquee text={songName} speed="30"/>
                <Slider defaultValue={50} size="small" className="slider" sx={{
                    '& .MuiSlider-thumb': {
                        width: 7, // Adjust the thumb width as needed
                        height: 7, // Adjust the thumb height as needed
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)', // Add shadow styles as needed
                      },
                }}/>
            </Box>
        </Box>
    )
}

export default RadioSong