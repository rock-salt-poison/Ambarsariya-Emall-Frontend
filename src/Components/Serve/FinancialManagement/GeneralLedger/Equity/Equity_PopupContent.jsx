import React from 'react'
import { Box, ThemeProvider } from '@mui/material'
import ScrollableTabsButton from '../../../../ScrollableTabsButton'
import OwnersEquity_PopupContent from './OwnersEquity_PopupContent'
import RetainedEarnings_PopupContent from './RetainedEarnings_PopupContent'
import createCustomTheme from '../../../../../styles/CustomSelectDropdownTheme'

function Equity_PopupContent(props) {

  const themeProps = {
    popoverBackgroundColor: props.popoverBackgroundColor || 'var(--yellow)',
    scrollbarThumb: 'var(--brown)',
  };

  const theme = createCustomTheme(themeProps);

  const tabsData = [
    { id: 1, name: 'Owner’s Equity/Capital', content: <OwnersEquity_PopupContent /> },
    { id: 2, name: 'Retained Earnings', content: <RetainedEarnings_PopupContent /> },
  ]

  return (
    <ThemeProvider theme={theme}>
      <Box className="assets_popup">
        <ScrollableTabsButton data={tabsData} />
      </Box>
    </ThemeProvider>
  )
}

export default Equity_PopupContent