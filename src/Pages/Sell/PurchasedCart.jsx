import React, { useEffect, useRef, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMemberData, getShopUserData, getUser, post_purchaseOrder } from "../../API/fetchExpressAPI";
import UserBadge from "../../UserBadge";
import CustomSnackbar from "../../Components/CustomSnackbar";
import { clearCart } from "../../store/cartSlice";
import PurchasedCartTable from "../../Components/Cart/PurchasedCartTable";

function PurchasedCart() {
  const sampleRows = useSelector((state) => state.cart.selectedProducts);
  const [shopData, setShopData] = useState();
  const { owner, po_no } = useParams();
  
  const token = useSelector((state) => state.auth.userAccessToken);
  const [buyerData, setBuyerData] = useState(null);
  const [sellerData, setSellerData] = useState(null);
  const [loading, setLoading] = useState(false);
   const [snackbar, setSnackbar] = useState({
      open: false,
      message: "",
      severity: "success",
    });


  useEffect(() => {
    const fetchData = async () => {
      if (owner) {
        try {
            const resp = await getShopUserData(owner);
            setShopData(resp?.[0]);
        } catch (e) {
          setShopData(null);
        }
      }
    };
    fetchData();
  }, [owner]);

  

  return (
    <Box className="cart_wrapper purchase_order">
      {loading && <Box className="loading"><CircularProgress/></Box> }
      <Box className="row">
        <Box className="col">
          {/* <Button2 text={"Back"} redirectTo={-1} /> */}
          <Box></Box>
      
          <Typography variant="h2" className="heading">
            <Typography variant="span" className="span_1">
              {shopData?.business_name}
            </Typography>
            <Typography variant="span" className="span_1">
              Shop No:
              <Typography variant="span" className="span_2">
                {(shopData?.shop_no)?.split('_')[1]}
              </Typography>
            </Typography>
          </Typography>

          <UserBadge
            handleBadgeBgClick={-1}
            handleLogin="../login"
            handleLogoutClick="../../AmbarsariyaMall"
        />
          {/* <Link to={`../${owner}/order`}> */}
        </Box>
        <Box className="col">
          <PurchasedCartTable rows={sampleRows} />
        </Box>
        
      </Box>
      <CustomSnackbar
        open={snackbar.open}
        handleClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </Box>
  );
}

export default PurchasedCart;
