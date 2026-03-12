import { Box } from '@mui/material'
import React from 'react'
import UserBadge from '../../UserBadge'
import public_places from '../../Utils/images/Socialize/citizens/promotions/public_place.webp';
import booked_places from '../../Utils/images/Socialize/citizens/promotions/booked_place.webp';
import { Link } from 'react-router-dom';


function Promotion() {

  const data = [
    {id:1, icon: public_places},
    {id:2, icon: booked_places},
  ]
  return (
    <Box className="promotion_wrapper">
        <Box className="row">
            <Box className="col">
                <UserBadge
                    handleLogoutClick="../../"
                    handleBadgeBgClick={-1}
                    handleLogin="login"
                />
            </Box>
            <Box className="col">
              <Box className="card_container">
                {data?.slice(0, 2)?.map((card)=>{
                  return <Link className="card">
                    <Box component="img" src={card?.icon} alt="icon" className='icon'/>
                  </Link>
                })}
              </Box>
            </Box>
        </Box>
    </Box>
  )
}

export default Promotion