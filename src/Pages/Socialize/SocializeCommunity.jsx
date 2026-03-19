import { Box, Typography, Slider } from '@mui/material'
import React from 'react'
import UserBadge from '../../UserBadge'
import bulb from '../../Utils/images/Socialize/citizens_main/socialize_community/bulb.svg'
import arrow2 from '../../Utils/gifs/arrow2.gif'

function SocializeCommunity() {
    const [rangeValues, setRangeValues] = React.useState({});
    const MIN_RANGE = 0;
    const MAX_RANGE = 5;

    const getThumbHeightPx = (v) => {
        // range: 0..5  -> height: 9px..80px (dragging DOWN increases height)
        const minH = 9;
        const maxH = 80;
        const n = Number.isFinite(Number(v)) ? Number(v) : 0;
        const clamped = Math.max(MIN_RANGE, Math.min(MAX_RANGE, n));
        const t = clamped / MAX_RANGE;
        return Math.round(minH + (maxH - minH) * t);
    };

    const handleSliderChange = (cardId, value) => {
        setRangeValues(prev => ({
            ...prev,
            [cardId]: MAX_RANGE - Number(value)
        }));
    };

    const getCardValue = (cardId) => {
        return rangeValues[cardId] || 0;
    };

    const data = [ 
        {id:1, title: 'Looking for clubbing'},
        {id:2, title: 'Looking for Rock the events'},
        {id:3, title: 'Looking for Astrology'},
        {id:4, title: 'Looking for Opposite sex'},
        {id:5, title: 'Looking for Extra income'},
        {id:6, title: 'Looking for NGO participations'},
        {id:7, title: 'Looking for Overseas'},
        {id:8, title: 'Looking for Luxury and Travelling'},
        {id:9, title: 'Looking for Daily Leisures and Workouts'},
        {id:10, title: 'Looking for Peace and Spirituality'},
    ]

  return (
    <Box className="socialize_community_wrapper">
        <Box className="row">
            <Box className="col">
                <Box></Box>
                <Box className="title_container">
                    <Typography className="title">Raise the bar</Typography>
                </Box>
                <UserBadge
                    handleLogoutClick="../../"
                    handleBadgeBgClick={-1}
                    handleLogin="login"
                />
            </Box>

            <Box className="col">
                <Box className="card_container">
                    {data?.map((card)=>{
                        const cardValue = getCardValue(card.id);
                        return <Box className="card" key={card.id}>
                        <Box
                            component="img"
                            src={bulb}
                            alt="bulb"
                            className="bulb"
                            style={{ "--bulb-level": `${Math.max(0, Math.min(1, Number(cardValue) / MAX_RANGE))}` }}
                        />
                        <Box className="text_content">
                        <Typography className="title">{card.title}</Typography>
                        <Typography className="desc">Raise the bar !</Typography>
                        </Box>

                        <Box className="range_slider_section">
                            {/* <Box component="img" src={arrow2} alt="down arrow" className="arrow_gif arrow_top" /> */}

                            <Box className="slider_shell">
                                <Slider
                                    orientation="vertical"
                                    // MUI vertical slider increases value from bottom->top by default.
                                    // We invert mapping so drag TOP->BOTTOM increases our rangeValue.
                                    value={cardValue}
                                    min={MIN_RANGE}
                                    max={MAX_RANGE}
                                    onChange={(_, v) => handleSliderChange(card.id, v)}
                                    className="mui_range_slider"
                                    style={{ "--thumb-height": `${getThumbHeightPx(cardValue)}px` }}
                                />
                            </Box>

                            {/* <Box component="img" src={arrow2} alt="up arrow" className="arrow_gif arrow_bottom" /> */}
                        </Box>
                    </Box>
                    })}
                </Box>
            </Box>
        </Box>
    </Box>
  )
}

export default SocializeCommunity