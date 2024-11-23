import React,  { useState, useEffect } from 'react'
import { Box, Dialog, DialogContent, Typography } from '@mui/material'
import BusTable from '../TimeTablePopupComponents/BusTable';
import busArrival from '../../../Utils/images/busArrival.png'
import busDeparture from '../../../Utils/images/bus-departure.png'



function BusDetailsPopup({ open, handleClose, id }) {
    
    const [heading, setHeading] = useState("");
    const [imgSrc, setImgSrc] = useState("");
    
        // const { id } = useParams();
    
        useEffect(() => {
            if(id=="arrival"){
                setHeading("Arrival");
                setImgSrc(busArrival);
            }
            else if(id="departure"){
                setHeading("Departure");
                setImgSrc(busDeparture);
            }
        }, [id])
 

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className="busDetailsPopup"
      BackdropProps={{
        sx: {
            backgroundColor: 'transparent !important'
        }
    }}
    >


      <DialogContent className='busPopupDialogContent'>
      <Box className="bus container">
            <Box className="wrapper">
            </Box>
            <Box className="row">
                <Box className="col">
                    <Box className="row-1">
                        <Box component='img' src={imgSrc} alt='bus' className='busArrivalImg' />
                    </Box>

                    <Box className="row-2">
                        <Box className="col-1">

                            <Typography>
                                {heading}
                            </Typography>
                            <Typography>
                                Date : 29-May-2024
                            </Typography>
                            <Typography>
                                From 1pm to 5pm
                            </Typography>
                        </Box>

                        <Box className="col-2">
                            <Typography>PRTC TIME TABLE</Typography>
                        </Box>
                    </Box>

                    <Box className="row-3">
                        <Typography variant='h2'>{heading}</Typography>
                        <Typography>Time</Typography>
                    </Box>

                </Box>

                <Box className="col-2">
                    <BusTable id={id}/>
                </Box>
                <Box>

                </Box>
            </Box>

        </Box>
      </DialogContent>

    </Dialog>
  )
}

export default BusDetailsPopup