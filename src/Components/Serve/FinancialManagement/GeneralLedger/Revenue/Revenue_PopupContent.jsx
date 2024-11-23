import React from 'react'
import { Box, ThemeProvider } from '@mui/material'
import ScrollableTabsButton from '../../../../ScrollableTabsButton'
import Sales_PopupContent from './Sales_PopupContent'
import OtherIncome_PopupContent from './OtherIncome_PopupContent'
import createCustomTheme from '../../../../../styles/CustomSelectDropdownTheme'

function Revenue_PopupContent(props) {

  const tabsData = [
    { id: 1, name: 'Sales Revenue', content: <Sales_PopupContent /> },
    { id: 2, name: 'Other Income', content: <OtherIncome_PopupContent /> },
  ]

  const themeProps = {
    popoverBackgroundColor: props.popoverBackgroundColor || 'var(--yellow)',
    scrollbarThumb: 'var(--brown)',
  };

  const theme = createCustomTheme(themeProps);

  return (
    <ThemeProvider theme={theme}>
      <Box className="assets_popup">
        <ScrollableTabsButton data={tabsData} />
      </Box>
    </ThemeProvider>
  )
}

export default Revenue_PopupContent