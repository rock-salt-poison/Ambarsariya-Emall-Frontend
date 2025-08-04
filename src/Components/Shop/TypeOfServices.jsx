import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import pickup from '../../Utils/images/Sell/shop_details/pickup.svg';
import delivery from '../../Utils/images/Sell/shop_details/delivery.webp';
import home_visit from '../../Utils/images/Sell/shop_details/home_visit.webp';
import { Link } from 'react-router-dom'
import CardBoardPopup from '../CardBoardPopupComponents/CardBoardPopup';
import ServiceType from '../Cart/ServiceType/ServiceType';
import Delivery from '../Cart/ServiceType/Delivery';
import Pickup from '../Cart/ServiceType/Pickup';
import Visit from '../Cart/ServiceType/Visit';

const services = [
    {id: 1, type:'Delivery', icon:delivery, popupContent: <Delivery />,
        cName: "service_type_popup delivery",},
    {id: 2, type:'Home Visit', icon:home_visit, popupContent: <Visit />,
        cName: "service_type_popup"},
    {id: 3, type:'Pickup', icon:pickup, popupContent: <ServiceType />,
        cName: "service_type_popup delivery visit",},
]

function TypeOfServices({data}) {
    const [selectedServices, setSelectedServices] = useState(new Set());

    const handleServiceTypeClick = (e, service) => {
        const target = e.target.closest(".col");
        setSelectedServices((prevSelectedServices) => {
            const newSelectedServices = new Set(prevSelectedServices);
            if (newSelectedServices.has(service.id)) {
                newSelectedServices.delete(service.id);
            } else {
                newSelectedServices.add(service.id);
            }
            console.log('Selected Services:', Array.from(newSelectedServices));
            return newSelectedServices;
        });
        setOpenServicePopup((prev) => (prev === service.id ? null : service.id));
        // target.classList.toggle("increase_scale");
    };

    const [openServicePopup, setOpenServicePopup] = useState(null);

    console.log(data);
    
  return (
    <Box className="services_wrapper">
        <Typography variant="h2">Type of services</Typography>
        <Box className="services_container">
            {services?.filter((item) => data?.includes(item.type))
    .map((item) =>  (
                <Link
                    key={item.id}
                    onClick={(e) => handleServiceTypeClick(e, item)}
                    className={`col`}
                >
                    <Box
                        component="img"
                        src={item.icon}
                        alt={item.type}
                        className={`service_icon`}
                    />
                        <Typography className='service_type'> {item.type}</Typography>
                </Link>
            ))}    
            <CardBoardPopup
                customPopup={true}
                open={openServicePopup !== null}
                handleClose={() => setOpenServicePopup(null)}
                body_content={services.find(s => s.id === openServicePopup)?.popupContent}
                optionalCName={services.find(s => s.id === openServicePopup)?.cName}
            />
        </Box>
    </Box>
  )
}

export default TypeOfServices