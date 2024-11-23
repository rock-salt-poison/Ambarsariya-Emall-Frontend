import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import plus_icon from '../../Utils/images/Sell/coupon_offering_page/plus_icon.svg';
import { Link } from 'react-router-dom';
import CardBoardPopup from '../CardBoardPopupComponents/CardBoardPopup';

function Offers({ text, onClick, optionalCname, popup, popup_body_content }) {
  const [anchorEl, setAnchorEl] = useState(null);

  // Open popover on hover
  const handlePopoverOpen = (event) => {
    if (popup) {
      setAnchorEl(event.currentTarget)
}
  };

// Close popover when mouse leaves
const handlePopoverClose = () => {
  setAnchorEl(null);
};

const open = Boolean(anchorEl);

return (
  <Box
    className={`offer_box ${optionalCname ? optionalCname : ''}`}

  >
    <Link onClick={onClick}>
      <Box className="title_container" onMouseEnter={handlePopoverOpen}
      >
        <Typography className="offer_name" >{text}</Typography>
      </Box>
      <Box component="img" src={plus_icon} className="plus_icon" alt="icon" />
    </Link>

    {/* Use the separate Popover component */}

    <CardBoardPopup open={open} handleClose={handlePopoverClose} title={text} body_content={popup_body_content} />
  </Box>
);
}

export default Offers;
