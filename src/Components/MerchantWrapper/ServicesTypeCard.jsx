import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import '../../styles/variables.scss'
import shop_detail_book_img from '../../Utils/images/Sell/merchant_details/books.webp'
import shop_detail_prepair_services_img from '../../Utils/images/Sell/merchant_details/stationry_img_1.png'
import shop_detail_service_type_img from '../../Utils/images/Sell/merchant_details/paint_palette_img.webp'
import { Link, useNavigate } from 'react-router-dom'
import CardBoardPopup from '../CardBoardPopupComponents/CardBoardPopup'
import PrepaidPostpaid from '../Cart/Prepaid_Postpaid/PrepaidPostpaid'
import ServiceType from '../Cart/ServiceType/ServiceType'

// var book_img_src = 'var(--shop_detail_book_img)';
// const shopDetailBookImg = require('../../styles/variables.scss').$shop_detail_book_img;



const data = [
    {id:1,type:'Products', link:`../id/products`, imgSrc:shop_detail_book_img},
    {id:2,type:'Prepaid / Postpaid', imgSrc:shop_detail_prepair_services_img, popupContent:<PrepaidPostpaid/>, cName:'prepaid_postpaid_offer_popup'},
    {id:3,type:'Service Type', imgSrc:shop_detail_service_type_img, popupContent: <ServiceType/>, cName:'service_type_popup'},
];


function ServicesTypeCard() {

    const [openPopup, setOpenPopup] = useState(null);
    const navigate = useNavigate();

    const handleClose = () => {
        setOpenPopup(false);
    }

    const handleClick = (e, service) => {
        if(service.link){
            setTimeout(()=>{navigate('../id/products')}, 200);
        }else{
            setOpenPopup((prev)=> prev === service.id ? null : service.id);
        }
    }
    
  return (
    <Box className="services_type_wrapper">
        {
            data.map((service)=>{
                return (
                    <React.Fragment key={service.id}>
                    <Link className="card"  onClick={(e)=>{handleClick(e, service)}}>
                    <Box className="card_body">
                        <Box component="img" src={service.imgSrc} className='product_img'/>
                        <Typography className='text'>{service.type}</Typography>
                    </Box>
                </Link>

                <CardBoardPopup open={openPopup===service.id} handleClose={ handleClose} customPopup={true} body_content={service.popupContent} optionalCName={service.cName}/>
                </React.Fragment>
                )
            })
        }
    </Box>
  )
}

export default ServicesTypeCard