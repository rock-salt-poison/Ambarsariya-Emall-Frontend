import { Box } from '@mui/material'
import React from 'react'
import UserBadge from '../../UserBadge'

function Sale() {
  return (
    <Box className="sale_wrapper">
        <Box className="row">
            <Box className="col">
                <UserBadge
                    handleLogoutClick="../../"
                    handleBadgeBgClick={-1}
                    handleLogin="login"
                />
            </Box>
            <Box className="col"></Box>
        </Box>
    </Box>
  )
}

export default Sale