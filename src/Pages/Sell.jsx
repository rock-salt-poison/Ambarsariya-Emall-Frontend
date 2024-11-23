import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Button2 from '../Components/Home/Button2';
import { Link, useNavigate } from 'react-router-dom';
import icon from '../Utils/images/Sell/person_on_call.svg';
import sellButtonBg from '../Utils/images/Sell/sell_button_bg2.png';
// import growButtonBg from '../Utils/images/Sell/grow_bg.png';
import growButtonBg from '../Utils/images/Sell/growBtn.png';
// import grabButtonBg from '../Utils/images/Sell/grab_bg.png';
import grabButtonBg from '../Utils/images/Sell/grabBtn.png';
// import eshopBtnBg from '../Utils/images/Sell/eshop_btn_bg.svg';
import eshopBtnBg from '../Utils/images/Sell/eshopBtn.png';
// import esaleBtnBg from '../Utils/images/Sell/esale_btn_bg.svg';
import esaleBtnBg from '../Utils/images/Sell/esaleBtn.png';
import hornSound from '../Utils/audio/horn-sound.mp3';
import Logo from '../Components/Logo';

function Sell() {
  const navigate = useNavigate();
  const [audio] = useState(new Audio(hornSound));

  const handleClick = (e) => {
    const btns = e.target.closest('.btn');
    const sell_buy_button = e.target.closest('.title_container');
    // const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('access_token'));
    const loggedIn = !!localStorage.getItem('access_token');

    if (sell_buy_button) {
      sell_buy_button.classList.add('reduceSize3');

      setTimeout(() => {
        sell_buy_button.classList.remove('reduceSize3');
      }, 500);

      setTimeout(() => {
        navigate('support');
      }, 800);

      audio.play();
    } else if (btns) {
      btns.classList.add('reduceSize3');

      setTimeout(() => {
        btns.classList.remove('reduceSize3');
      }, 500);

      let destination = '';

      if (btns.classList.contains('Grab')) {
        destination ='grab';
      } else if (btns.classList.contains('Grow')) {
        destination = 'grow';
      }else if (btns.classList.contains('E-shop')) {
        destination =loggedIn ? 'eshop':'login';
      }else if (btns.classList.contains('E-sale')) {
        destination =loggedIn ? 'esale':'login';
      }

      setTimeout(() => {
        navigate(destination);
      }, 800);

      audio.play();
    }
  };

  const buttons = [
    { src: growButtonBg, text: 'Grow', handleClick },
    { src: grabButtonBg, text: 'Grab', handleClick },
    { src: eshopBtnBg, text: 'E-shop', handleClick },
    { src: esaleBtnBg, text: 'E-sale', handleClick }
  ];

  return (
    <Box className="sell_wrapper">
      <Box className="row_wrapper">
        <Box className="header col">
          <Box className="back-button-wrapper">
            {/* <Button2 text="Back" redirectTo="/AmbarsariyaMall" /> */}
            <Logo/>
          </Box>
          <Box className="title_container">
            <Box component="img" src={sellButtonBg} className="bg_img" alt="background" />
            <Link className="title" onClick={(e) => handleClick(e)}>
              <Typography variant="span" className="text">Sell / Buy</Typography>
              <Box component="img" src={icon} className="person_on_call" alt="person on call" />
            </Link>
          </Box>
          <Box></Box>
        </Box>
        <Box className="content">
          {[0, 1].map(rowIndex => (
            <Box className="row" key={rowIndex}>
              {buttons.slice(rowIndex * 2, rowIndex * 2 + 2).map((button, index) => (
                <Box className={`btn ${button.text}`} key={index}>
                  <Link onClick={button.handleClick}>
                    <Box component="img" src={button.src} className="bg_img" alt="background" />
                    <Box className="text_container">
                      <Typography className="text">{button.text}</Typography>
                    </Box>
                  </Link>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default Sell;
