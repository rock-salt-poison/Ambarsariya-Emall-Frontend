import React from 'react';
import { Box, Dialog, DialogContent, Typography } from '@mui/material';
import Button2 from '../Button2';
import photoframe from '../../../Utils/images/photoframe.png';
import harsh_kumar from '../../../Utils/images/harsh-kumar.webp';
import pardeep_kumar from '../../../Utils/images/pardeep-kumar.webp';
import ashwani_kumar from '../../../Utils/images/ashwani-kumar.webp';


export default function WhoWeArePopup({ open, handleClose, handleBackClick }) {

    const listItems = [
        { name: 'Mr. Ashwani Kumar', profile: 'System Analyst', imgSrc:ashwani_kumar },
        { name: 'Mr. Pardeep Kumar', profile: 'Scientific Approach', imgSrc:pardeep_kumar },
        { name: 'Mr. Harsh Kumar', profile: 'Financial Constraints', imgSrc:harsh_kumar },
    ];

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            className="whoweare-popup-dialog-paper"
        >
            <DialogContent className='whowearePopupDialogBoxContent'>
                <Box className="content">
                    <Box className="content-body">
                        <Typography variant="h2">Who we are !</Typography>
                        <Typography className="description">With the team of Devotees, towards Science & Environmental Solutions for better world. We have solution for every problem stated by experienced people & environmentalists.</Typography>
                        <Box className="row">
                            {listItems.map((user, index) => {
                                return <Box className="col" key={index}>
                                    <Box className='frame_container'>
                                        <Box component="img" src={user.imgSrc} className="user_img" alt={user.name} />
                                        {/* <Box component="img" src={user.imgSrc} className="user_img" alt={user.name} /> */}
                                    </Box>
                                    <Typography variant='h3'>
                                        {user.profile}
                                    </Typography>
                                    <Typography variant='h4'>
                                        {user.name}
                                    </Typography>
                                </Box>
                            })}

                        </Box>
                        <Button2 text="Back" handleClose={handleClose} onClick={handleBackClick} />
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
}
