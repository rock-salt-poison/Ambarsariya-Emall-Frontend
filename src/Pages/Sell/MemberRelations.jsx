import React from 'react'
import { Box } from '@mui/material'
import Header from '../../Components/Serve/SupplyChain/Header'
import relationship_img from '../../Utils/images/Sell/esale/relationship.png'
import member_icon from '../../Utils/images/Sell/esale/life/member_icon.png'
import ScrollableTabsButton from '../../Components/ScrollableTabsButton'
import Tab_content from '../../Components/Sell/Esale/Relations/Tab_content'

function MemberRelations() {

  const tabsData = [
    {id:1, name:'Couples', content:<Tab_content />},
    {id:2, name:'Siblings', content:<Tab_content />},
    {id:3, name:'Children', content:<Tab_content />},
    {id:4, name:'Parents', content:<Tab_content />},
    {id:5, name:'Neighbors', content:<Tab_content />},
    {id:6, name:'All Buddies', content:<Tab_content />},
    {id:7, name:'Direct Friends', content:<Tab_content />},
    {id:8, name:'Recommended People', content:<Tab_content />},
    {id:9, name:'Create your relation', content:<Tab_content />},
  ];

  return (
    <Box className='member_relations_wrapper'>
        <Box className="row">
            <Header icon_1={relationship_img} icon_2={member_icon} icon_1_link='../../AmbarsariyaMall/sell/user' icon_2_link='../../AmbarsariyaMall/sell/user' title="Relations" title_container={true} redirectTo='../../AmbarsariyaMall/sell/esale'/>

            <Box className="col">
              <ScrollableTabsButton data={tabsData} scrollbarThumb2='var(--brown)' verticalTabs={true} hideScrollBtn={true}/>
            </Box>
        </Box>
    </Box>
  )
}

export default MemberRelations