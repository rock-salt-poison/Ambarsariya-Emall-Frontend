import React from 'react'
import { Box } from '@mui/material'
import Header from '../../../Components/Serve/SupplyChain/Header'
import market_price_icon from '../../../Utils/images/Serve/emotional/analytics/market_price/market_price_icon.svg'
import ScrollableTabsButton from '../../../Components/ScrollableTabsButton'
import StandardPriceBooks from './TabPanels/StandardPriceBooks'
import CustomPriceBooks from './TabPanels/CustomPriceBooks'

function MarketPrice() {

  const tabsData = [
    {id:1, name:'Standard Price Books', content:<StandardPriceBooks/>},
    {id:2, name:'Custom Price Books', content:<CustomPriceBooks/>},
  ]

  return (
    <Box className='market_price_wrapper'>
        <Box className="row">
            <Header back_btn_link='../emotional/analytics' next_btn_link='../emotional/analytics' title="Market Price" title_container={true} redirectTo='../emotional/analytics' iconWithHeading={market_price_icon}/>

            <Box className="col">
              <ScrollableTabsButton data={tabsData} scrollbarThumb2='var(--brown)' verticalTabs={true} hideScrollBtn={true}/>
            </Box>
        </Box>
    </Box>
  )
}

export default MarketPrice