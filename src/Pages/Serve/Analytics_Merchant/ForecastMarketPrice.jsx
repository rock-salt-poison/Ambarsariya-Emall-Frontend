import React from 'react'
import { Box } from '@mui/material'
import Header from '../../../Components/Serve/SupplyChain/Header'
import forecast_market_price_icon from '../../../Utils/images/Serve/emotional/analytics/forecast_market_price/forecast_market_price_icon.svg'
import ScrollableTabsButton from '../../../Components/ScrollableTabsButton'
import StandardMarketPrice from './TabPanels/StandardMarketPrice'

function ForecastMarketPrice() {

  const tabsData = [
    {id:1, name:'Standard Market Price', content:<StandardMarketPrice/>},
    {id:2, name:'Custom Market Price', content:<StandardMarketPrice/>},
  ]

  return (
    <Box className='forecast_market_price_wrapper'>
        <Box className="row">
            <Header back_btn_link='../emotional/analytics' next_btn_link='../emotional/analytics' title="Forecast Market Price" title_container={true} redirectTo='../emotional/analytics' iconWithHeading={forecast_market_price_icon}/>

            <Box className="col">
              <ScrollableTabsButton data={tabsData} scrollbarThumb2='var(--brown)' hideScrollBtn={true}/>
            </Box>
        </Box>
    </Box>
  )
}

export default ForecastMarketPrice