import React from 'react'
import { Box, ThemeProvider } from '@mui/material'
import ScrollableTabsButton from '../../../../ScrollableTabsButton'
import createCustomTheme from '../../../../../styles/CustomSelectDropdownTheme'
import Sales_PopupContent from './Sales_PopupContent';
import Payment_PopupContent from './Payment_PopupContent';

function Sales_Popup() {

  const themeProps = {
    popoverBackgroundColor: '#f8e3cc',
    scrollbarThumb: 'var(--brown)',
  };

  const theme = createCustomTheme(themeProps);

  const tabsData = [
    { id: 1, name: 'Sales Orders', content: <Sales_PopupContent/> },
    { id: 2, name: 'Itemized List of Goods/Services', content: '' },
    { id: 3, name: 'Payments', content: <Payment_PopupContent/> },
  ]

  return (
    <ThemeProvider theme={theme}>
      <Box className="assets_popup">
        <ScrollableTabsButton data={tabsData} scrollbarThumb2='var(--brown)'/>
      </Box>
    </ThemeProvider>
  )
}

export default Sales_Popup