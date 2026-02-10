import React, { useState, useEffect } from 'react'
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
import { getUser } from '../../API/fetchExpressAPI';
import { useSelector } from 'react-redux';

const services = [
    {id: 1, type:'Delivery', icon:delivery, popupContent: <Delivery />,
        cName: "service_type_popup delivery",},
    {id: 2, type:'Home Visit', icon:home_visit, popupContent: <Visit />,
        cName: "service_type_popup delivery visit"},
    {id: 3, type:'Pickup', icon:pickup, popupContent: <ServiceType />,
        cName: "service_type_popup service",},
]

function TypeOfServices({services_type, data}) {
    const [selectedServices, setSelectedServices] = useState(new Set());
    const [disabledServices, setDisabledServices] = useState(new Set());
    const [openServicePopup, setOpenServicePopup] = useState(null);
    const token = useSelector((state) => state.auth.userAccessToken);
    const [openDashboard, setOpenDashboard] = useState(false);

    useEffect(() => {
        if(token){
            fetch_user(token);
        }
    }, [token]);

    const fetch_user = async (token) => {
        const res = (await getUser(token))?.find((u)=>u.shop_no !== null);
        if(data.shop_access_token === res?.shop_access_token){
            setOpenDashboard(true);
        }else {
            setOpenDashboard(false);
        }
    }
    console.log(data);
    

    const handleServiceTypeClick = (e, service) => {
        // If openDashboard is true, toggle disabled state instead of opening popup
        if (openDashboard) {
            setDisabledServices((prevDisabledServices) => {
                const newDisabledServices = new Set(prevDisabledServices);
                if (newDisabledServices.has(service.id)) {
                    newDisabledServices.delete(service.id);
                } else {
                    newDisabledServices.add(service.id);
                }
                console.log('Disabled Services:', Array.from(newDisabledServices));
                return newDisabledServices;
            });
            return;
        }
        
        // const target = e.target.closest(".col");
        // setSelectedServices((prevSelectedServices) => {
        //     const newSelectedServices = new Set(prevSelectedServices);
        //     if (newSelectedServices.has(service.id)) {
        //         newSelectedServices.delete(service.id);
        //     } else {
        //         newSelectedServices.add(service.id);
        //     }
        //     console.log('Selected Services:', Array.from(newSelectedServices));
        //     return newSelectedServices;
        // });
        // setOpenServicePopup((prev) => (prev === service.id ? null : service.id));
        // target.classList.toggle("increase_scale");
    };

    
  return (
    <Box className="services_wrapper">
        <Typography variant="h2">Type of services</Typography>
        <Box className="services_container">
            {services?.filter((item) => services_type?.includes(item.type))
    .map((item) =>  (
                <Link
                    key={item.id}
                    onClick={(e) => handleServiceTypeClick(e, item)}
                    className={`col ${disabledServices.has(item.id) ? 'disabled' : ''}`}
                >
                    <Box
                        component="img"
                        src={item.icon}
                        alt={item.type}
                        className={`service_icon ${disabledServices.has(item.id) ? 'disabled' : ''}`}
                    />
                        <Typography className={`service_type ${disabledServices.has(item.id) ? 'disabled' : ''}`}> {item.type}</Typography>
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