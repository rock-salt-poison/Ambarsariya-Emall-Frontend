import React from 'react'
import { Box } from '@mui/material'
import Header from '../../../Components/Serve/SupplyChain/Header'
import overheads_icon from '../../../Utils/images/Serve/emotional/analytics/overheads/overheads_icon.svg'
import ScrollableTabsButton from '../../../Components/ScrollableTabsButton'
import AccountsPayable from './TabPanels/AccountsPayable'

function Overheads() {

  const tabsData = [
    {id:1, name:'Account Payable', content:<AccountsPayable/>},
    {id:2, name:'Loan Payable', content:<AccountsPayable/>},
    {id:3, name:'Accrued Liabilities', content:<AccountsPayable/>},
    {id:4, name:'Cost of Goods sold', content:<AccountsPayable/>},
    {id:5, name:'Operating Expenses', content:<AccountsPayable/>},
  ]
  
  return (
    <Box className='overheads_wrapper'>
        <Box className="row">
            <Header back_btn_link='../emotional/analytics' next_btn_link='forecast-market-price' title="Overheads" title_container={true} redirectTo='../emotional/analytics' iconWithHeading={overheads_icon}/>

            <Box className="col">
              <ScrollableTabsButton data={tabsData} scrollbarThumb2='var(--brown)' verticalTabs={true} hideScrollBtn={true}/>
            </Box>
        </Box>
    </Box>
  )
}

export default Overheads