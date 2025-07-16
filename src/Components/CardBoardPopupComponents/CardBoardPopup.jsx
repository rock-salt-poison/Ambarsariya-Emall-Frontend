import React from 'react';
import { Box, Dialog, DialogContent, Typography, useMediaQuery, useTheme } from '@mui/material';
import popup_bg from '../../Utils/images/Serve/popup_bg.webp'

function CardBoardPopup({ open, handleClose,texturedSheet, iconSrc, title, body_content, optionalCName, customPopup }) {

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleContentClick = (e) => {
    e.stopPropagation(); // Stop click propagation for content
  };

  return (
    <Dialog open={open} onClose={handleClose} className={`${texturedSheet ? 'textured_sheet_popup' : customPopup ? 'custom' :'card_board_popup'} ${optionalCName ? optionalCName:''}`} fullScreen={fullScreen}
      fullWidth
      maxWidth="sm">
      <DialogContent className="card_board_component" onClick={handleContentClick}>
        {texturedSheet && <Box component="img" alt="img" className='textured_bg' src={popup_bg}/>
        }
        <Box className={`content ${optionalCName ? optionalCName:''}`}>
          {customPopup ? <Box className="content_body">{body_content}</Box> : 
            <>
              <Box className="content_header">
                <Box className="heading">
                {iconSrc && <Box component="img" src={iconSrc} alt="icon" className="icon"/>}
                  <Typography component="h2">{title}</Typography>
                </Box>
              </Box>
              <Box className="content_body">{body_content}</Box>
            </>
          }
          
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default CardBoardPopup;