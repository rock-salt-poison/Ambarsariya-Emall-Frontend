import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import UserBadge from '../../UserBadge'
import news_bg from '../../Utils/images/Socialize/city_feeds/news.webp' 
import notices_bg from '../../Utils/images/Socialize/city_feeds/notices.webp' 
import selfies_room_bg from '../../Utils/images/Socialize/city_feeds/selfies_room.webp' 
import suggestions_bg from '../../Utils/images/Socialize/city_feeds/suggestions.webp' 
import { Link, useNavigate } from 'react-router-dom'
import hornSound from '../../Utils/audio/horn-sound.mp3';

function CityFeeds() {

    const cards = [
        {id:1, title:'News !', linkTo:'', bg_img:news_bg},
        {id:2, title:'Selfies rooms !', linkTo:'', bg_img:selfies_room_bg},
        {id:3, title:'Suggestions !', linkTo:'', bg_img:suggestions_bg},
        {id:4, title:'Notices !', linkTo:'', bg_img:notices_bg},
    ]

    const navigate = useNavigate();
    const [audio] = useState(new Audio(hornSound));

    const handleClick = (e, item) =>{
        const target = e.target.closest(".card");
        if(target){
            target.classList.toggle('reduceSize3');
            audio.play();
            
            setTimeout(()=>{
                target.classList.toggle('reduceSize3');
            },300)
    
            setTimeout(()=>{
                if(target.classList.contains('feeds')){
                    navigate('../city-feeds')
                }
            }, 600)
        }
    }

    return (
        <Box className="city_feeds_wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" className='animated-border'>
                <rect
                    rx="20"
                    ry="20"
                    className="line"
                    height="100%"
                    width="100%"
                    stroke-linejoin="round"
                />
            </svg>
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
                            return <Link className="card" key={card.id} style={{background: `url(${card.bg_img}) no-repeat center`, backgroundSize:'cover'}} onClick={(e)=>handleClick(e)}>
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
                            City Feeds
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default CityFeeds