import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import Button2 from '../../Components/Home/Button2'
import lead_generation from '../../Utils/images/Serve/unexpected/lead_generation.webp';
import suggestions from '../../Utils/images/Serve/unexpected/suggestions.webp';
import capture from '../../Utils/images/Serve/unexpected/capture.webp';
import confirmation from '../../Utils/images/Serve/unexpected/confirmation.webp';
import { Link, useNavigate } from 'react-router-dom';
import frame from '../../Utils/images/Serve/emotional/frame.webp';
import hornSound from '../../Utils/audio/horn-sound.mp3';

function Unexpected() {
    const navigate = useNavigate();
    const [audio] = useState(new Audio(hornSound));

    const data = [
        {id:1,imgSrc:lead_generation, alt:'lead generation', linkTo:'lead_generation'},
        {id:2,imgSrc:suggestions, alt:'suggestions',linkTo:'suggestions'},
        {id:3,imgSrc:capture, alt:'capture', linkTo:'capture'},
        {id:4,imgSrc:confirmation, alt:'confirmation', linkTo:'confirmation'},
    ];

    const handleClick = (e) => {
        const target = e.target.closest(".title_container");
        if(target){
            target.classList.add('reduceSize3');
            audio.play();
            setTimeout(()=>{
                target.classList.remove('reduceSize3');
                navigate('../');
            }, 500)
        }
    }

  return (
    <Box className="unexpected_wrapper">
        <Box className="row">
            <Box className="col">
                    <Button2 text="Back" redirectTo="../"/>
                    <Box className="title_container d-lg-none">
                            <Box component="img" src={frame} alt="frame" className='frame'/>
                            <Link className="heading" onClick={handleClick}>
                                <Typography className="title">Unexpected</Typography>
                            </Link>
                        </Box>
                    <Button2 text="Next" redirectTo="../unexpected"/>
                </Box>

            <Box className="container">
                <Box className="col">
                    {data.slice(0,2).map((item)=>{
                        return <Link key={item.id} className="img_link" to={item.linkTo}>
                                    <Box component="img" src={item.imgSrc} alt={item.alt} className='img'/>
                                </Link>
                    })}
                </Box>
                <Box className="col title_col">
                <Box className="title_container d-sm-none">
                        <Box component="img" src={frame} alt="frame" className='frame'/>
                        <Link className="heading" onClick={handleClick}>
                            <Typography className="title">Unexpected</Typography>
                        </Link>
                    </Box>
                </Box>
                <Box className="col">
                    {data.slice(2,5).map((item)=>{
                        return <Link key={item.id} className="img_link" to={item.linkTo}>
                            <Box component="img" src={item.imgSrc} alt={item.alt} className='img'/>
                        </Link>
                    })}
                </Box>
            </Box>
        </Box>
    </Box>
  )
}

export default Unexpected;