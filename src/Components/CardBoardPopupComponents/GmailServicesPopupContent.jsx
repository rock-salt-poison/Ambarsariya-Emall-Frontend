import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Switch_On_Off2 from '../Form/Switch_On_Off2';

function GmailServicesPopupContent(props) {
  const [switchChecked, setSwitchChecked] = useState(true);

  const handleSwitchChange = (e) => {
    setSwitchChecked(e.target.checked);  // Update the state based on the switch change
    console.log(e.target.checked);       // Log the checked status
  };

  return (
    <Box className="gmail_service_container">
      {props.description && (
        <Typography className='description'>
          {props.description}
        </Typography>
      )}
      <Box className="gmail_services">
        <Box className="service">
          <Typography className='label'>Google contacts</Typography>
          <Switch_On_Off2/>

        </Box>
        <Box className="service">
          <Typography className='label'>Google maps</Typography>
          <Switch_On_Off2/>

        </Box>
        <Box className="service">
          <Typography className='label'>Google calendar</Typography>
          <Switch_On_Off2/>

        </Box>
        <Box className="service">
          <Typography className='label'>Google meet</Typography>
          <Switch_On_Off2/>

        </Box>

      </Box>
    </Box>
  );
}

export default GmailServicesPopupContent;
