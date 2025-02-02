import React from 'react'
import { Box, ThemeProvider } from '@mui/material'
import ScrollableTabsButton from '../../../../ScrollableTabsButton'
import createCustomTheme from '../../../../../styles/CustomSelectDropdownTheme'
import AgingOfPayableForm_PopupContent from './AgingOfPayableForm_PopupContent';
import ReconciliationForm_PopupContent from './ReconciliationForm_PopupContent';

function AgingOfPayable_PopupContent() {

  const themeProps = {
    popoverBackgroundColor: '#f8e3cc',
    scrollbarThumb: 'var(--brown)',
  };

  const theme = createCustomTheme(themeProps);

  const tabsData = [
    { id: 1, name: 'Aging of Payable', content: <AgingOfPayableForm_PopupContent/> },
    { id: 2, name: 'Reconciliation', content: <ReconciliationForm_PopupContent/> },
  ]

  return (
    <ThemeProvider theme={theme}>
      <Box className="assets_popup">
        <ScrollableTabsButton data={tabsData} scrollbarThumb2='var(--brown)'/>
      </Box>
    </ThemeProvider>
  )
}

export default AgingOfPayable_PopupContent