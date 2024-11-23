import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
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

const SingleShopPage = ({ showBackButton = true, shopData }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const videoUrl = 'https://www.youtube.com/embed/m701WKQMeYQ?controls=0&modestbranding=1';

  const columns = [
    {
      shopName: 'Madhav',
      discount: '10',
      coupon: 'amall10',
      products: 'pens, textbooks, books',
      domain: 'Retailer',
      sector: 'Stationary',
      supply: 'School & Office',
      shopType: 'Class C',
      costSensitivity: 'Moderate'
    },
  ];
  
  const data = shopData ? shopData : columns;

  const handleClick = (e) => {
    navigate('../shop')
  }

  const [openPopup, setOpenPopup] = useState(false);

  const handleClose = () => {
    setOpenPopup(false);
  }

  const getImageSrc = (sector) => {
    switch (sector) {
      case 'stationary':
        return stationary_bg_img;
      case 'healthcare':
        return healthcare_bg_img;
      // case 'Electronics':
      //   return electronics_bg_img; // Use the correct image for Electronics sector
      default:
        return stationary_bg_img; // Default image if sector doesn't match
    }
  }

  return (
    <>
      {data.map((column, index) => (
        <Box key={index} className="single_shop_wrapper">
          <Box component="img" src={getImageSrc(id)} className='sector_bg_img' />
          <Box className="row">
            {showBackButton && (
              <Box className="col-1">
                <Button2 text="Back" redirectTo="../support" />
              </Box>
            )}
            <Box className="container">
              <Box className="col-2">
                <Box className="sub_col_1">
                  <Box className="shop_details" >
                    <Box className="category" onClick={(e) => handleClick(e)}>
                      <Typography className='sector_type'>{column.sector}</Typography>
                      <Typography className='shop_name'>{column.shopName}</Typography>
                    </Box>
                    <DiscountPercentageSlider setOpenPopup={setOpenPopup}/>
                    <CouponsSlider />
                    
                  </Box>
                  <ServicesTypeCard />
                  <Box className="product_details">
                    <Link to={`../1234/products`}>
                      <Typography variant="h3">Category :
                        <Typography variant="span">{column.products}</Typography>
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
    </>
  );
};

export default SingleShopPage;
