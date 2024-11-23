import React, { useState } from 'react';
import { Box, Typography, TextField, IconButton } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // Default MUI clock icon
import CustomClockSVG from '../../../Utils/images/clock.webp'; // Custom clock SVG
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { Link } from 'react-router-dom';
import { LocationPicker } from '../../../API/LocationPicker';
import location_pin from '../../../Utils/images/Sell/user_portfolio/location_pin_icon.svg'

function MorningData( {heading, component, linkText, linkIcon}) {
  const [value, setValue] = useState(null);

  return (
    <Box className="morning_routine">
      <Box className="col_1">
        <Typography className="heading_1">{heading}</Typography>

        {component==='clock' ? (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              value={value}
              onChange={(newValue) => setValue(newValue)}
              viewRenderers={{
                hours: renderTimeViewClock, // Use custom clock view renderer
                minutes: renderTimeViewClock, // Use custom clock view renderer
              }}
              textfield={(params) => (
                <TextField
                  {...params}
                  InputProps={{
                    endAdornment: (
                      <IconButton aria-label="choose time">
                        <img src={CustomClockSVG} alt="Custom Clock" style={{ width: 24, height: 24 }} />
                      </IconButton>
                    ),
                    startAdornment: <AccessTimeIcon style={{ visibility: 'hidden' }} />, // Hide default icon
                  }}
                />
              )}
              
            />
          </LocalizationProvider>
        )
        : component==="location" ? (
          <Link onClick={()=>{LocationPicker()}}>
              <Typography className='text1'>Set Location</Typography>
              <Box component="img" src={location_pin} className='location_pin' alt="location_pin"/>
          </Link>
        ) : component==="link" && (
          <Link>
              <Typography className='text1'>
                    {linkText}
                    <Box component="img" src={linkIcon} className='location_pin' alt="location_pin"/>
              </Typography>
          </Link>
        )}
      </Box>
    </Box>
  );
}

export default MorningData;
