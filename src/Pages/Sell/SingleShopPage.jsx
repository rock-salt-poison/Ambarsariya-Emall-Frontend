import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import stationary_bg_img from '../../Utils/images/Sell/merchant_details/stationary.webp';
import healthcare_bg_img from '../../Utils/images/Sell/merchant_details/healthcare.webp';
// import electronics_bg_img from '../../Utils/images/Sell/merchant_details/electronics.webp'; // Add this line for Electronics sector
import Button2 from '../../Components/Home/Button2';
import ShopDetails from '../../Components/Shop/ShopDetails';
import VideoPlayer from '../../Components/MerchantWrapper/VideoPlayer';
import ServicesTypeCard from '../../Components/MerchantWrapper/ServicesTypeCard';
import video_frame from '../../Utils/images/frames/frame2.png';
import CardBoardPopup from '../../Components/CardBoardPopupComponents/CardBoardPopup';
import PurchaseCoupon from '../../Components/Cart/PurchaseCoupon/PurchaseCoupon';
import DiscountPercentageSlider from '../../Components/Shop/DiscountPercentageSlider';
import CouponsSlider from '../../Components/Shop/CouponsSlider';
import { allShops, getShopUserData } from '../../API/fetchExpressAPI';
import CustomSnackbar from '../../Components/CustomSnackbar';

const SingleShopPage = ({ showBackButton = true, shopData }) => {
  const [searchParams] = useSearchParams();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  
  const id = searchParams.get('id');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(shopData || []);
  const navigate = useNavigate();
  
  // Video URL for the video player
  const videoUrl = 'https://www.youtube.com/embed/m701WKQMeYQ?controls=0&modestbranding=1';

  const getImageSrc = (sector) => {
    switch (sector) {
      case 'stationary':
        return stationary_bg_img;
      case 'healthcare':
        return healthcare_bg_img;
      default:
        return stationary_bg_img; // Default image if sector doesn't match
    }
  };

  const handleClick = (e, shop_token) => navigate(`../support/shop/shop-detail?token=${shop_token}`);

  const [openPopup, setOpenPopup] = useState(false);
  const handleClose = () => setOpenPopup(false);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          setLoading(true);
          const shops = await allShops();
          const validShop = shops.find((shop) => shop.shop_access_token === id);
          if (validShop) {
            const resp = await getShopUserData(id);
            if (resp?.length > 0) {
              setData(resp);
            } else {
              setSnackbar({
                open: true,
                message: "No shop data available.",
                severity: "info",
              });
            }
          } else {
            setSnackbar({
              open: true,
              message: "Invalid shop.",
              severity: "error",
            });
            setTimeout(()=>{
              navigate('../support')
            }, 1200);
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
      } 
        
    };
    fetchData();
  }, [id]);

  return (
    <>
    {loading && <Box className="loading">
            <CircularProgress />
          </Box>}
      {data.length>0 && data.map((column, index) => (
        <Box key={index} className="single_shop_wrapper">
          <Box component="img" src={getImageSrc(id)} className='sector_bg_img' />
          <Box className="row">
            {showBackButton && (
              <Box className="col-1">
                <Button2 text="Back" redirectTo={'../support'} />
              </Box>
            )}
            <Box className="container">
              <Box className="col-2">
                <Box className="sub_col_1">
                  <Box className="shop_details" >
                    <Box className="category" onClick={(e) => handleClick(e, column.shop_access_token)}>
                      <Typography className='sector_type'>{column.sector_name}</Typography>
                      <Typography className='shop_name'>{column.business_name}</Typography>
                    </Box>
                    <DiscountPercentageSlider setOpenPopup={setOpenPopup}/>
                    <CouponsSlider />
                    
                  </Box>
                  <ServicesTypeCard />
                  <Box className="product_details">
                    <Link to={`../1234/products`}>
                      <Typography variant="h3">Category :
                        <Typography variant="span">{Array.isArray(column.category_name) ? column.category_name.join(', ') : column.category_name}</Typography>

                      </Typography>
                    </Link>
                  </Box>
                </Box>
                <Box className="sub_col_2">
                  <ShopDetails column={column} />
                  <Box className="video_container">
                  <Box component="img" src={video_frame} className="video_frame" alt="frame" />
                  <VideoPlayer url={videoUrl} />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className="col-3"></Box>
            <CardBoardPopup customPopup={true} open={openPopup} handleClose={handleClose} body_content={<PurchaseCoupon/>} optionalCName="purchase_coupon_offer_popup"/>
          </Box>
        </Box>
      ))}
      <CustomSnackbar
          open={snackbar.open}
          handleClose={() => setSnackbar({ ...snackbar, open: false })}
          message={snackbar.message}
          severity={snackbar.severity}
        />
    </>
  );
};

export default SingleShopPage;
