import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Button2 from '../Components/Home/Button2';
import { Link, useNavigate } from 'react-router-dom';
import icon from '../Utils/images/Sell/person_on_call.svg';
import sellButtonBg from '../Utils/images/Sell/sell_button_bg2.png';
import growButtonBg from '../Utils/images/Sell/growBtn.png';
import grabButtonBg from '../Utils/images/Sell/grabBtn.png';
import eshopBtnBg from '../Utils/images/Sell/eshopBtn.png';
import esaleBtnBg from '../Utils/images/Sell/esaleBtn.png';
import hornSound from '../Utils/audio/horn-sound.mp3';
import Logo from '../Components/Logo';
import { useSelector } from 'react-redux';
import { useLogout } from '../customHooks/useLogout';
import { fetchUserType } from '../Components/userBadge';
import { getShopUserData, getUser } from '../API/fetchExpressAPI';

function Sell() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.userAccessToken);
  const handleLogout = useLogout();
  const [audio] = useState(new Audio(hornSound));
  const [userIcon, setUserIcon] = useState(null);

  const [shopToken, setShopToken] = useState('');
  const [validShop, setValidShop] = useState(false);

  useEffect(()=> {
    const fetchShopToken = async() => {
      if(token){
        const resp = await getUser(token);
        if(resp.length>0){
          if(resp[0].shop_access_token){
            const shopData = await getShopUserData(resp[0].shop_access_token);
            console.log(shopData)
            if(shopData?.length>0){
              if((shopData[0]?.business_name)?.length>0){
                setValidShop(true);
                setShopToken(shopData[0].shop_access_token);
              }else{
                setValidShop(false);
                setShopToken(shopData[0].shop_access_token);
              }
            }
          }

        }
      }
    }
    fetchShopToken();
  }, [token])

  const handleClick = (e) => {
    const btns = e.target.closest('.btn');
    const sell_buy_button = e.target.closest('.title_container');

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
        destination = shopToken ? validShop ? `support/shop/shop-detail/${shopToken}` : 'eshop':'login';
      }else if (btns.classList.contains('E-sale')) {
        destination = token ? 'esale':'login';
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

  useEffect(()=> {
    fetchUserType(token, setUserIcon);
  }, [token]);

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
          <Box className="back-button-wrapper">
          {userIcon && <Box component="img" src={userIcon} className="badge"/>}

          </Box>
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
