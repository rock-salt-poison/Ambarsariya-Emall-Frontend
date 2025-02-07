import React, { useEffect, useState } from 'react'
import { Box, ThemeProvider } from '@mui/material'
import Button2 from '../../Components/Home/Button2'
import Board from '../../Components/CouponOffering/Board'
import boardImg from '../../Utils/images/Sell/coupon_offering_page/board2.svg'
import BookEshopForm from '../../Components/Form/BookEshopForm'
import createCustomTheme from '../../styles/CustomSelectDropdownTheme';
import { useSelector } from 'react-redux'
import { getUser } from '../../API/fetchExpressAPI'
import UserBadge from '../../Components/UserBadge'

function BuyEshop(props) {
  const themeProps = {
    popoverBackgroundColor: props.popoverBackgroundColor || 'var(--pink1)',
    textColor: 'black', scrollbarThumb: 'var(--brown)'
  };

  const [shopAccessToken, setShopAccessToken] = useState();
  const user_access_token = useSelector((state) => state.auth.userAccessToken);

  useEffect(()=>{
    const fetchShopToken = async () => {
      if(user_access_token){
        const shop_token = (await getUser(user_access_token))[0].shop_access_token;
  
        if(shop_token){
          setShopAccessToken(shop_token);
        }
      }
    }

    fetchShopToken();
  },[user_access_token])

  const theme = createCustomTheme(themeProps);
  return (
    <ThemeProvider theme={theme}>
      <Box className="buy_eshop_wrapper">
        <Box className="row">
          <Box className="col">
            <UserBadge
                          handleBadgeBgClick={`../`}
                          handleLogin="../login"
                          handleLogoutClick="../../AmbarsariyaMall"
                      />
            {/* <Button2 text="Back" redirectTo="/AmbarsariyaMall/sell" /> */}
            <Box className="header_board">
              <Board text="Book Your E-shop" imgSrc={boardImg} />
            </Box>
            <Button2 text="Next" redirectTo={user_access_token? "../eshop": "../login"} optionalcName={shopAccessToken ? "visible" : "hidden"}/>
            <Box></Box>
          </Box>
          <Box className="col">
            <Box></Box>
            <Box className="container">
              <Box className="child">
                <BookEshopForm />
              </Box>
            </Box>
            <Box></Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default BuyEshop