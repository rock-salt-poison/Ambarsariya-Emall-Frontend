import React from 'react'
import { Box, ThemeProvider } from '@mui/material'
import ScrollableTabsButton from '../../../../Components/ScrollableTabsButton'
import createCustomTheme from '../../../../styles/CustomSelectDropdownTheme'
import CouponOffers from './CouponOffers';

function CouponsPreview() {

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
      <Box className="coupons_preview">
        <ScrollableTabsButton data={tabsData} scrollbarThumb2='var(--brown)'/>
      </Box>
    </ThemeProvider>
  )
}

export default CouponsPreview