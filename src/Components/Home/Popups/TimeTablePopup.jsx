import React, { useState } from 'react';
import { Box, Dialog, DialogContent, Typography, Button, Divider } from '@mui/material';
import star from '../../../Utils/images/star.png';
import astronautVector from '../../../Utils/images/astronaut-vector.webp';
import meteorite from '../../../Utils/images/meteorite.png';
import cosmos from '../../../Utils/images/cosmos.png';
import neonShadow from '../../../Utils/images/neon-shadow.png';
import dep1 from '../../../Utils/images/dep 1.png';
import dep2 from '../../../Utils/images/dep 2.png';
import dep3 from '../../../Utils/images/dep 2.png';
import arrival1 from '../../../Utils/images/arrival 1.png';
import arrival2 from '../../../Utils/images/arrival 2.png';
import arrival3 from '../../../Utils/images/arrival 3.png';
import busImg from '../../../Utils/images/bus.png';
import trainImg from '../../../Utils/images/train.webp';
import planeImg from '../../../Utils/images/plane.png';
import { Link } from 'react-router-dom';
import FlightDetailsPopup from './FlightDetailsPopup';
import BusDetailsPopup from './BusDetailsPopup';  // New Component
import TrainDetailsPopup from './TrainDetailsPopup';  // New Component

function TimeTablePopup({ open, handleClose }) {
  const [openDetails, setOpenDetails] = useState(null);

  const handleLinkClick = (e, type) => {
    e.preventDefault();
    setOpenDetails(type);
  };

  const handleCloseDetails = () => {
    setOpenDetails(null);
  };

  const data = [
    { id: 1, src: star, alt: 'star', cName: 'starImg' },
    { id: 2, src: astronautVector, alt: 'astronaut-vector', cName: 'astronautImg' },
    { id: 3, src: meteorite, alt: 'meteorite', cName: 'meteoriteImg' },
    { id: 4, src: cosmos, alt: 'cosmos', cName: 'cosmosImg' },
  ];

  const obj2 = [
    {
      id: 1, type: 'bus', status: 'departure', text: 'DEP', imgSrc1: dep1, img_1_cName: 'shadowBg', imgSrc2: busImg, img_2_cName: 'busImg img', img_2_alt: 'bus'
    },
    {
      id: 2, type: 'train', status: 'departure', text: 'DEP', imgSrc1: dep2, img_1_cName: 'shadowBg', imgSrc2: trainImg, img_2_cName: 'trainImg img', img_2_alt: 'train'
    },
    {
      id: 3, type: 'flight', status: 'departure', text: 'DEP', imgSrc1: dep3, img_1_cName: 'shadowBg', imgSrc2: planeImg, img_2_cName: 'busImg img', img_2_alt: 'plane'
    },
    {
      id: 4, type: 'bus', status: 'arrival', text: 'ARRIVAL', imgSrc1: arrival1, img_1_cName: 'shadowBg', imgSrc2: busImg, img_2_cName: 'planeImg img', img_2_alt: 'bus'
    },
    {
      id: 5, type: 'train', status: 'arrival', text: 'ARRIVAL', imgSrc1: arrival2, img_1_cName: 'shadowBg', imgSrc2: trainImg, img_2_cName: 'trainImg img', img_2_alt: 'train'
    },
    {
      id: 6, type: 'flight', status: 'arrival', text: 'ARRIVAL', imgSrc1: arrival3, img_1_cName: 'shadowBg', imgSrc2: planeImg, img_2_cName: 'planeImg img', img_2_alt: 'plane'
    }
  ];

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className="custom-dialog-paper"
    >
      {data.map((data) => (
        <Box key={data.id} component='img' src={data.src} alt={data.alt} className={data.cName} />
      ))}

      <DialogContent className='timeTableDialogBoxContent'>
        <Box className="content">
          <Box className="content-header">
            <Typography component="h1">Travel Time</Typography>
          </Box>
          <Box className="content-body">
            <Box className="row1">
              <Box component='img' src={neonShadow} alt='shadow' className='shadow' />
              <Box className='content'>
                <Typography>Flight</Typography>
                <Typography>XR-9506</Typography>
                <Typography>Delayed</Typography>
              </Box>
            </Box>

            <Box className='row2'>
              {obj2.map((data) => (
                <Box className='col' key={data.id}>
                  <Link onClick={(e) => handleLinkClick(e, { type: data.type, status: data.status })}>
                    <Box component='img' src={data.imgSrc1} alt='bg' className={data.img_1_cName} />
                    <Box className="content">
                      <Button>{data.text}</Button>
                      <Divider className="dotted-divider" />
                      <Box className="imgContainer">
                        <Box component='img' src={data.imgSrc2} alt={data.img_2_alt} className={data.img_2_cName} />
                      </Box>
                    </Box>
                  </Link>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </DialogContent>

      {openDetails && openDetails.type === 'flight' && (
        <FlightDetailsPopup open={true} handleClose={handleCloseDetails} id={openDetails.status} />
      )}
      {openDetails && openDetails.type === 'bus' && (
        <BusDetailsPopup open={true} handleClose={handleCloseDetails} id={openDetails.status} />
      )}
      {openDetails && openDetails.type === 'train' && (
        <TrainDetailsPopup open={true} handleClose={handleCloseDetails} id={openDetails.status} />
      )}
    </Dialog>
  );
}

export default TimeTablePopup;
