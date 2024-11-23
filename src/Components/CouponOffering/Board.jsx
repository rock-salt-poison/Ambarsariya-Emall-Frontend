import React from 'react'
import { Box, Typography } from '@mui/material'

function Board({text, imgSrc}) {
  return (
    <Box className="container">
        <Box component="img" src={imgSrc} className="board_img" alt="board" />
        <Box className="title_container">
          <Typography>{text}</Typography>
        </Box>
    </Box>
  )
}

export default Board