import React, { useState } from 'react'
import { Box } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import hornSound from '../Utils/audio/horn-sound.mp3'
import gatelogo from '../Utils/images/gatelogo.webp';

function Logo() {

    const navigate = useNavigate();
    const [audio] = useState(new Audio(hornSound));

    const handleClick = (e) => {
        const target = e.target.closest('.logo_container');
        if(target){
            target.classList.add('reduceSize3');
            audio.play();
            setTimeout(()=>{
                target.classList.remove('reduceSize3');
                
            },300);
            setTimeout(()=>{
                navigate('../../AmbarsariyaMall');
            },500);
        }
    }

  return (
    <Box className="logo_wrapper">
        <Link className='logo_container' onClick={handleClick}>
            <Box component="img" src={gatelogo} alt="Ambarsariya Mall" className='logo'/>
        </Link>
    </Box>
  )
}

export default Logo