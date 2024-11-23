import React from 'react'
import { Box, ThemeProvider } from '@mui/material'
import ScrollableTabsButton from '../../../../ScrollableTabsButton'
import createCustomTheme from '../../../../../styles/CustomSelectDropdownTheme'
import Drawings_PopupContent from './Drawings_PopupContent'
import Dividends_PopupContent from './Dividends_PopupContent'

function DrawingsOrDividends_PopupContent(props) {

  const tabsData = [
    { id: 1, name: 'Drawings', content: <Drawings_PopupContent/> },
    { id: 2, name: 'Dividends', content: <Dividends_PopupContent /> },
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

export default DrawingsOrDividends_PopupContent