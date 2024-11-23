import React from 'react'
import { Box } from '@mui/material'
import Header from '../../Components/Serve/SupplyChain/Header'
import life_icon from '../../Utils/images/Sell/esale/life/life_icon.png'
import member_icon from '../../Utils/images/Sell/esale/life/member_icon.png'
import ScrollableTabsButton from '../../Components/ScrollableTabsButton'
import Community_tab_content from '../../Components/Sell/Esale/Life/Community_tab_content'
import Sharelevel_tab_content from '../../Components/Sell/Esale/Life/Sharelevel_tab_content'
import Authenticationlevel_tab_content from '../../Components/Sell/Esale/Life/Authenticationlevel_tab_content'
import SearchProfile_tab_content from '../../Components/Sell/Esale/Life/SearchProfile_tab_content'
import OrderDetails_tab_content from '../../Components/Sell/Esale/Life/OrderDetails_tab_content'

function Life() {

  const communityData = [
    {id:1, 
      heading : 'Technology & Innovation Communities',
      topics:[
        'Tech Innovators Hub',
        'Code Masters Collective',
        'AI Enthusiasts Network',
      ]
    },
    {id:2, 
      heading : 'Technology & Innovation Communities',
      topics:[
        'Tech Innovators Hub',
        'Code Masters Collective',
        'AI Enthusiasts Network',
      ]
    },
    {id:3, 
      heading : 'Technology & Innovation Communities',
      topics:[
        'Tech Innovators Hub',
        'Code Masters Collective',
        'AI Enthusiasts Network',
      ]
    }
  ]

  const eventsData = [
    { id:1, 
      heading : 'Event type 1',
      topics:[
        'Tech Innovators Hub',
        'Code Masters Collective',
        'AI Enthusiasts Network',
      ]
    }
  ]

  const tabsData = [
    {id:1, name:'Community', content:<Community_tab_content title="Community" communityData ={communityData}/>},
    {id:2, name:'Events', content:<Community_tab_content title="Events" communityData ={eventsData}/>},
    {id:3, name:'Share Level (Author)', content:<Sharelevel_tab_content title="Share Level (Author)" />},
    {id:4, name:'Authentication level', content:<Authenticationlevel_tab_content title="Authentication level" />},
    {id:5, name:'Search profile by phone no.', content:<SearchProfile_tab_content title="Search profile by phone no." />},
    {id:6, name:'Order History/Status/complaints', content:<OrderDetails_tab_content title="Order History/Status/complaints" />},
  ]
  return (
    <Box className='life_wrapper'>
        <Box className="row">
            <Header icon_1={life_icon} icon_2={member_icon} icon_1_link='../esale' icon_2_link='../user' title="Citizen dashboard" title_container={true} redirectTo='../esale'/>

            <Box className="col">
              <ScrollableTabsButton data={tabsData} scrollbarThumb2='var(--brown)' verticalTabs={true} hideScrollBtn={true}/>
            </Box>
        </Box>
    </Box>
  )
}

export default Life