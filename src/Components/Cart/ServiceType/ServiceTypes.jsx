import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import pickup_truck_gif from '../../../Utils/gifs/pickup_truck.gif';
import pickup from '../../../Utils/images/Sell/shop_details/pickup.svg';
import delivery from '../../../Utils/images/Sell/shop_details/delivery.webp';
import visit from '../../../Utils/images/Sell/shop_details/home_visit.webp';
import takeaway from '../../../Utils/images/Sell/shop_details/takeaway.webp';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import Pickup from './Pickup';
import CardBoardPopup from '../../CardBoardPopupComponents/CardBoardPopup';
import TakeAway from './TakeAway';
import Delivery from './Delivery';
import Visit from './Visit';

function ServiceTypes() {
    const [openPopup, setOpenPopup] = useState(null);
    const location = useLocation();


    const handleClose = () => {
        setOpenPopup(false);
    }

    const handleClick = (e, id) => {
        const service = e.target.closest('.service');
        if(service){
            service.classList.add('active');
            setTimeout(()=>{service.classList.remove('active')},300)
            setTimeout(()=>{setOpenPopup((prev) => prev===id ? null : id)},600)
        }
    }

    const services = [
        {id:1, imgSrc:pickup, popupContent:<Pickup title="Pickup"/>, cName:'service_type_popup pickup',  },
        {id:2, imgSrc:takeaway, popupContent:<TakeAway title="Take Away"/>, cName:'service_type_popup pickup', },
        {id:3, imgSrc:delivery, popupContent:<Delivery title="Delivery"/>, cName:'service_type_popup delivery',  },
        {id:4, imgSrc:visit, popupContent:<Visit title="Visit"/>, cName:'service_type_popup delivery visit',  },
    ]

    const getCurrentUrlWithToken = () => {
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('token');
        return `${location.pathname}?${searchParams.toString()}`;
      };

  return (
    <>
        <Box className="col"></Box>
        <Box className="col">
            <Box className="service_type_container">
                <Typography variant="h2">Select one service type</Typography>
                <Box className="service_types">
                    {services.map((service)=>{
                        return <React.Fragment key={service.id}>
                            <Link to={getCurrentUrlWithToken()} onClick={(e)=>handleClick(e, service.id)}>
                                <Box component="img" alt="service_type" src={service.imgSrc} className='service'/>
                            </Link>
                            <CardBoardPopup open={openPopup===service.id} handleClose={handleClose} customPopup={true} body_content={service.popupContent} optionalCName={service.cName}/> 
                        </React.Fragment>
                    })}
                    
                   
                </Box>
            </Box>
        </Box>
        <Box className="col">
            <Box className="image_container">
                <Box component='img' src={pickup_truck_gif} alt="gif" className='gif'/>
            </Box>
        </Box>
    </>
  )
}

export default ServiceTypes