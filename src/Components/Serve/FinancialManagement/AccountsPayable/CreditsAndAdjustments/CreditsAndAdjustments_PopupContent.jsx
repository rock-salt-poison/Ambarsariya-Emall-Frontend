import React from 'react'
import { Box, ThemeProvider } from '@mui/material'
import ScrollableTabsButton from '../../../../ScrollableTabsButton'
import createCustomTheme from '../../../../../styles/CustomSelectDropdownTheme'
import CreditAndAdjustmentsForm_PopupContent from './CreditAndAdjustmentsForm_PopupContent';

function CreditsAndAdjustments_PopupContent() {

  const themeProps = {
    popoverBackgroundColor: '#f8e3cc',
    scrollbarThumb: 'var(--brown)',
  };

  const theme = createCustomTheme(themeProps);

  const tabsData = [
    { id: 1, name: 'Credits And Adjustments', content: <CreditAndAdjustmentsForm_PopupContent/> },
  ]

  return (
    <ThemeProvider theme={theme}>
      <Box className="assets_popup">
        <ScrollableTabsButton data={tabsData} scrollbarThumb2='var(--brown)'/>
      </Box>
    </ThemeProvider>
  )
}

export default CreditsAndAdjustments_PopupContent