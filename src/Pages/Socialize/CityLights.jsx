import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import UserBadge from '../../UserBadge'
import city_rocks_bg from '../../Utils/images/Socialize/city_lights/city_rocks.webp' 
import city_events_bg from '../../Utils/images/Socialize/city_lights/city_events.webp' 
import city_heart_beats_bg from '../../Utils/images/Socialize/city_lights/city_heart_beats.webp' 
import { Link, useNavigate } from 'react-router-dom'
import hornSound from '../../Utils/audio/horn-sound.mp3';

function CityLights() {

    const cards = [
        {id:1, title:'City Rocks !', linkTo:'', img_src:city_rocks_bg},
        {id:2, title:'City Events !', linkTo:'', img_src:city_events_bg},
        {id:3, title:'City Heart Beats !', linkTo:'', img_src:city_heart_beats_bg},
    ]

    const navigate = useNavigate();
    const [audio] = useState(new Audio(hornSound));

    const handleClick = (e, item) =>{
        const target = e.target.closest(".card");
        if(target){
            target.classList.toggle('reduceSize5');
            audio.play();
            
            setTimeout(()=>{
                target.classList.toggle('reduceSize5');
            },300)
    
            setTimeout(()=>{
                if(target.classList.contains('feeds')){
                    navigate('../city-feeds')
                }
            }, 600)
        }
    }

    return (
        <Box className="city_lights_wrapper">
            {/* <svg xmlns="http://www.w3.org/2000/svg" className='animated-border'>
                <rect
                    rx="20"
                    ry="20"
                    className="line"
                    height="100%"
                    width="100%"
                    stroke-linejoin="round"
                />
            </svg> */}
            <Box className="row">
                <Box className="col">
                    
                    <Box className="back-button-wrapper">
                        <UserBadge
                            handleLogoutClick="../../"
                            handleBadgeBgClick={-1}
                            handleLogin="login"
                        />
                    </Box>
                </Box>
                <Box className="col-auto">
                    <Box className="cards">
                        {cards?.map((card)=>{
                            return <Link className="card" key={card.id} onClick={(e)=>handleClick(e)}>
                                <Box component="img" src={card.img_src} className="card_img"/>
                                <Box className="title_container">
                                    <Typography className="title">{card.title}</Typography>
                                </Box>
                            </Link>
                        })}
                    </Box>
                </Box>
                <Box className="col-auto">
                    <Box className="heading_container">
                        <Typography className="heading">
                        City Life Around the Clock, Around the World !
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default CityLights