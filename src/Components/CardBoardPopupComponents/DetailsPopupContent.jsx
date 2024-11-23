import React, { useState } from 'react';
import services_icon from '../../Utils/images/Sell/user_portfolio/services_icon.svg';
import gmail_services_icon from '../../Utils/images/Sell/user_portfolio/gmail_services_icon.svg';
import social_links_icon from '../../Utils/images/Sell/user_portfolio/social_links_icon.svg';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import CardBoardPopup from './CardBoardPopup';
import ServicesPopupContent from './ServicesPopupContent';
import SocialLinksPopupContent from './SocialLinksPopupContent';
import GmailServicesPopupContent from './GmailServicesPopupContent';

function DetailsPopupContent() {
    const [openPopupId, setOpenPopupId] = useState(null); 

    const handleClose = () => {
        setTimeout(()=>{
            setOpenPopupId(null);  
        },200)
    }

    const handleOpen = (id) => {
        setOpenPopupId((prevId) => (prevId === id ? null : id));  
    }

    const data = [
        {
            id: 1,
            imgSrc: services_icon,
            title: "Services",
            description: 'The Services Digi locker, Bank verification, For using Postpaid services.',
            popup_body_content: () => <ServicesPopupContent />,
        },
        {
            id: 2,
            imgSrc: gmail_services_icon,
            title: "Gmail Services",
            description: 'By This service Enabling you are giving permission to your G-contacts, G-MAPS, G-calendar, G-meet and ETC.',
            popup_body_content: (desc) => <GmailServicesPopupContent description={desc} />,
        },
        {
            id: 3,
            imgSrc: social_links_icon,
            title: "Social Links",
            description: 'For Feed and notification you can add your E-Media services.',
            popup_body_content: () => <SocialLinksPopupContent />,
        },
    ];

    return (
        <Box className="details_container">
            {data.map((item) => (
                <Link className="card" key={item.id} onClick={() => handleOpen(item.id)}>
                    <Box className="card_header">
                        <Box component="img" src={item.imgSrc} alt="icon" className='icon' />
                        <Typography variant='h3' className='title'>{item.title}</Typography>
                    </Box>
                    <Box className="card_body">
                        <Typography className='description'>{item.description}</Typography>
                    </Box>
                    {/* Popup for each card */}
                    <CardBoardPopup
                        open={openPopupId === item.id}  
                        handleClose={handleClose}
                        title={item.title}
                        body_content={item.popup_body_content(item.description)}  
                    />
                </Link>
            ))}
        </Box>
    );
}

export default DetailsPopupContent;
