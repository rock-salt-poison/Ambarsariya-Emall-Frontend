import React from 'react'
import { Box, ThemeProvider, Typography } from '@mui/material'
import title_bg from '../../../Utils/images/Sell/mou/title_bg.png';
import serial_number_tag from '../../../Utils/images/Sell/mou/serial_number_tag.svg';
import createCustomTheme from '../../../styles/CustomSelectDropdownTheme';

function MOU_Popup({title, sNo, bodyContent}) {

  const themeProps = {
    popoverBackgroundColor: '#F8DED4',
    scrollbarThumb: 'var(--pink2)',
  };

  const theme = createCustomTheme(themeProps);

  return (
    <ThemeProvider theme={theme}>
      <Box className="header">
          <Box className="col"></Box>
          <Box className="title_container">
              <Box component="img" className="title_bg" alt="bg" src={title_bg}/>
              <Typography className="title">{title}</Typography>
          </Box>
          <Box className="col">
              <Box className="sno_container">
                  <Box component="img" src={serial_number_tag} className='sno'
                  alt="tag"/>
                  <Typography className="number">{sNo}</Typography>
              </Box>
          </Box>
      </Box>

      <Box className="body">
          {bodyContent}
      </Box>
    </ThemeProvider>
  )
}

export default MOU_Popup