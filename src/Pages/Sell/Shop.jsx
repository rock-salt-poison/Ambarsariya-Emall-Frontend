import React from 'react'
import { Box, Typography } from '@mui/material'
import ShopDesign from '../../Components/Shop/ShopDesign'
import WomanPointingShopName from '../../Components/Shop/WomanPointingShopName'
import BusinessHours from '../../Components/Shop/BusinessHours'
import TypeOfServices from '../../Components/Shop/TypeOfServices'
import GetInTouch from '../../Components/Shop/GetInTouch'
import ShopDetails2 from '../../Components/Shop/ShopDetails2'
import Button2 from '../../Components/Home/Button2'

const columns = {
      domain: 'Retailer',
      sector: 'Stationary',
      supply: 'School & Office',
      shopType: 'Class C',
      costSensitivity: 'Moderate'
    };

function Shop() {
  return (
    <Box className="shop_wrapper">
        <Box className="container">
            <Box className="row">
                <Box className="col">
                    <Box className="visible_on_small_screen">
                        <Button2 text="Back" redirectTo="../support/stationary" />
                    </Box>
                    <ShopDesign/>
                    <WomanPointingShopName/>
                    <BusinessHours/>
                {/* </Box>

                <Box className="col"> */}
                    <TypeOfServices/>
                    <ShopDetails2/>
                    
                    <GetInTouch/>
                </Box>
            </Box>
        </Box>
    </Box>
  )
}

export default Shop