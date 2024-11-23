import React from 'react'
import { Box, Typography } from '@mui/material'
import btn_bg from '../../../Utils/images/Sell/cart/co_helper/btn_bg.png'
import icon from '../../../Utils/images/Sell/cart/co_helper/icon.webp'
import { Link } from 'react-router-dom'

function CoHelper() {
    const list_items = [
        {id:1, title:'Marketing and Sales Support'},
        {id:2, title:'Research and development'},
        {id:3, title:'Finance and insurance'},
        {id:4, title:'Facility management'},
        {id:5, title:'Human Resources and Staffing'},
        {id:6, title:'Logistics and Supply Chain Management'},
        {id:7, title:'Industrial Equipment and Machinery'},
        {id:8, title:'Information Technology and Automation'},
        {id:9, title:'Quality Control and Testing Services'},
        {id:10, title:'Environmental and Waste Management'},
        {id:11, title:'Engineering and Design Services'},
    ];

    const handleClick = (e, list) => {
        const target = e.target.closest(".list");
        if(target){
            target.classList.add('reduceSize3');

            setTimeout(()=>{target.classList.remove('reduceSize3')}, 300)
        }
    }
  return (
    <>
        <Box className="title_container">
            <Typography className="title">Co-Helper</Typography>
        </Box>
        <Box className="body_container">
            {list_items.map((list)=>{
                return <Link className="list" key={list.id} onClick={(e)=> handleClick(e, list)}>
                    <Box component="img" src={btn_bg} className='list_bg' alt="bg"/>
                    <Typography className='list_title'>{list.title}</Typography>
                </Link>
            })}
        </Box>
    </>
  )
}

export default CoHelper