import React from 'react'
import { Box, ThemeProvider } from '@mui/material'
import ScrollableTabsButton from '../../../../ScrollableTabsButton'
import createCustomTheme from '../../../../../styles/CustomSelectDropdownTheme'
import ShowUnclearedDues from './ShowUnclearedDues';
import OverdueReceivables from './OverdueReceivables';
import DSO from './DSO';

function AgingOfReceivableLedger_Popup() {

  const themeProps = {
    popoverBackgroundColor: '#f8e3cc',
    scrollbarThumb: 'var(--brown)',
  };

  const theme = createCustomTheme(themeProps);

  const tabsData = [
    { id: 1, name: 'Show Uncleared Dues', content: <ShowUnclearedDues/> },
    { id: 2, name: 'Overdue Receivables', content: <OverdueReceivables/> },
    { id: 3, name: 'Days Sale Outstanding (DSO)', content: <DSO/> },
  ]

  return (
    <ThemeProvider theme={theme}>
      <Box className="assets_popup">
        <ScrollableTabsButton data={tabsData} scrollbarThumb2='var(--brown)'/>
      </Box>
    </ThemeProvider>
  )
}

export default AgingOfReceivableLedger_Popup