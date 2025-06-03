import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Box } from "@mui/material";
import Button2 from "../../Components/Home/Button2";
import LoginPageCard from "../../Components/Login/LoginPageCard";
import lion_img from "../../Utils/images/Sell/login/lion.webp";
import peacock_img from "../../Utils/images/Sell/login/peacock.webp";
import { useSelector } from "react-redux";
import { getShopUserData, getUser } from "../../API/fetchExpressAPI";
import UserBadge from "../../UserBadge";
import { useLocation } from "react-router-dom";

function Login() {
  const token = useSelector((state) => state.auth.userAccessToken);
  const location = useLocation();
  
  const isServeRoute = location.pathname.includes("serve");
  const isSocializeRoute = location.pathname.includes("socialize");
  const [accessToken, setAccessToken] = useState("");
  const [isValidShop, setIsValidShop] = useState(false);

  
  // Fetch shop token and details
  const fetchShopToken = useCallback(async () => {
    try {
      const resp = await getUser(token);
      if (resp.length > 0) {
        const shopToken = resp[0].shop_access_token;
        const getShopDetails = await getShopUserData(shopToken);

        if (
          getShopDetails.length > 0 &&
          getShopDetails[0].business_name.length > 0
        ) {
          setAccessToken(shopToken);
          setIsValidShop(true);
        } else {
          setAccessToken('');
          setIsValidShop(false);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchShopToken();
    }
  }, [token, fetchShopToken]);





  return (
    <Box className="login_wrapper">
      <Box className="container">
        <Box className="col">
          {/* <Button2 text="Back" redirectTo={-1} /> */}
          <UserBadge
                handleBadgeBgClick="../../AmbarsariyaMall"
                handleLogin="../login"
                handleLogoutClick="../../AmbarsariyaMall"
            />
        </Box>

        {/* Always Render LoginPageCard but Change Redirect Dynamically */}
        <Box className="col">
          <LoginPageCard
            title="Sell"
            imgSrc={peacock_img}
            redirectTo={'../../AmbarsariyaMall/socialize'}
          />
        </Box>

        <Box className="col">
          <LoginPageCard
            title="Buy"
            imgSrc={lion_img}
            redirectTo={'../../AmbarsariyaMall/socialize'}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
