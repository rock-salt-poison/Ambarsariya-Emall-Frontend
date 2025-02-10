import React, { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import ShopDesign from "../../Components/Shop/ShopDesign";
import WomanPointingShopName from "../../Components/Shop/WomanPointingShopName";
import BusinessHours from "../../Components/Shop/BusinessHours";
import TypeOfServices from "../../Components/Shop/TypeOfServices";
import GetInTouch from "../../Components/Shop/GetInTouch";
import ShopDetails2 from "../../Components/Shop/ShopDetails2";
import Button2 from "../../Components/Home/Button2";
import { useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { allShops, getShopUserData } from "../../API/fetchExpressAPI";
import CustomSnackbar from "../../Components/CustomSnackbar";
import UserBadge from "../../Components/Userbadge";


function Shop() {
    // const token = useSelector((state) => state.auth.userAccessToken);
    // const [searchParams] = useSearchParams();
    // const shopId = searchParams.get("token");

    const { token } = useParams();
  
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
  
    const [snackbar, setSnackbar] = useState({
      open: false,
      message: "",
      severity: "success",
    });
  
    useEffect(() => {
      const fetchData = async () => {
        if (token) {
          try {
            const shops = await allShops();
            const validShop = shops.find((shop) => shop.shop_access_token === token);
            if (validShop) {
              const resp = await getShopUserData(token);
              console.log(resp?.length)
              if (resp?.length > 0) {
                setData(resp[0]);
              } else {
                setSnackbar({
                  open: true,
                  message: "No shop data available.",
                  severity: "info",
                });
              }
            }
            else{
                setSnackbar({
                    open: true,
                    message: "Invalid shop.",
                    severity: "error",
                  });
            }
          } catch (error) {
            console.error("Error fetching shop data:", error);
            setSnackbar({
              open: true,
              message: error.response?.data?.message || "An unexpected error occurred.",
              severity: "error",
            });
          } finally {
            setLoading(false);
          }
        } else {
          setSnackbar({
            open: true,
            message: "Shop ID is missing.",
            severity: "warning",
          });
          setLoading(false);
        }
      };
      fetchData();
    }, [token]);
  
    return (
      <Box className="shop_wrapper">
        {loading && (
          <Box className="loading">
            <CircularProgress />
          </Box>
        )}
  
        {!loading && (
          <Box className="container">
            <Box className="row">
              <Box className="col">
                <Box className="visible_on_small_screen">
                <UserBadge
                    handleBadgeBgClick={`../support/shop?token=${token}`}
                    handleLogin="../login"
                    handleLogoutClick="../../AmbarsariyaMall"
                />
                  {/* <Button2 text="Back" redirectTo={`../support/shop?token=${token}`} /> */}
                  {/* <Button2 text="Back" redirectTo={-1} /> */}
                </Box>
                {data && <ShopDesign data={data} />}
                {data && <WomanPointingShopName />}
                {data && <BusinessHours data={data} />}
                {data && <TypeOfServices />}                
                {data && <ShopDetails2 data={data} />}
                {data && <GetInTouch data={data} />}
              </Box>
            </Box>
          </Box>
        )}
  
        <CustomSnackbar
          open={snackbar.open}
          handleClose={() => setSnackbar({ ...snackbar, open: false })}
          message={snackbar.message}
          severity={snackbar.severity}
        />
      </Box>
    );
  }
  
export default Shop;