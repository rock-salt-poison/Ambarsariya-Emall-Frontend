import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import card from '../Utils/images/Serve/card.webp';
import card_connector from '../Utils/images/Serve/card_connector.png';
import card_connector2 from '../Utils/images/Serve/card_connector2.png';
import card_connector3 from '../Utils/images/Serve/card_connector3.png';
import Button2 from '../Components/Home/Button2';
import { Link, useNavigate } from 'react-router-dom';
import hornSound from '../Utils/audio/horn-sound.mp3';

function Serve() {
  const [connectorSrc, setConnectorSrc] = useState(card_connector);
  const [audio] = useState(new Audio(hornSound));
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 992) {
        setConnectorSrc(card_connector3);
      } else {
        setConnectorSrc(card_connector);
      }
    };

    handleResize(); // Set the initial value
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleClick = (e) =>{
        const target = e.target.closest(".emotional, .unexpected, .simple");
        if(target){
            target.classList.toggle('reduceSize3');
            audio.play();
            
            setTimeout(()=>{
                target.classList.toggle('reduceSize3');
            },300)

            setTimeout(()=>{
                if(target.classList.contains('emotional')){
                    navigate('../emotional')
                }
                else if(target.classList.contains('unexpected')){
                    navigate('../unexpected')
                }
            }, 600)
        }
  }

  return (
    <Box className="serve_wrapper">
      <Box className="row">
        <Box className="back-button-wrapper">
            <Button2 text="Back" redirectTo='../../AmbarsariyaMall'/>
        </Box>
        <Box className="container">
          <Box className="col">
            <Box component="img" src={card_connector2} alt="card" className="card_connector2" />
          </Box>

          <Box className="card">
            <Box component="img" src={card} alt="card" className="card_img" />
            <Link className="card_body emotional" onClick={(e)=>handleClick(e)}>
              <Typography className="title">Emotional</Typography>
            </Link>
          </Box>

          <Box className="col">
            <Box component="img" src={connectorSrc} alt="card" className="card_connector" />
          </Box>

          <Box className="card">
            <Box component="img" src={card} alt="card" className="card_img" />
            <Link className="card_body unexpected" onClick={(e)=>handleClick(e)}>
              <Typography className="title"> Unexpected </Typography>
            </Link>
          </Box>

          <Box className="col">
            <Box component="img" src={connectorSrc} alt="card" className="card_connector" />
          </Box>

          <Box className="card">
            <Box component="img" src={card} alt="card" className="card_img" />
            <Link className="card_body simple" onClick={(e)=>handleClick(e)}>
              <Typography className="title">Simple</Typography>
            </Link>
          </Box>

          <Box className="col">
            <Box component="img" src={card_connector2} alt="card" className="card_connector3" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Serve;
