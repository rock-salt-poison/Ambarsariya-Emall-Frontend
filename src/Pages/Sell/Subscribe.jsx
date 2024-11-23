import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import tbody_vector from '../../Utils/images/Sell/products/tbody_vector.webp';
import Button2 from '../../Components/Home/Button2';
import { Link, useParams } from 'react-router-dom';
import CardBoardPopup from '../../Components/CardBoardPopupComponents/CardBoardPopup';
import SubscriptionPopupContent from '../../Components/CouponOffering/SubscriptionPopupContent';
import SpecialOffer from '../../Components/Cart/SpecialOffer/SpecialOffer';

function Subscribe() {
    const { owner } = useParams();
    
    const [ openPopup, setOpenPopup]= useState(null);

    const handleClose = () => {
        setOpenPopup(false);
    }

    const handleClick = (e, id) => {
        setOpenPopup((prev)=>prev === id ? null : id);
    }

    const data = [
        {id:1, title:'Monthly', },
        {id:2, title:'Daily',},
        {id:3, title:'Weekly',},
        {id:4, title:'Edit',},
    ]
    // linkTo: `../${owner}/monthly/budget`
    return (
        <Box className="subscribe_main_wrapper">
            <Box className="row">
                <Box className="col">
                <Button2 text={"Back"} redirectTo={`../${owner}/like-and-share`}/>
                    <Typography variant='h2' className='heading'>
                        <Typography variant='span' className="span_1">
                            {/* <Typography variant="span" className='heading_2'>Subscribe</Typography> -  */}
                            Apna Departmental</Typography>
                        <Typography variant='span' className="span_1">
                            Shop No:
                            <Typography variant='span' className='span_2'>123</Typography>
                        </Typography>
                    </Typography>
                <Button2 text={"Next"} redirectTo={`../${owner}/mou`}/>
                </Box>
                <Box className="col">
                    <Box className="sub_col"></Box>
                    <Box className="subscribe_wrapper">
                        <Box className="board_pins">
                            <Box className="circle"></Box>
                            <Box className="circle"></Box>
                        </Box>
                        
                        <Box className="subscribe_row">
                            {data.map((data)=>{
                                return  <React.Fragment key={data.id}><Link className="subscribe_col" onClick={(e)=>{handleClick(e, data.id)}}>
                                <Typography className="text">open</Typography>
                                <Box className="title_container">
                                    <Box component="img" src={tbody_vector}/>
                                    <Typography className="title">{data.title}</Typography>
                                </Box>
                            </Link>
                                <CardBoardPopup open={openPopup === data.id} handleClose={handleClose} body_content={<SpecialOffer/>}
                                
                                customPopup={true}
                                optionalCName='special_offer_popup'
                                />

                            </React.Fragment>
                            })}
                        </Box>

                        <Box className="board_pins">
                            <Box className="circle"></Box>
                            <Box className="circle"></Box>
                        </Box>
                    </Box>
                    <Box className="sub_col"></Box>
                </Box>
                
            </Box>
        </Box>
    )
}

export default Subscribe