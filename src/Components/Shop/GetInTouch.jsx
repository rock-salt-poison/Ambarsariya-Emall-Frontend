import { Box, Typography } from '@mui/material'
import React from 'react'
import map_img from '../../Utils/images/Sell/shop_details/map.svg'
import contact_img from '../../Utils/images/Sell/shop_details/contact_us.svg'
import home_img from '../../Utils/images/Sell/shop_details/home.svg'


function GetInTouch({data}) {
  const details= [
      {id:1,icon:map_img, text:data.address},
      {id:2,icon:contact_img, text:data.phone_no_1},
      {id:3,icon:home_img, text:data.address},
  ]

  return (
    <Box className="get_in_touch_wrapper">
        <Box className="contact_row">
          {
              details.map((data)=>{
                  return <Box className="col" key={data.id}>
                          <Box component="img" src={data.icon} className='icon'/>
                          <Typography className="text">{data.text}</Typography>
                      </Box>
              })
          }        
        </Box>
    </Box>
  )
}

export default GetInTouch