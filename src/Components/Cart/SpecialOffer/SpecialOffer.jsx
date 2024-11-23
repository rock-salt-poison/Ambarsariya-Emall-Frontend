import React from 'react'
import { Box, ThemeProvider } from '@mui/material';
import createCustomTheme from '../../../styles/CustomSelectDropdownTheme';
import special_offer_icon from '../../../Utils/images/Sell/cart/special_offers/special_offer.webp';
import Subscribe_popupContent from './Subscribe_popupContent';
import ScrollableTabsButton from '../../ScrollableTabsButton';
import { useParams } from 'react-router-dom';

function SpecialOffer() {

    const themeProps = {
      scrollbarThumb: 'var(--brown)',
      // dialogBackdropColor : '#fff',
      popoverBackgroundColor: '#f8e3cc',
    };
  
    const theme = createCustomTheme(themeProps);

    const { owner } = useParams();

    const tabsData = [
      { id: 1, name: 'Subscribe', content: <Subscribe_popupContent/> },
      { id: 2, name: 'MOU', redirectTo:`../${owner}/mou` },
    ]

  return (
    <ThemeProvider theme={theme}>
        <Box className="title_container">
            <Box component="img" alt="icon" className='icon' src={special_offer_icon}/>
        </Box>
        <Box className="body_container">
          <ScrollableTabsButton data={tabsData} scrollbarThumb2='var(--brown)' hideScrollBtn verticalTabs/>
        </Box>
    </ThemeProvider>
  )
}

export default SpecialOffer