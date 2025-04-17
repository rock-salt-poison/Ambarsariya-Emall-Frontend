import React from 'react'
import { Box } from '@mui/material'
import Header from '../../Components/Serve/SupplyChain/Header'
import relationship_img from '../../Utils/images/Sell/esale/relationship.png'
import member_icon from '../../Utils/images/Sell/esale/life/member_icon.png'
import ScrollableTabsButton from '../../Components/ScrollableTabsButton'
import Tab_content from '../../Components/Sell/Esale/Relations/Tab_content'

function MemberRelations() {

  const tabsData = [
    {id:1, name:'Couples', content:<Tab_content relation="couples"/>},
    {id:2, name:'Siblings', content:<Tab_content relation="siblings"/>},
    {id:3, name:'Children', content:<Tab_content relation="children"/>},
    {id:4, name:'Parents', content:<Tab_content relation="parents"/>},
    {id:5, name:'Neighbors', content:<Tab_content relation="neighbors"/>},
    {id:6, name:'All Buddies', content:<Tab_content relation="all_buddies"/>},
    {id:7, name:'Direct Friends', content:<Tab_content relation="direct_friends"/>},
    {id:8, name:'Recommended People', content:<Tab_content relation="recommended_people"/>},
    {id:9, name:'Create your relation', content:''},
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