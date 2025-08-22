import React from 'react'
import { Box, Typography } from '@mui/material'

function CouponOffers({data}) {
  return (
    <Box className="container">
        {data?.map((coupon)=> {
            return <Box className="row" key={coupon?.id}>
                <Typography className="heading">{(coupon?.coupon_type)?.replace(/_/g, ' ')}</Typography>
                <Typography className="items">{coupon?.no_of_coupons} left</Typography>
            </Box>
        })}
    </Box>
  )
}

export default CouponOffers