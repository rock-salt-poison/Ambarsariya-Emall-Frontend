import { Box, Typography } from '@mui/material'
import React from 'react'
import UserBadge from '../../UserBadge'
import city_hoardings from '../../Utils/gifs/city_hoardings.gif'
import road_rage_banner from '../../Utils/gifs/road_rage_banner.gif'

function BannersMain() {

  const cards = [
    {id:1, label:'City Hoardings', src:city_hoardings, alt:'city-hoardings', cName:'card city_hoarding'},
    {id:2, label:'Road Rage Banners', src:road_rage_banner, alt:'road-rage-banner', cName:'card road_rage_banner'},
  ]
  return (
    <Box className="banner_main_wrapper">
      <Box className="row">
        <Box className="col back_button">
          <UserBadge
            handleLogoutClick="../../"
            handleBadgeBgClick={-1}
            handleLogin="login"
          />
        </Box>
        <Box className="col heading_container">
          <Typography className="heading" variant="h2">Banners Today</Typography>
        </Box>
      </Box>

      <Box className="row">
        <Box className="col card_container">
          {cards && cards?.map((card)=>(<Box key={card?.id} className={card.cName}>
            <Box className="label_container">
              <Typography className="label">{card?.label}</Typography>
            </Box>
          </Box>))}
        </Box>
      </Box>
    </Box>
  )
}

export default BannersMain