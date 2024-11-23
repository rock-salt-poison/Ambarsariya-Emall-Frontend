import React from 'react'
import { Box, ThemeProvider } from '@mui/material'
import ScrollableTabsButton from '../../../../ScrollableTabsButton'
import createCustomTheme from '../../../../../styles/CustomSelectDropdownTheme'
import Gain_PopupContent from './Gain_PopupContent'
import Loss_PopupContent from './Loss_PopupContent'

function GainsAndLosses_PopupContent(props) {

  const tabsData = [
    { id: 1, name: 'Gain on Sale of Assets', content: <Gain_PopupContent/> },
    { id: 2, name: 'Loss on Sale of Assets', content: <Loss_PopupContent/> },
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

export default GainsAndLosses_PopupContent