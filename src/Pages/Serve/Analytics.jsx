import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import Button2 from '../../Components/Home/Button2'
import bar_graph from '../../Utils/gifs/bar_graph.gif';
import return_on_investment from '../../Utils/images/Serve/emotional/analytics/return_on_investment.webp';
import forecast from '../../Utils/images/Serve/emotional/analytics/forecast.webp';
import overheads from '../../Utils/images/Serve/emotional/analytics/overheads.webp';
import stock_alarms from '../../Utils/images/Serve/emotional/analytics/stock-alarms.webp';
import market_price from '../../Utils/images/Serve/emotional/analytics/market_price.webp';
import Header from '../../Components/Serve/SupplyChain/Header';
import { useNavigate } from 'react-router-dom';

function Analytics() {

    const navigate = useNavigate();

    const buttonData=[
        {id:1, title:'Return on investment', imgSrc:return_on_investment, alt:'return on investment', linkTo:''},
        {id:2, title:'Forecast', imgSrc:forecast, alt:'forecast', linkTo:''},
        {id:3, title:'Overheads', imgSrc:overheads, alt:'overheads', linkTo:'overheads'},
        {id:4, title:'Forecast market price ', imgSrc:forecast, alt:'forecast market price', linkTo:'forecast-market-price'},
        {id:5, title:'Stock Alarms', imgSrc:stock_alarms, alt:'stock alarms', linkTo:'stock-alarm'},
        {id:6, title:'Market Price', imgSrc:market_price, alt:'market price', linkTo:'market-price'},
    ];

    const handleClick = (e,  redirectTo) => {
        if(e.target){
            setTimeout(()=> {navigate(redirectTo)}, 100)
        }
    }

  return (
    <Box className="analytics_wrapper">
        <Box className="row">
            <Header back_btn_link='../emotional/eshop' next_btn_link="../emotional/crm" title_container={true} title="Analytics & Relations" redirectTo='../emotional' />
            <Box className="col">
                <Box className="cards_container">
                    {buttonData.map((item)=>{
                        return <Box className="card" key={item.id}>
                            <Box className="card_img" component="img" src={item.imgSrc} alt={item.alt}></Box>
                            <Box className="card_button">
                                <Button className="btn" onClick={(e)=> handleClick(e, item.linkTo)}>{item.title}</Button>
                            </Box>
                        </Box>
                    })}
                </Box>
            </Box>
            <Box className="col">
                <Box className="bar_graph_container">
                    <Box component="img" src={bar_graph} className='gif' alt="bar graph"/>
                </Box>
            </Box>
        </Box>
    </Box>
  )
}

export default Analytics