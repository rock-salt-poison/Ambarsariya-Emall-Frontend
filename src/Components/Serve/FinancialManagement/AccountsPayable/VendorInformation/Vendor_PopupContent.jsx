import React from 'react'
import { Box, ThemeProvider } from '@mui/material'
import ScrollableTabsButton from '../../../../ScrollableTabsButton'
import createCustomTheme from '../../../../../styles/CustomSelectDropdownTheme'
import VendorInformation_PopupContent from './VendorInformation_PopupContent';
import ContactInformation_PopupContent from './ContactInformation_PopupContent';
import PaymentTerms_PopupContent from './PaymentTerms_PopupContent';

function Vendor_PopupContent(props) {

  const themeProps = {
    popoverBackgroundColor: props.popoverBackgroundColor || 'var(--yellow)',
    scrollbarThumb: 'var(--brown)',
  };

  const theme = createCustomTheme(themeProps);

  const tabsData = [
    { id: 1, name: 'Vendor Selection', content: <VendorInformation_PopupContent/> },
    { id: 2, name: 'Contact information', content: <ContactInformation_PopupContent/> },
    { id: 3, name: 'Payment Terms', content:<PaymentTerms_PopupContent/> },
  ]

  return (
    <ThemeProvider theme={theme}>
      <Box className="assets_popup">
        <ScrollableTabsButton data={tabsData} scrollbarThumb2='var(--brown)'/>
      </Box>
    </ThemeProvider>
  )
}

export default Vendor_PopupContent