import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import UserBadge from '../../../../UserBadge'
import arrow from '../../../../Utils/images/Sell/dashboard/merchant_dashboard/arrow.webp'
import b2b from '../../../../Utils/images/Sell/dashboard/merchant_dashboard/b2b.webp'
import b2c from '../../../../Utils/images/Sell/dashboard/merchant_dashboard/b2c.webp'
import { Link, useNavigate } from 'react-router-dom'
import hornSound from "../../../../Utils/audio/horn-sound.mp3";

function Supply() {
    const [audio] = useState(new Audio(hornSound));
    const navigate = useNavigate();

    const handleClick = (e) => {
    const target = e.target.closest(".img_container");

    if (target) {
      target.classList.add("reduceSize3");

      setTimeout(() => {
        target.classList.remove("reduceSize3");
      }, 500);

      if(e.target.closest('.b2b')){
            setTimeout(() => {
              navigate("b2b");
            }, 800);
      }else if(e.target.closest('.b2c')){
            setTimeout(() => {
              navigate("b2c");
            }, 800);
      }

      audio.play();
    } 
    }

  return (
    <Box className="supply_wrapper">
        <Box className="row">
            <Box className="col">
                <UserBadge handleBadgeBgClick={-1} handleLogin={'../login'} handleLogoutClick={'../../'} optionalcName={'align-right'}/>
            </Box>
            <Box className="col">
                <Box component="img" src={arrow} className='arrow_icon'/>
                <Box className="heading_container">
                    <Typography className="heading">Supply</Typography>
                </Box>
                <Box component="img" src={arrow} className='arrow_icon rotate'/>
            </Box>
            <Box className="col">
                <Link className="img_container" onClick={(e)=>handleClick(e)}>
                    <Box component="img" src={b2b} className='b2b'/>
                </Link>
                <Link className="img_container" onClick={(e)=>handleClick(e)}>
                    <Box component="img" src={b2c} className='b2c'/>
                </Link>
            </Box>
        </Box>
    </Box>
    )
}

export default Supply