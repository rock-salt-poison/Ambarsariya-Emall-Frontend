import React from 'react'
import { Box, Typography } from '@mui/material'

function CouponOffers({data}) {
  return (
    <Box className="container">
        {data.map((coupon)=> {
            return <Box className="row" key={coupon.id}>
                <Typography className="heading">{coupon.name}:</Typography>
                <Typography className="items">{coupon.items} left</Typography>
            </Box>
        })}
    </Box>
  )
}

export default CouponOffers