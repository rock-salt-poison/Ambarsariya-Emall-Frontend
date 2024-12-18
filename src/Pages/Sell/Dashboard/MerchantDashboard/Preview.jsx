import React from 'react'
import { Box, ThemeProvider, Typography } from '@mui/material'
import Button2 from '../../../../Components/Home/Button2'
import ScrollableTabsButton from '../../../../Components/ScrollableTabsButton'
import EshopForm from '../../../../Components/Form/EshopForm';
import createCustomTheme from '../../../../styles/CustomSelectDropdownTheme';
import BookEshopForm from '../../../../Components/Form/BookEshopForm';
import PaginationControlled from './PaginationControlled';

function Preview() {

  const themeProps = {
    scrollbarThumb: 'var(--brown)',
    popoverBackgroundColor: '#f8e3cc',
  };

  const theme = createCustomTheme(themeProps);

  const tabsData = [
    // {id:1, name:'E-shop', content:<BookEshopForm editable={false}/>},
    {id:1, name:'E-shop', content:<PaginationControlled pageLabels = {[<BookEshopForm editable={false}/>, <EshopForm editable={false}/>, 'DiscountCoupons']}/>},
    {id:2, name:'Subscriptions', content:''},
    {id:3, name:'Coupons', content:''},
    {id:4, name:'Last stock update', content:''},
  ];

  return (
    <ThemeProvider theme={theme}>
    <Box className="preview_wrapper">
      <Box className="row">
        <Box className="col">
            <Button2 text="Back" redirectTo={-1} />
            <Box className="sub-col">
              <Box className="title">
                <Typography className='shop_name'>Madhav Stationary</Typography>

                <Box className="domain_sector">
                  <Typography>
                    <Typography component="span" className='heading'>Domain: </Typography>
                    Retail
                  </Typography>
                  <Typography>
                    <Typography component="span" className='heading'>Sector: </Typography>
                    Wholesale
                  </Typography>

                </Box>
              </Box>
            </Box>
            <Box/>
        </Box>

        <Box className="col">
          <ScrollableTabsButton data={tabsData} scrollbarThumb2='var(--brown)' verticalTabs={true} hideScrollBtn={true}/>
        </Box>
      </Box>
    </Box>
    </ThemeProvider>
  )
}

export default Preview