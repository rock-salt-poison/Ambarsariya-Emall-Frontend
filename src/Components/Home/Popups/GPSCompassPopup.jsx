import React from 'react';
import { Box, Dialog, DialogContent, Typography } from '@mui/material';
import location_sharing_img from '../../../Utils/images/live-location-sharing-img.png';
import schedule_shopping_img from '../../../Utils/images/schedule-shopping-img.png';
import banner_notification_img from '../../../Utils/images/banner-img.png';
import announcements_img from '../../../Utils/images/announcements-img.png';
import camera_img from '../../../Utils/images/camera-img.png';
import OnOffComponent from '../NavigatorPopupComponents/OnOffComponent';

const obj = [
    { id: 1, title: 'Live location sharing', imgSrc: location_sharing_img, altText: 'live-location-sharing' },
    { id: 2, title: 'Schedule Shopping', imgSrc: schedule_shopping_img, altText: 'schedule-shopping' },
    { id: 3, title: 'Banner Notifications', imgSrc: banner_notification_img, altText: 'banner-notifications' },
    { id: 4, title: 'Announcements in mall', imgSrc: announcements_img, altText: 'announcements-in-mall' },
    { id: 5, title: 'Camera permissions', imgSrc: camera_img, altText: 'camera' },
];

function GPSCompassPopup({ open, handleClose }) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            className="compass-dialog-paper"
        >
            <DialogContent className='compassDialogBoxContent'>
                <Box className="content">
                    <Box className="content-header">
                        <Box className='heading'>
                            <Typography component='h2'>
                                Security Check
                            </Typography>
                        </Box>
                    </Box>
                    <Box className="content-body">
                        {obj.map((data, index) => (
                            <Box className="row" key={index}>
                                <Box className="col-1">
                                    <Box component='img' src={data.imgSrc} className='icon' alt={data.altText} />
                                </Box>
                                <Box className="col-2">
                                    <Typography component="h3" className='title'>
                                        {data.title}
                                    </Typography>
                                </Box>
                                <Box className="col-3">
                                    <OnOffComponent title={data.title} />
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
}

export default GPSCompassPopup;
