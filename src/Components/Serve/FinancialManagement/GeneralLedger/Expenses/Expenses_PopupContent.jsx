import React from 'react'
import { Box, ThemeProvider } from '@mui/material'
import ScrollableTabsButton from '../../../../ScrollableTabsButton'
import createCustomTheme from '../../../../../styles/CustomSelectDropdownTheme'
import CostOfGoodsSold_PopupContent from './CostOfGoodsSold_PopupContent'
import OperatingExpenses_PopupContent from './OperatingExpenses_PopupContent'
import Depreciation_PopupContent from './Depreciation_PopupContent'
import InterestExpenses_PopupContent from './InterestExpenses_PopupContent'

function Expenses_PopupContent(props) {

  const tabsData = [
    { id: 1, name: 'Cost of Goods Sold', content: <CostOfGoodsSold_PopupContent /> },
    { id: 2, name: 'Operating Expenses', content: <OperatingExpenses_PopupContent/> },
    { id: 3, name: 'Depreciation', content: <Depreciation_PopupContent/> },
    { id: 4, name: 'Interest Expense', content: <InterestExpenses_PopupContent/> },
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

export default Expenses_PopupContent