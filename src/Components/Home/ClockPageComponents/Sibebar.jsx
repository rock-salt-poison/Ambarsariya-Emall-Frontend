import React from 'react'
import { Box } from '@mui/material'

function Sibebar({backButton, componentToRender, componentToRender2, currencyAndTimeComponent}) {
  return (
    <Box className="sidebar-wrapper">
       <Box sx={{width:'100%'}}>
          {backButton}
       </Box>
       <Box sx={{width:'100%'}}>
          {componentToRender}
       </Box>
       <Box sx={{width:'100%'}}>
          {componentToRender2}
       </Box>
       <Box sx={{width:'100%'}}>
          {currencyAndTimeComponent}
       </Box>
    </Box>
  )
}

export default Sibebar