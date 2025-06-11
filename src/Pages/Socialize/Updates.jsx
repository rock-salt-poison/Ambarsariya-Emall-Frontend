import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import UserBadge from '../../UserBadge'
import { Link, useNavigate } from 'react-router-dom'
import VideoPlayer from '../../Components/MerchantWrapper/VideoPlayer'
import updates_bg from '../../Utils/videos/updates_bg.mp4';
import StarIcon from '@mui/icons-material/Star';

function Updates() {

    const navigate = useNavigate();

    return (
        <Box className="updates_wrapper">
            <VideoPlayer
                url={updates_bg}
                autoplay={true}
                controls={false}
                muted={true}
                loop={true}
            />
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
                <Link className="col-auto" to='../city-lights'>
                    <Box className="heading_container">
                        <Typography variant="h3" className="heading text">up</Typography>
                        <Typography variant="h3" className="heading">-</Typography>
                        <Typography variant="h3" className="heading text">coming</Typography>
                    </Box>
                    <Box className="stars">
                        <StarIcon/>
                        <StarIcon/>
                        <StarIcon/>
                        <StarIcon/>
                        <StarIcon/>
                    </Box>
                    <Box className="title_container">
                        <Typography className="title">City Lights</Typography>
                    </Box>
                </Link>
                
            </Box>
        </Box>
    )
}

export default Updates