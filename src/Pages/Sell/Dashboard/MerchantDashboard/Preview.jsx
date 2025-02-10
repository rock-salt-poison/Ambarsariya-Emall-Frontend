import React, { useEffect, useState } from 'react'
import { Box, CircularProgress, ThemeProvider, Typography } from '@mui/material'
import Button2 from '../../../../Components/Home/Button2'
import ScrollableTabsButton from '../../../../Components/ScrollableTabsButton'
import EshopForm from '../../../../Components/Form/EshopForm';
import createCustomTheme from '../../../../styles/CustomSelectDropdownTheme';
import BookEshopForm from '../../../../Components/Form/BookEshopForm';
import PaginationControlled from './PaginationControlled';
import SubscriptionsPreview from './SubscriptionsPreview';
import CouponsPreview from './CouponsPreview';
import UserBadge from '../../../../UserBadge';
import { useNavigate, useParams } from 'react-router-dom';
import { getShopUserData } from '../../../../API/fetchExpressAPI';

function Preview() {

  const themeProps = {
    scrollbarThumb: 'var(--brown)',
    popoverBackgroundColor: '#f8e3cc',
  };

  const theme = createCustomTheme(themeProps);
  const [shop, setShop] = useState(null);
  const {token, edit} = useParams();
  const navigate = useNavigate();
  
  const [loading , setLoading] = useState(false);

  const tabsData = [
    // {id:1, name:'E-shop', content:<BookEshopForm editable={false}/>},
    {id:1, name:'E-shop', content:<PaginationControlled pageLabels = {[<BookEshopForm editable={false}/>, <EshopForm editable={false}/>, 'DiscountCoupons']}/>},
    {id:2, name:'Subscriptions', content:<SubscriptionsPreview/>},
    {id:3, name:'Coupons', content:<CouponsPreview />},
    {id:4, name:'Last stock update', content:''},
  ];
  

  useEffect(() => {
    if (!token) {
      navigate('../login');
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const resp = await getShopUserData(token);
        if (resp?.length > 0) {
          setShop(resp[0]);
        } else {
          navigate('../login');
        }
      } catch (error) {
        console.error("Error fetching shop data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, navigate]);

  return (
    <ThemeProvider theme={theme}>
    <Box className="preview_wrapper">
      {loading && <Box className="loading"><CircularProgress/></Box>  }
      {shop ? <Box className="row">
        <Box className="col">
          <Box></Box>
            {/* <Button2 text="Back" redirectTo={-1} /> */}
            <Box className="sub-col">
              <Box className="title">
                <Typography className='shop_name'>{shop?.business_name}</Typography>

                <Box className="domain_sector">
                  <Typography>
                    <Typography component="span" className='heading'>Domain: </Typography>
                    {shop?.domain_name}
                  </Typography>
                  <Typography>
                    <Typography component="span" className='heading'>Sector: </Typography>
                    {shop?.sector_name}
                  </Typography>

                </Box>
              </Box>
            </Box>
            <UserBadge
                handleBadgeBgClick={-1}
                handleLogin="../login"
                handleLogoutClick="../../AmbarsariyaMall"
            />
            <Box/>
        </Box>

        <Box className="col">
          <ScrollableTabsButton data={tabsData} scrollbarThumb2='var(--brown)' verticalTabs={true} hideScrollBtn={true}/>
        </Box>
      </Box>: null}
    
    </Box>
    </ThemeProvider>
  )
}

export default Preview