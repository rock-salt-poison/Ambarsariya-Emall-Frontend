import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Button2 from "../../Components/Home/Button2";
import LoginPageCard from "../../Components/Login/LoginPageCard";
import lion_img from "../../Utils/images/Sell/login/lion.webp";
import peacock_img from "../../Utils/images/Sell/login/peacock.webp";
import { useSelector } from "react-redux";
import { getUser } from "../../API/fetchExpressAPI";

function Login() {
  const token = useSelector((state) => state.auth.userAccessToken);

  const [shopAccessToken, setShopAccessToken] = useState("");

  useEffect(() => {
    const fetchShopToken = async () => {
      if (token) {
        try {
          const resp = await getUser(token);
          if(resp.length>0){
            setShopAccessToken(resp[0].shop_access_token);
          }
        } catch (e) {
          console.log(e);
        }
      }
    };
    fetchShopToken();
  }, [token]);

  return (
    <Box className="login_wrapper">
      <Box className="container">
        <Box className="col">
          <Button2 text="Back" redirectTo={-1} />
        </Box>
        <Box className="col">
          <LoginPageCard
            title="Sell"
            imgSrc={peacock_img}
            redirectTo={`../../AmbarsariyaMall/sell/support/shop/shop-detail/${shopAccessToken}`}
          />
        </Box>
        <Box className="col">
          <LoginPageCard
            title="Buy"
            imgSrc={lion_img}
            redirectTo="../../AmbarsariyaMall/sell/esale"
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
