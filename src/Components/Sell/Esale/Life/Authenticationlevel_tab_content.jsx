import React from 'react'
import { Box, Slider, Typography } from '@mui/material'
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

function Authenticationlevel_tab_content({ title, communityData }) {

    const levels = [
        { id: 0, label: 'Phone', icon:<TaskAltIcon className='radio checked'/> },
        { id: 1, label: 'Name', icon:<TaskAltIcon className='radio checked'/> },
        { id: 2, label: 'Aadhaar', icon:<RadioButtonUncheckedIcon className='radio'/> },
        { id: 3, label: 'Location', icon:<RadioButtonUncheckedIcon className='radio'/> },
        { id: 4, label: 'Bank Details', icon:<RadioButtonUncheckedIcon className='radio'/> },
        { id: 5, label: 'Personal Video / Pic', icon:<TaskAltIcon className='radio checked'/> },
        { id: 6, label: 'GST / MSME / PAN', icon:<RadioButtonUncheckedIcon className='radio'/> },
    ];
      
    const onSliderChange = (e, newValue, name) => {
    console.log(`Slider "${name}" changed to:`, newValue);
    // Handle the slider value update logic here
    };
      
    return (
        <Box className="tab_content">
            <Typography className="title">{title}</Typography>
            <Box className="content">
                {levels.map((level)=>{
                    return  <Box className="list authentication_level" key={level.id}>
                        <Typography className='heading'>{level.label}</Typography>
                        {level.icon}                    
                    </Box>
                })}
            </Box>
        </Box>
    )
}

export default Authenticationlevel_tab_content