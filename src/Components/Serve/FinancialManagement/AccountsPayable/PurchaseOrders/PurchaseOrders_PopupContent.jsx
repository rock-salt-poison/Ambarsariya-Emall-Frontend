import React from 'react'
import { Box, ThemeProvider } from '@mui/material'
import ScrollableTabsButton from '../../../../ScrollableTabsButton'
import createCustomTheme from '../../../../../styles/CustomSelectDropdownTheme'
import PoNumber_PopupContent from './PoNumber_PopupContent';
import ApprovalStatus_PopupContent from './ApprovalStatus_PopupContent';

function PurchaseOrders_PopupContent(props) {

  const themeProps = {
    popoverBackgroundColor: '#f8e3cc',
    scrollbarThumb: 'var(--brown)',
  };

  const theme = createCustomTheme(themeProps);

  const tabsData = [
    { id: 1, name: 'P.O Number', content: <PoNumber_PopupContent/> },
    { id: 2, name: 'Approval Status', content: <ApprovalStatus_PopupContent/> },
  ]

  return (
    <ThemeProvider theme={theme}>
      <Box className="assets_popup">
        <ScrollableTabsButton data={tabsData} scrollbarThumb2='var(--brown)'/>
      </Box>
    </ThemeProvider>
  )
}

export default PurchaseOrders_PopupContent