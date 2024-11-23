import React from 'react'
import { Box, Button } from '@mui/material'
import coupons from '../../../../Utils/images/Sell/dashboard/merchant_dashboard/coupons.webp';
import eshop from '../../../../Utils/images/Sell/dashboard/merchant_dashboard/eshop.webp';
import preview from '../../../../Utils/images/Sell/dashboard/merchant_dashboard/preview.png';
import special_offers from '../../../../Utils/images/Sell/cart/special_offers/special_offer.webp';
import swastik from '../../../../Utils/images/Sell/dashboard/merchant_dashboard/swastik.webp';
import { useNavigate } from 'react-router-dom';

function EditShopForm_PopupContent() {

    const navigate = useNavigate();

    const cards_data = [
        {id:1, imgSrc:coupons, alt:"coupons", btnText:'Coupons'},
        {id:2, imgSrc:eshop, alt:"eshop", btnText:'Eshop'},
        {id:3, imgSrc:special_offers, alt:"special_offers", btnText:'Supply'},
        {id:4, imgSrc:preview, alt:"preview", btnText:'Preview'},
    ]

    const handleClick = (e, id) => {
        if(id===1){
            navigate('../coupon-offering')
        }if(id===2){
            navigate('../eshop')
        }if(id===3){
            navigate('../id/subscribe')
        }if(id===4){
            navigate('preview')
        }
    }

  return (
    <>
        <Box component="img" alt="swastik" className='swastik' src={swastik}/>
        {cards_data.map((item)=>{
            return <Box className="card" key={item.id}>
                <Box className="img_container">
                    <Box component="img" src={item.imgSrc} alt={item.alt} className='icon'/>
                </Box>
            <Button className="btn" onClick={(e)=> handleClick(e, item.id)}> {item.btnText} </Button>
        </Box>
        })}
    </>
  )
}

export default EditShopForm_PopupContent