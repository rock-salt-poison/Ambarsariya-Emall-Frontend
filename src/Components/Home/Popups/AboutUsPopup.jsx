import React from 'react';
import { Box, Dialog, DialogContent, Typography } from '@mui/material';
import Button2 from '../Button2';


export default function AboutUsPopup({ open, handleClose, handleBackClick }) {

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            className="about-popup-dialog-paper"
        >
            <DialogContent className='aboutPopupDialogBoxContent'>
                <Box className="content">
                    <Box className="content-body">
                        <Typography variant="h2">About us</Typography>
                        <Box className="descriptionContainer">
                            <Typography className="description">

                                We at Rock Salt Poison, Believe that world is made up of three basic things, that is Rock~Land, Salt~Life and, Poison~Man Made things.

                            </Typography>
                            <Typography className="description">
                                To understand and achieve the sustained eco-system, we need to focus on these three elements by which we can attain a Sustainable, Safe and Eco Balanced Planet.
                                To achieve this goal, we are finding numerous ways, to solve problems related to Rock Salt Poison.
                                We have started with three verticals:

                            </Typography>

                            <ol>
                                <li>
                                    <Typography className="description">
                                        E-Banners (An Advertisement Company) -It helps to minimize the flex printing and avoid encroachments over the road,by providing E-Shops to (all the Hawkers and to other Sales Points) Manufacturer / Daily needs.

                                        <Typography variant='span' className='blockLevelSpan'>
                                            <Typography variant="span" component="span" className="bold">
                                                Name of the Model -
                                            </Typography>
                                            E-Mall, which has slogan for local citizens, "Sell Serve Socialize".
                                        </Typography>


                                        <Typography variant='span' className='blockLevelSpan'>
                                            <Typography variant="span" component="span" className="bold">
                                            Name of the Product -
                                            </Typography>
                                            www.e-ambarsariyamall.net
                                        </Typography>
                                        
                                    </Typography>
                                </li>

                                <li>
                                    <Typography className="description">Aurah Model (Smart Water Dowsing)- It helps To find out the underground domestic use water, for municipal corporations to find taluka for a habitat to provide Quality, Quantity and Periodicity of Water.
                                        <Typography variant='span' className='blockLevelSpan'>
                                            <Typography variant="span" component="span" className="bold">
                                                Name of the Model -
                                            </Typography>
                                            An Aurah Model, which has slogan "99.96 % efficiency by 4 years".
                                        </Typography>


                                        <Typography variant='span' className='blockLevelSpan'>
                                            <Typography variant="span" component="span" className="bold">
                                            Name of the Product -
                                            </Typography>
                                            Smart water dowsing method (iiot).
                                        </Typography>
                                        

                                        
                                    </Typography>
                                </li>

                                <li>
                                    <Typography className="description">
                                        Hardik Model (Domestic & Industrial waste) - It helps to find out the policy to implement on garbage waste, for municipal corporation to find out the way for using 3 R principle (Reduce, Reuse, Recycle) and Doping for using Landscaping Method.

                                        <Typography variant='span' className='blockLevelSpan'>
                                            <Typography variant="span" component="span" className="bold">
                                                Name of the Model -
                                            </Typography>
                                            Hardik Model, which has slogan "Sorting, Recycle, Smoke less Burning".
                                        </Typography>


                                        <Typography variant='span' className='blockLevelSpan'>
                                            <Typography variant="span" component="span" className="bold">
                                            Name of the Product -
                                            </Typography>
                                            Policy maker for Domestic and Industrial Waste.
                                        </Typography>
                                    </Typography>
                                </li>
                            </ol>
                        </Box>


                        <Button2 text="Back" handleClose={handleClose} onClick={handleBackClick} />
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
}
