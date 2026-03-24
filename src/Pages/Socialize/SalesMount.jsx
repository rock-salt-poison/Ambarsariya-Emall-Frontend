import { Box, Typography } from '@mui/material'
import React from 'react'
import UserBadge from '../../UserBadge'
import authenticate_shop from '../../Utils/images/Socialize/city_junctions/sales_mount/authenticate_shop.svg';
import sign_of_understanding from '../../Utils/images/Socialize/city_junctions/sales_mount/sign_of_understanding.svg';
import custom_fit_solutions from '../../Utils/images/Socialize/city_junctions/sales_mount/custom_fit_solutions.svg';
import enquiry from '../../Utils/images/Socialize/city_junctions/sales_mount/enquiry.svg';

function SalesMount() {
    const items = [
        {id:1, icon: authenticate_shop, title: 'Authenticate Your Shop'},
        {id:2, icon: sign_of_understanding, title: 'Sign of Understanding'},
        {id:3, icon: custom_fit_solutions, title: 'Custom Fit Solutions'},
        {id:3, icon: enquiry, title: 'Enquiry'},
    ]
  return (
    <Box className="sales_mount_wrapper">
        <Box className="row">
            <Box className="col">
                <Box></Box>
                <Typography className="heading">Sales Mount</Typography>
                <UserBadge
                        handleLogoutClick="../../"
                        handleBadgeBgClick={-1}
                        handleLogin="login"
                    />
            </Box>
            <Box className="col">
                <Box className="container">
                    <Box className="board_pins">
                        <Box className="circle"></Box>
                        <Box className="circle"></Box>
                    </Box>
                    <Box className="items_container">
                        {items?.map((item)=>{
                            return <Box className="item" key={item.id}>
                                <Box component="img" src={item?.icon} alt={item.title} className="icon"/>
                                <Typography className="title">{item.title}</Typography>
                            </Box>
                        })}
                    </Box>
                    <Box className="board_pins">
                        <Box className="circle"></Box>
                        <Box className="circle"></Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    </Box>
  )
}

export default SalesMount