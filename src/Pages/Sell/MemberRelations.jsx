import React from 'react'
import { Box } from '@mui/material'
import Header from '../../Components/Serve/SupplyChain/Header'
import relationship_img from '../../Utils/images/Sell/esale/relationship.png'
import member_icon from '../../Utils/images/Sell/esale/life/member_icon.png'
import ScrollableTabsButton from '../../Components/ScrollableTabsButton'
import Tab_content from '../../Components/Sell/Esale/Relations/Tab_content'
import Relations_tab_content from '../../Components/Sell/Esale/Relations/Relations_tab_content'

function MemberRelations() {

  const tabsData = [
    {id:1, name:'Couples', content:<Relations_tab_content relation='Couples'/>},
    {id:2, name:'Siblings', content:<Relations_tab_content relation='Siblings'/>},
    {id:3, name:'Children', content:<Relations_tab_content relation='Children'/>},
    {id:4, name:'Parents', content:<Relations_tab_content relation='Parents'/>},
    {id:5, name:'Neighbors', content:<Relations_tab_content relation='Neighbors'/>},
    {id:6, name:'All Buddies', content:<Relations_tab_content relation='All Buddies'/>},
    {id:7, name:'Direct Friends', content:<Relations_tab_content relation='Direct Friends'/>},
    {id:8, name:'Recommended People', content:<Relations_tab_content relation='Recommended People'/>},
    {id:9, name:'Others', content:<Relations_tab_content relation='Others'/>},
    {id:10, name:'Create your relation', content:<Tab_content relation="recommended_people"/>},
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