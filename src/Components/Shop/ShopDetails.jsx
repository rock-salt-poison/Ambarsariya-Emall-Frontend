import { Box, Typography } from '@mui/material'
import React from 'react'

function ShopDetails({column}) {
  return (
    <Box className="shop_details_col">
                <Box className="shop_details">
                  <Typography>Domain: </Typography>
                  <Typography>{column.domain}</Typography>
                </Box>
                <Box className="shop_details">
                  <Typography>Sector: </Typography>
                  <Typography>{column.sector}</Typography>
                </Box>
                <Box className="shop_details">
                  <Typography>Supply: </Typography>
                  <Typography>{column.supply}</Typography>
                </Box>
                <Box className="shop_details">
                  <Typography>Shop Type: </Typography>
                  <Typography>{column.shopType}</Typography>
                </Box>
                <Box className="shop_details">
                  <Typography>Cost Sensitivity: </Typography>
                  <Typography>{column.costSensitivity}</Typography>
                </Box>
              </Box>
  )
}

export default ShopDetails