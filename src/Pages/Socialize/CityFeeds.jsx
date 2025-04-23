import React from 'react'
import { Box, Typography } from '@mui/material'
import UserBadge from '../../UserBadge'
import news_bg from '../../Utils/images/Socialize/city_feeds/news.webp' 
import notices_bg from '../../Utils/images/Socialize/city_feeds/notices.webp' 
import selfies_room_bg from '../../Utils/images/Socialize/city_feeds/selfies_room.webp' 
import suggestions_bg from '../../Utils/images/Socialize/city_feeds/suggestions.webp' 
import { Link } from 'react-router-dom'

function CityFeeds() {

    const cards = [
        {id:1, title:'News !', linkTo:'', bg_img:news_bg},
        {id:2, title:'Selfies rooms !', linkTo:'', bg_img:selfies_room_bg},
        {id:3, title:'Suggestions !', linkTo:'', bg_img:suggestions_bg},
        {id:4, title:'Notices !', linkTo:'', bg_img:notices_bg},
    ]

    return (
        <Box className="city_feeds_wrapper">
            <svg xmlns="http://www.w3.org/2000/svg">
        <rect
          rx="4"
          ry="4"
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
                            handleLogoutClick="../../AmbarsariyaMall"
                            handleBadgeBgClick={-1}
                            handleLogin="login"
                        />
                    </Box>
                </Box>
                <Box className="col-auto">
                    <Box className="cards">
                        {cards?.map((card)=>{
                            return <Box className="card" key={card.id} sx={{background: `url(${card.bg_img}) no-repeat center`}}>
                                <Link className="title_container">
                                    <Typography className="title">{card.title}</Typography>
                                </Link>
                            </Box>
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