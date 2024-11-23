import { Box, Typography, Slider } from '@mui/material';
import React, { useState } from 'react';
import cost_sensitivity_icon from '../../Utils/images/Sell/shop_details/cost_sensitivity_icon.svg'
import CardBoardPopup from '../CardBoardPopupComponents/CardBoardPopup';
import { Link } from 'react-router-dom';
import ShopClassComponent from './ShopClassComponent';

function ShopDetails2() {
  // Define the slider marks
  const marks = [
    { value: 0, label: 'A' },
    { value: 1, label: 'B' },
    { value: 2, label: 'C' },
    { value: 3, label: 'D' }
  ];

  const costSensitivity = [
    { value: 0, label: 'Easy' },
    { value: 1, label: 'Moderate' },
    { value: 2, label: 'Effective' },
    { value: 3, label: 'Luxury' }
  ];

  const [openPopup, setOpenPopup] = useState(false);
  const [title, setTitle] = useState('');

  const handleClose = () => {
    setOpenPopup(false);
  }

  const handleClick = (e, id, title) => {
    setOpenPopup((prev)=> prev===id? null : id);
    setTitle(title);
  }

  return (
    <Box className="shop_details_col2">
      <Link className="shop_details" onClick={(e)=>handleClick(e,1,'Class A')}>
        <Typography className="title">Class</Typography>
        <Slider
          value={1} // Default value (optional)
          step={1} // Step between marks
          min={0} // Minimum value
          max={3} // Maximum value
          marks={marks} // Marks array
          className="slider"
        />
      </Link>

      <Box className="shop_details">
        <Box component="img" src={cost_sensitivity_icon} alt="cost_sensitivity" className='cost_sensitivity_icon'/>
        <Slider
          value={0} // Default value (optional)
          step={1} // Step between marks
          min={0} // Minimum value
          max={3} // Maximum value
          marks={costSensitivity} // Marks array
          className="slider"
        />
      </Box>

      <CardBoardPopup open={openPopup} handleClose={handleClose} title={title} body_content={<ShopClassComponent />}/>

    </Box>
  );
}

export default ShopDetails2;
