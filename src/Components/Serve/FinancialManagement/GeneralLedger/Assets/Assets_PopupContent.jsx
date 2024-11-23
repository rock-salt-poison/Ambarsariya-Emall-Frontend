import React from 'react'
import { Box, ThemeProvider } from '@mui/material'
import ScrollableTabsButton from '../../../../ScrollableTabsButton'
import Cash_PopupContent from './Cash_PopupContent'
import AccountsReceivable_PopupContent from './AccountsReceivable_PopupContent'
import Inventory_PopupContent from './Inventory_PopupContent'
import FixedAssets_PopupContent from './FixedAssets_PopupContent'
import PrepaidExpenses_PopupContent from './PrepaidExpenses_PopupContent'
import createCustomTheme from '../../../../../styles/CustomSelectDropdownTheme'

function Assets_PopupContent(props) {

    const tabsData=[
        {id:1, name:'Cash', content:<Cash_PopupContent/>},
        {id:2, name:'Accounts Receivable', content:<AccountsReceivable_PopupContent/>},
        {id:3, name:'Inventory', content:<Inventory_PopupContent/>},
        {id:4, name:'Fixed Assets', content:<FixedAssets_PopupContent/>},
        {id:5, name:'Prepaid Expenses', content:<PrepaidExpenses_PopupContent/>},
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

export default Assets_PopupContent