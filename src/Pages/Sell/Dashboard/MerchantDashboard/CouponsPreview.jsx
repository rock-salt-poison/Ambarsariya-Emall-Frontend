import React, { useEffect, useState } from 'react'
import { Box, CircularProgress, ThemeProvider } from '@mui/material'
import ScrollableTabsButton from '../../../../Components/ScrollableTabsButton'
import createCustomTheme from '../../../../styles/CustomSelectDropdownTheme'
import CouponOffers from './CouponOffers';
import { get_coupons, getUser } from '../../../../API/fetchExpressAPI';
import { useSelector } from 'react-redux';

function CouponsPreview() {
  
  const token = useSelector((state)=> state.auth.userAccessToken);
  const [loading, setLoading]= useState(false);
  const [coupons, setCoupons] = useState([]);

  useEffect(()=>{
    if(token){
      getDiscountCoupons(token);
    }
  }, [token])

  const getDiscountCoupons = async (token) => {
    try{
      setLoading(true);
      const ShopNo =  ((await getUser(token))?.find(u => u?.shop_no !== null))?.shop_no;
      if(ShopNo){
        const discountCoupons = await get_coupons(ShopNo);
        if(discountCoupons?.valid){
          setCoupons(discountCoupons?.data);
          console.log(discountCoupons?.data);
        }
      }
    }catch(e){

    }finally{
      setLoading(false);
    }
  }

  const themeProps = {
    popoverBackgroundColor: '#f8e3cc',
    scrollbarThumb: 'var(--brown)',
  };

  const theme = createCustomTheme(themeProps);

  const data = {
    retailer:[
        {id:1, name:'Upto', items:8},
        {id:2, name:'Flat', items:5},
        {id:3, name:'Freebies', items:8},
    ],
    loyalty:[
        {id:1, name:'Daily', items:5},
        {id:2, name:'Weekly', items:8},
        {id:3, name:'Monthly', items:5},
        {id:4, name:'Customizable', items:8},
    ],
    subscription:[
        {id:1, name:'Unlock', items:8},
        {id:2, name:'Bonus', items:5},
        {id:3, name:'Customer', items:8},
        {id:4, name:'Prepaid', items:5},
    ],
    customizable:[
        {id:1, name:'Stock clearance', items:5},
        {id:2, name:'Festival Offer', items:8},
        {id:3, name:'Hot sale', items:5},
    ],
  }

  const tabsData = [
    { id: 1, name: 'Retailer', content: <CouponOffers data={data['retailer']}/> },
    { id: 2, name: 'Loyalty', content: <CouponOffers data={data['loyalty']}/> },
    { id: 3, name: 'Subscription', content: <CouponOffers data={data['subscription']}/> },
    { id: 4, name: 'Customizable', content: <CouponOffers data={data['customizable']}/> },
  ]

  return (
    <ThemeProvider theme={theme}>
      {loading && <Box className="loading"><CircularProgress/></Box> }
      <Box className="coupons_preview">
        <ScrollableTabsButton data={tabsData} scrollbarThumb2='var(--brown)'/>
      </Box>
    </ThemeProvider>
  )
}

export default CouponsPreview