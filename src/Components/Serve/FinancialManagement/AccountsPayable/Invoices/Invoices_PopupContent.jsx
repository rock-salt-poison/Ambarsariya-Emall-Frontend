import React from 'react'
import { Box, ThemeProvider } from '@mui/material'
import ScrollableTabsButton from '../../../../ScrollableTabsButton'
import createCustomTheme from '../../../../../styles/CustomSelectDropdownTheme'
import InvoiceDetail_PopupContent from './InvoiceDetail_PopupContent';
// import DescriptionOfGoods_PopupContent from './DescriptionOfGoods_PopupContent';
// import PurchaseOrder_PopupContent from './PurchaseOrder_PopupContent';

function Invoices_PopupContent(props) {

  const themeProps = {
    popoverBackgroundColor: props.popoverBackgroundColor || 'var(--yellow)',
    scrollbarThumb: 'var(--brown)',
  };

  const theme = createCustomTheme(themeProps);

  const tabsData = [
    { id: 1, name: 'Show Invoices', content: <InvoiceDetail_PopupContent/> },
    // { id: 2, name: 'Description of Goods/Services', content: <DescriptionOfGoods_PopupContent/> },
    // { id: 3, name: 'Purchase Order', content:<PurchaseOrder_PopupContent/> },
  ]

  return (
    <ThemeProvider theme={theme}>
      <Box className="assets_popup">
        <ScrollableTabsButton data={tabsData} scrollbarThumb2='var(--brown)'/>
      </Box>
    </ThemeProvider>
  )
}

export default Invoices_PopupContent