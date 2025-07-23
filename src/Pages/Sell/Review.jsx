import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, FormControlLabel, Rating, styled, Typography } from '@mui/material';
import price_effective from '../../Utils/images/Sell/order_details/price_effective.svg';
import quality_of_compliance from '../../Utils/images/Sell/order_details/quality_of_compliance.svg';
import quality_of_service from '../../Utils/images/Sell/order_details/quality_of_service.svg';
import like_share_icon from '../../Utils/images/Sell/order_details/like_share_icon.webp';
import subscribe_gif from '../../Utils/gifs/subscribe.gif';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getMemberEshopReview, getUser, postEshopReview } from '../../API/fetchExpressAPI';
import CustomSnackbar from '../../Components/CustomSnackbar';
 
// Custom icon component

const CustomIcon = ({ size, imgSrc }) => (
  <Box
    component="img"
    src={imgSrc}
    alt="rating"
    sx={{
      width: size,
      height: size,
    }}
  />
);

// Custom Rating component with custom icon and styles
const StyledRating = styled(Rating)({
  '& .MuiRating-iconEmpty': {
    opacity: 0.6, // Default opacity for empty icons
  },
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

const iconSizes = [35, 45, 55, 65];

const RenderRow = ({ imgSrc, title, subscribe, like_share, id, onChange, value=0 }) => {

  return (
    <Box className="detail_row">
      <Box className="col_1">
        <Typography className="return_steps">{title}</Typography>
      </Box>
      <Box className="col_1" textAlign="right">
        {imgSrc && 
          <StyledRating
            name={`rating-${title}`}
            // defaultValue={0}
            value={value}
            getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
            precision={1}
            className="styledRatings"
            max={4}
            icon={<CustomIcon size={iconSizes[0]} imgSrc={imgSrc} />}
            emptyIcon={<CustomIcon size={iconSizes[0]} sx={{ opacity: 0.4 }} imgSrc={imgSrc} />}
            IconContainerComponent={({ value, ...props }) => {
              const size = iconSizes[value - 1];
              return <span {...props}><CustomIcon size={size} imgSrc={imgSrc} /></span>;
            }}
            onChange={(e, newValue)=>onChange(title, newValue)}
          />
        }

        {
          subscribe && <Link to={`../${id}/subscribe`}>
            <Box component="img" src={subscribe_gif} className='subscribe' alt="subscribe"/>
          </Link>
        }

        {like_share && <Link to={`../${id}/like-and-share`}>
            <Box component="img" src={like_share_icon} className='subscribe' alt="subscribe"/>
          </Link>}
        
      </Box>
    </Box>
  );
};

function Review() {
  const {owner, action} = useParams();

  const token = useSelector((state) => state.auth.userAccessToken);
  const [sellerData, setSellerData] = useState(null);
  const [buyerData, setBuyerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  
  const [ratings, setRatings] = useState({
    'Price Effective': 0,
    'Quality of Compliance': 0,
    'Quality of Service': 0,
  });

  const handleRatingChange = (title, newValue) => {
    setRatings(prev => ({ ...prev, [title]: newValue }));
  };

  const get_buyer_data = async (buyer_token) => {
    try{
      setLoading(true);
      const resp = (await getUser(buyer_token))?.find((u)=>u.member_id !== null);
      setBuyerData(resp);      
    }catch(e){
      console.log(e);
    }finally{
      setLoading(false);
    }
  }
  
  const get_seller_data = async (seller_token) => {
    try{
      setLoading(true);
      const resp = (await getUser(seller_token))?.find((u)=>u.shop_no !== null);
      setSellerData(resp);
    }catch(e){
      console.log(e);
    }finally{
      setLoading(false);
    }
  }

  const get_member_shop_reviews = async (data) => {
    try{
      setLoading(true);
      
      const resp = await getMemberEshopReview(data);
      if(resp?.data){
        console.log(resp?.data);
        
        setRatings((prev)=>(
          {...prev,
            "Price Effective": resp?.data?.price_effective,
            "Quality of Compliance": resp?.data?.quality_of_compliance,
            "Quality of Service": resp?.data?.quality_of_service
          }
        ))
      }
    }catch(e){
      console.log(e);
    }finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    if(token){
      get_buyer_data(token);
    }
  },[token]);

  useEffect(()=>{
    if(sellerData && buyerData){
      get_member_shop_reviews({shop_no: sellerData?.shop_no, reviewer_id: buyerData?.member_id });
    }
  }, [sellerData, buyerData])

  useEffect(()=>{
    if(owner){
      get_seller_data(owner);
    }
  },[owner]);

  const update_review = async (data) => {
    try{
      setLoading(true);
      const resp = await postEshopReview(data);
      console.log(resp);
      setSnackbar({
          open: true,
          message: resp?.message,
          severity: "success",
        });
    }catch(e){
      console.log(e);
    }finally{
      setLoading(false);
    }
  }

  const handleSubmit = () => {
    if (!sellerData || !buyerData) return;

    const data = {
      shop_no: sellerData?.shop_no,
      reviewer_id: buyerData?.member_id,
      review_date: new Date().toLocaleDateString(),
      price_effective: ratings?.['Price Effective'],
      quality_of_compliance: ratings?.['Quality of Compliance'],
      quality_of_service: ratings?.['Quality of Service'],
      user_type: buyerData?.user_type 
    };

    if(data){
      update_review(data);
    }
  }



  return (
    <Box className="details">
      {loading && <Box className="loading"><CircularProgress/></Box> }
      <RenderRow title="Price Effective" imgSrc={price_effective} onChange={handleRatingChange} value={ratings['Price Effective']}/>
      <RenderRow title="Quality of Compliance" imgSrc={quality_of_compliance} onChange={handleRatingChange} value={ratings['Quality of Compliance']}/>
      <RenderRow title="Quality of Service" imgSrc={quality_of_service} onChange={handleRatingChange} value={ratings['Quality of Service']}/>
      <RenderRow title="Presentable to Share"  like_share={true} id={owner}/>
      <RenderRow title="Subscribe"  subscribe={true} id={owner}/>
      <Box className="submit_button_container">
        <Button onClick={handleSubmit} className='submit_button'>Submit</Button>
      </Box>

      <CustomSnackbar
        open={snackbar.open}
        handleClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        severity={snackbar.severity}
        disableAutoHide={true}
      />
      {/*  */}
    </Box>
  );
}

export default Review;
