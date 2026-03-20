import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import UserBadge from '../../UserBadge'
import city_campus from '../../Utils/images/Socialize/city_lights/city_rocks/city_campus.webp' 
import city_future from '../../Utils/images/Socialize/city_lights/city_rocks/city_future.webp' 
import youth_and_pop_culture from '../../Utils/images/Socialize/city_lights/city_rocks/youth_and_pop_culture.webp' 
import food_cafes_and_night_life from '../../Utils/images/Socialize/city_lights/city_rocks/food_cafes_and_night_life.webp' 
import insights_icon from '../../Utils/images/Socialize/city_lights/city_rocks/insights_icon.webp' 
import spotlights from '../../Utils/images/Socialize/city_lights/city_rocks/spotlights.webp' 
import city_rocks from '../../Utils/images/Socialize/city_lights/city_rocks/city_rocks_bg.webp' 

import { Link, useNavigate } from 'react-router-dom'
import hornSound from '../../Utils/audio/horn-sound.mp3';

function CityRocks() {

    const cards = [
        {id:1, title:'Spotlights', linkTo:'', cName:'spotlights'},
        {id:2, title:'City Buzz', linkTo:'', cName:'city_buzz'},
        {id:3, title:'Community Spotlights', linkTo:'', cName:'community'},
        {id:4, title:'Insights', linkTo:'', img_src:insights_icon, cName:'insights'},
        {id:5, linkTo:'', img_src:youth_and_pop_culture, cName:'youth_pop'},
        {id:6, linkTo:'', img_src:food_cafes_and_night_life, cName:'food_cafes'},
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
        <Box className="city_rocks_wrapper">
            <Box className="row">
                <Box className="col">
                    <Box></Box>
                    <Box className="heading_container">
                        <Typography className="heading">
                            City Rocks
                        </Typography>
                    </Box>
                    <UserBadge
                        handleLogoutClick="../../"
                        handleBadgeBgClick={-1}
                        handleLogin="login"
                    />
                </Box>
                <Box className="col">
                    <Box className="cards">
                        {cards?.map((card)=>{
                            return <Link className={`${card.cName} card`} key={card.id} onClick={(e)=>handleClick(e)}>
                                {card?.img_src && <Box component="img" src={card.img_src} className="card_img"/>}
                                {card?.title && <Box className="title_container">
                                    <Typography className="title">{card.title}</Typography>
                                </Box>}
                            </Link>
                        })}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default CityRocks