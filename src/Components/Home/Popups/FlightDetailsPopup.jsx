import React,  { useState, useEffect } from 'react'
import { Box, Dialog, DialogContent, Typography } from '@mui/material'
import flightImg from '../../../Utils/images/flightPass1.png';
import FlightTable from '../TimeTablePopupComponents/FlightTable';

function FlightDetailsPopup({ open, handleClose, id }) {
    
    const [heading, setHeading] = useState("");
    
        useEffect(() => {
            id == "arrival" ? setHeading("Arrival") : setHeading("Departure")
        }, [])
 

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className="flightDetailsPopup"
      BackdropProps={{
        sx: {
            backgroundColor: 'transparent !important'
        }
    }}
    >


      <DialogContent className='flightPopupDialogContent'>
      <Box className="flight container">
            <Box className="wrapper">
            </Box>
            <Box className="row">
                <Box className="col-1">
                    <Typography variant='h2'>{heading}</Typography>
                    <FlightTable id={id}/>
                </Box>

                <Box className="col-2">
                    <Box component='img' src={flightImg} alt='bg-img' className='img1' />
                    <Box className="content">
                        <Typography>
                            Date : 29-May-2024
                        </Typography>
                        <Typography>
                            From 1pm to 5pm
                        </Typography>
                    </Box>

                </Box>
            </Box>

        </Box>
      </DialogContent>

    </Dialog>
  )
}

export default FlightDetailsPopup