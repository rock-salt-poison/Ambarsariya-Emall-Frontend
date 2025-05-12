import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import Button2 from '../../../Components/Home/Button2'
import personality from '../../../Utils/images/Serve/emotional/Personality.webp'
import community from '../../../Utils/images/Serve/emotional/Community.webp'
import ranking from '../../../Utils/images/Serve/emotional/Ranking.webp'
import { Link, useNavigate } from 'react-router-dom';
import hornSound from '../../../Utils/audio/horn-sound.mp3';
import UserBadge from '../../../UserBadge';

function EmotionalMember() {
    const navigate = useNavigate();
    const [ audio ] = useState(new Audio(hornSound));
    const data = [
        { id: 1, imgSrc: personality, alt: 'personality', linkTo: '', heading:'Personality' },
        { id: 2, imgSrc: community, alt: 'community', linkTo: 'community', heading:'Community' },
        { id: 2, imgSrc: ranking, alt: 'ranking', linkTo: '', heading:'Ranking' },
        
    ];
    
    const handleClick = (e, linkTo) => {
        const target = e.target.closest(".title_container") || e.target.closest(".card");
        
        if (target) {
            target.classList.add('reduceSize3');
            audio.play();
            
            setTimeout(() => {
                target.classList.remove('reduceSize3');
            }, 300);
            setTimeout(() => {
                if (linkTo) {
                    navigate(linkTo);
                }else{
                    navigate('../')
                }
            }, 600);
        }
    };

    return (
        <Box className="member_emotional_wrapper">
            <Box className="row">
                <Box className="col">
                    <Box className="d-sm-none"></Box>
                    {/* <Button2 text="Back" redirectTo="../" /> */}
                    <Box className="title_container">
                        <Link className="heading" onClick={(e)=>handleClick(e)}>
                            <Typography className="title">Emotional</Typography>
                        </Link>
                    </Box>
                    {/* <Button2 text="Next" redirectTo="../unexpected" /> */}
                    <UserBadge
                            handleBadgeBgClick={`../`}
                            handleLogin="../login"
                            handleLogoutClick="../../AmbarsariyaMall"
                        />
                </Box>
                <Box className="col">
                    {
                        data?.map((card)=>{
                            return <Link className="card" onClick={(e)=>handleClick(e, card.linkTo)}>
                                <Box component="img" src={card.imgSrc} alt={card.alt} className="card_img"/>
                                <Box className="card_heading">
                                    <Typography className="heading" variant="h3">
                                        {card.heading}
                                    </Typography>
                                </Box>
                            </Link>
                        })
                    }
                </Box>
            </Box>
        </Box>
    )
}

export default EmotionalMember