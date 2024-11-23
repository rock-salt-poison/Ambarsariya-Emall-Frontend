import React from 'react'
import { Box } from '@mui/material'
import Header from '../../../Components/Serve/SupplyChain/Header'
import stock_alarms_icon from '../../../Utils/images/Serve/emotional/analytics/stock_alarms/stock_alarms_icon.svg'
import ScrollableTabsButton from '../../../Components/ScrollableTabsButton'
import StockAlarms_PopupContent from './TabPanels/StockAlarms_PopupContent'

function StockAlarm() {

  const tabsData = [
    {id:1, name:'In-Stock', content:<StockAlarms_PopupContent/>},
    {id:2, name:'S.O - In-Stock', content:<StockAlarms_PopupContent/>},
    {id:3, name:'Group product', content:<StockAlarms_PopupContent/>},
    {id:4, name:'Update In-Stock (Price)', content:<StockAlarms_PopupContent/>},
    {id:5, name:'Exp Date / New Stock', content:<StockAlarms_PopupContent/>},
    {id:6, name:'Change in trend', content:<StockAlarms_PopupContent/>},
  ]

  return (
    <Box className='stock_alarms_wrapper'>
        <Box className="row">
            <Header back_btn_link='../emotional/analytics' next_btn_link='../emotional/analytics' title="Stock Alarms" title_container={true} redirectTo='../emotional/analytics' iconWithHeading={stock_alarms_icon}/>

            <Box className="col">
              <ScrollableTabsButton data={tabsData} scrollbarThumb2='var(--brown)' verticalTabs={true} hideScrollBtn={true}/>
            </Box>
        </Box>
    </Box>
  )
}

export default StockAlarm