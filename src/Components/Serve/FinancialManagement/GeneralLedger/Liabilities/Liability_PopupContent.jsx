import React from 'react'
import { Box, ThemeProvider } from '@mui/material'
import ScrollableTabsButton from '../../../../ScrollableTabsButton'
import AccountsPayable_PopupContent from './AccountsPayable_PopupContent'
import LoansPayable_PopupContent from './LoansPayable_PopupContent'
import AccruedLiabilities_PopupContent from './AccruedLiabilities_PopupContent'
import createCustomTheme from '../../../../../styles/CustomSelectDropdownTheme'

function Liability_PopupContent(props) {

    const tabsData=[
        {id:1, name:'Accounts Payable', content:<AccountsPayable_PopupContent/>},
        {id:2, name:'Loans Payable', content:<LoansPayable_PopupContent/>},
        {id:3, name:'Accrued Liabilities', content:<AccruedLiabilities_PopupContent/>},
    ]

    const themeProps = {
      popoverBackgroundColor: props.popoverBackgroundColor || 'var(--yellow)',
      scrollbarThumb: 'var(--brown)',
  };

  const theme = createCustomTheme(themeProps);
  return (
    <ThemeProvider theme={theme}>
    <Box className="assets_popup">
        <ScrollableTabsButton data={tabsData}/>
    </Box>
    </ThemeProvider>
  )
}

export default Liability_PopupContent