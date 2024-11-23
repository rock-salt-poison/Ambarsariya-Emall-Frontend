import { Box, Typography } from '@mui/material'
import React from 'react'
import map_img from '../../Utils/images/Sell/shop_details/map.svg'
import contact_img from '../../Utils/images/Sell/shop_details/contact_us.svg'
import home_img from '../../Utils/images/Sell/shop_details/home.svg'

const data= [
    {id:1,icon:map_img, text:'123, ABC road, Asr'},
    {id:2,icon:contact_img, text:'9876543210'},
    {id:3,icon:home_img, text:'123, ABC road, Asr'},
]

function GetInTouch() {
  return (
    <Box className="get_in_touch_wrapper">
        <Box className="contact_row">
          {
              data.map((data)=>{
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