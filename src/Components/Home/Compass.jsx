import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material'
import { Link } from 'react-router-dom';
import compass from '../../Utils/gifs/1.gif'
import hornSound from '../../Utils/audio/horn-sound.mp3'
import GPSCompassPopup from './Popups/GPSCompassPopup'

function Compass() {
  const [audio] = useState(new Audio(hornSound));
  const [openPopup, setOpenPopup] = useState(false);

  const handleClose = () => {
    setOpenPopup(false);
  };

  const handleClick = (e) => {
    e.target.parentElement.classList.add('reduceSize3');
    setTimeout(() => { 
      e.target.parentElement.classList.remove('reduceSize3') 
    }, 300);
     setTimeout(()=>{
       setOpenPopup(true);
     }, 500)
    audio.play();
  }

  return (
    <>
      <Link className='compassParent' onClick={handleClick}>
        <Box component='img' src={compass} className='compassGif' />
      </Link>
      <GPSCompassPopup open={openPopup} handleClose={handleClose} />
    </>
  )
}

export default Compass