import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import ReactPlayer from 'react-player';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Dialog, DialogContent, IconButton, ThemeProvider, useMediaQuery } from '@mui/material';
import createCustomTheme from '../../styles/CustomSelectDropdownTheme';
import video_frame from '../../Utils/images/frames/frame2.png';

export default function VideoPopup({ open, handleClose }, props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const themeProps = {
    popoverBackgroundColor: props.popoverBackgroundColor || 'var(--pink2)',
};

const theme2 = createCustomTheme(themeProps);

  return (
    <ThemeProvider theme={theme2}>
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      className='video_popup'
    >
      <DialogContent>
        <Box position="relative" className="video_container">
          <Box component="img" src={video_frame} alt="video_frame" className="video_frame"/>
          <IconButton
            onClick={handleClose}
            className='close_icon'
          >
            <CloseIcon />
          </IconButton>
          <ReactPlayer url="https://www.youtube.com/embed/m701WKQMeYQ" playing controls width="auto" height="auto" className="videoPlayer">

          </ReactPlayer>
        </Box>
      </DialogContent>
    </Dialog>
    </ThemeProvider>
  );
}
