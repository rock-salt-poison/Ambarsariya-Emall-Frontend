import { Box, Typography } from '@mui/material'
import React from 'react'
import UserBadge from '../../UserBadge'
import plus_icon from '../../Utils/images/Socialize/citizens_main/trigger_elements/plus_icon.svg'
import arrow_icon from '../../Utils/images/Socialize/citizens_main/trigger_elements/arrow_icon.svg'
import { Link } from 'react-router-dom'

function TriggerElement() {

    const data = [ 
        {id:1, title: 'Relations'},
        {id:2, title: 'Vehicles'},
        {id:3, title: 'Hobbies'},
        {id:4, title: 'Dream plans'},
        {id:5, main:true, title: 'Trigger', arrow: [{id:'one', arrow:true},
            {id:'two', arrow:true},
            {id:'three', arrow:true},
            {id:'four', arrow:true},
            {id:'five', arrow:true},
            {id:'six', arrow:true},
            {id:'seven', arrow:true},
            {id:'eight', arrow:true},]},
        {id:6, title: 'Colors'},
        {id:7, title: 'Luxury'},
        {id:8, title: 'Home'},
        {id:9, title: 'Brands'},
    ]

  return (
    <Box className="trigger_element_wrapper">
        <Box className="row">
            <Box className="col">
                <UserBadge
                    handleLogoutClick="../../"
                    handleBadgeBgClick={-1}
                    handleLogin="login"
                />
            </Box>

            <Box className="col">
               <Box className="card_container">
                    {data?.map((card)=>{
                        return <Link className='card' key={card.id}> 
                            <Box component="img" src={plus_icon} alt="icon" className={`icon ${card.main && 'main'}`}/>
                            <Box className={`title_container ${card.main && 'main'}`}>
                                <Typography className="text">
                                    {card.title}
                                </Typography>
                            </Box>
                            {card.arrow && card?.arrow?.map((arrow)=> <Box component="img" key={arrow.id} src={arrow_icon} alt="arrow" className={`arrow_icon ${arrow.id}`}/>)}
                        </Link>
                    })}
               </Box>
            </Box>
        </Box>
    </Box>
  )
}

export default TriggerElement