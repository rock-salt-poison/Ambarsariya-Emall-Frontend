import React,  { useState, useEffect } from 'react'
import { Box, Dialog, DialogContent, Typography } from '@mui/material'
import TrainTable from '../../../Components/Home/TimeTablePopupComponents/TrainTable'
import trainbg from '../../../Utils/images/trainbg.webp'

function TrainDetailsPopup({ open, handleClose, id }) {
    
    const [heading, setHeading] = useState("");
        // const { id } = useParams();
    
        useEffect(() => {
            id == "arrival" ? setHeading("Arrival") : setHeading("Departure")
        }, [])
 

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className="trainDetailsPopup"
      BackdropProps={{
        sx: {
            backgroundColor: 'transparent !important'
        }
    }}
    >


      <DialogContent className='trainPopupDialogContent'>
      <Box className="train container">
            <Box className="wrapper">
              <Box component='img' src={trainbg} alt='shadow' className='bgImg' />
            </Box>
            <Box className="row">
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
                    <TrainTable id={id} />
                </Box>
            </Box>

        </Box>
      </DialogContent>

    </Dialog>
  )
}

export default TrainDetailsPopup