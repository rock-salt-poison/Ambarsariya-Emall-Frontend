import React, { useState } from 'react';
import { Box, ThemeProvider } from '@mui/material';
import createCustomTheme from '../../../styles/CustomSelectDropdownTheme';
import board from '../../../Utils/images/Sell/cart/prepaid_postpaid/board.webp';
import credit from '../../../Utils/images/Sell/cart/prepaid_postpaid/credit_img.webp';
import paid from '../../../Utils/images/Sell/cart/prepaid_postpaid/paid_img.webp';
import { Link, useLocation } from 'react-router-dom';
import CardBoardPopup from '../../CardBoardPopupComponents/CardBoardPopup';
import Prepaid from './Prepaid';
import Postpaid from './Postpaid';

function PrepaidPostpaid() {
  const themeProps = {
    scrollbarThumb: 'var(--brown)',
    popoverBackgroundColor: '#f8e3cc',
  };

  const theme = createCustomTheme(themeProps);

  const [openPopup, setOpenPopup] = useState(null);
  const location = useLocation();

  const handleClick = (e, item) => {
    e.preventDefault(); // Prevent the default behavior of the Link
    if (item.popup) {
      setOpenPopup((prev) => (prev === item.id ? null : item.id));
    }
  };

  const data = [
    { id: 1, imgSrc: board, cName: 'board_img', popup: false },
    {
      id: 2,
      imgSrc: credit,
      cName: 'img',
      popup: true,
      body_content: <Postpaid icon={credit} />,
      popupCname: 'postpaid',
    },
    {
      id: 3,
      imgSrc: paid,
      cName: 'img',
      popup: true,
      body_content: <Prepaid icon={paid} />,
      popupCname: 'prepaid',
    },
    { id: 4 },
  ];

  const handleClose = () => {
    setOpenPopup(false);
  };

  // Function to get the current URL with the token query parameter intact
  const getCurrentUrlWithToken = () => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    return `${location.pathname}?${searchParams.toString()}`;
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className="body_container">
        <Box className="row">
          {data.map((item) => (
            <Box className="col" key={item.id}>
              {/* Use Link but preserve the token in the URL */}
              {item.imgSrc && (
                <Link
                  to={getCurrentUrlWithToken()} // Preserve token in URL
                  onClick={(e) => handleClick(e, item)} // Handle the popup opening
                >
                  <Box
                    component="img"
                    src={item.imgSrc}
                    alt="prepaid_postpaid"
                    className={item.cName}
                  />
                </Link>
              )}

              <CardBoardPopup
                open={openPopup === item.id}
                handleClose={handleClose}
                customPopup={true}
                optionalCName={item.popupCname}
                body_content={item.body_content}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default PrepaidPostpaid;
