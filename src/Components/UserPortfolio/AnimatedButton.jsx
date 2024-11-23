import React, { useState } from 'react'
import { Box, Button } from '@mui/material'
import CardBoardPopup from '../CardBoardPopupComponents/CardBoardPopup'

function AnimatedButton({ text, imgSrc, popup_body_content }) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
    setOpen(true);
  }
  return (
    <>
      <Box className="group" aria-hidden={open ? "true" : "false"}>
        <Box className="icon_container">
          <Box component="img" alt={imgSrc} src={imgSrc} className="icon" />
        </Box>
        <Button className="btn" onClick={handleClick}>{text}</Button>
      </Box>
      <CardBoardPopup open={open} handleClose={handleClose} title={text} body_content={popup_body_content} />
    </>
  )
}

export default AnimatedButton