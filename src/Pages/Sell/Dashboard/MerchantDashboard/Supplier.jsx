import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import UserBadge from '../../../../UserBadge'
import supplier_monitoring_dashboard from '../../../../Utils/images/Sell/dashboard/merchant_dashboard/supplier_monitoring_dashboard.webp'
import b2b_purchases from '../../../../Utils/images/Sell/dashboard/merchant_dashboard/b2b_purchases.webp'
import { Link, useNavigate } from 'react-router-dom'
import hornSound from "../../../../Utils/audio/horn-sound.mp3";

function Supplier() {
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
              navigate("purchases");
            }, 800);
      }else if(e.target.closest('.monitor')){
            setTimeout(() => {
              navigate("monitor");
            }, 800);
      }

      audio.play();
    } 
    }

  return (
    <Box className="supplier_wrapper">
        <Box className="row">
            <Box className="col">
                <UserBadge handleBadgeBgClick={-1} handleLogin={'../login'} handleLogoutClick={'../../'} optionalcName={'align-right'}/>
            </Box>
           
            <Box className="col">
                <Link className="img_container" onClick={(e)=>handleClick(e)}>
                    <Box component="img" src={supplier_monitoring_dashboard} className='monitor'/>
                </Link>
                <Link className="img_container" onClick={(e)=>handleClick(e)}>
                    <Box component="img" src={b2b_purchases} className='b2b'/>
                </Link>
            </Box>
        </Box>
    </Box>
    )
}

export default Supplier