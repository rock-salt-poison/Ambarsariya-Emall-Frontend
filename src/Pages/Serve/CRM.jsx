import React from 'react'
import { Box, Typography } from '@mui/material'
import circle_icon from '../../Utils/images/Serve/emotional/crm/circle.png'
import { Link } from 'react-router-dom'
import Header from '../../Components/Serve/SupplyChain/Header'

function CRM() {

  const data = [
    {id:1, title:'Customer Records', linkTo:'customer-records'},
    {id:2, title:'Member group creation', linkTo:'member-group-creation'},
    {id:3, title:'Sales Pipeline', linkTo:'sales-pipeline'},
    {id:4, title:'Marketing Campaigns', linkTo:'marketing-campaigns'},
  ]

  return (
    <Box className="crm_wrapper">
      <Box className="row">
        <Header back_btn_link='../emotional/analytics' next_btn_link="../emotional/campaign" title_container={true} title="Customer Service & Support" redirectTo='../emotional'/>
        <Box className="col">
            <Box className="cards_container">
                {data.slice(0,2).map((card)=>{
                  return <Link className="card" key={card.id} to={card.linkTo}>
                    <Box component="img" src={circle_icon} alt="circle" className='card_img'/>
                    <Box className="card_title_container">
                      <Typography className='card_title'>{card.title}</Typography>
                    </Box>
                  </Link>
                })}
                
            </Box>
            <Box className="cards_container">
                {data.slice(2,5).map((card)=>{
                  return <Link className="card" key={card.id} to={card.linkTo}>
                    <Box component="img" src={circle_icon} alt="circle" className='card_img'/>
                    <Box className="card_title_container">
                      <Typography className='card_title'>{card.title}</Typography>
                    </Box>
                  </Link>
                })}
            </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default CRM