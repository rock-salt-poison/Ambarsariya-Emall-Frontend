import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Header from '../../Components/Serve/SupplyChain/Header';
import location_img from "../../Utils/images/Sell/esale/location.svg";
import member_icon from '../../Utils/images/Sell/esale/life/member_icon.png';
import events from '../../Utils/videos/events.mp4';
import relations from '../../Utils/videos/relations.mp4';
import destinations from '../../Utils/videos/destinations.mp4';
import fourway from '../../Utils/videos/fourway.mp4';
import VideoPlayer from '../../Components/MerchantWrapper/VideoPlayer';
import { Link, useNavigate } from 'react-router-dom';
import hornSound from '../../Utils/audio/horn-sound.mp3';

function Locations() {
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [audio] = useState(new Audio(hornSound));
  const navigate = useNavigate();

  const data = [
    { id: 1, name: 'Events', alt: 'events', video_url: events, cName: 'card1 events' },
    { id: 2, name: 'Relations', alt: 'relations', video_url: relations, cName: 'card2 relations' },
    { id: 3, name: 'Destinations', alt: 'destinations', video_url: destinations, cName: 'card2 destinations' },
    { id: 4, name: 'Fourway', alt: 'fourway', video_url: fourway, cName: 'card1 fourway' },
  ];

  const handleClick = async (e, id) => {
    if(id){
      e.preventDefault();
      const target = e.target.closest(".card");
      if(target){
          target.classList.toggle('reduceSize3');
          audio.play();
          
          setTimeout(()=>{
              target.classList.toggle('reduceSize3');
          },300)
  
          setTimeout(()=>{
              if(target.classList.contains('events')){
                  navigate('../esale/locations/events')
              }
          }, 600)
      }
    }
  }

  return (
    <Box className='member_locations_wrapper'>
      <Box className="row">
        <Header
          icon_1={location_img}
          icon_2={member_icon}
          icon_1_link='../../AmbarsariyaMall/sell/user'
          icon_2_link='../../AmbarsariyaMall/sell/user'
          title="Locations"
          title_container={true}
          redirectTo='../../AmbarsariyaMall/sell/esale'
        />

        <Box className="col">
          <Box className="container">
            {data.map((item) => (
              <Link
                key={item.id}
                className={`card ${item.cName}`}
                onMouseEnter={() => setHoveredCardId(item.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                onClick={(e)=> handleClick(e, item.id)}
              >
                <VideoPlayer
                  url={item.video_url}
                  autoplay={false}
                  controls={false}
                  muted={true}
                  loop={true}
                  playing={hoveredCardId === item.id}
                />
                <Box className="title_container">
                  <Typography className="title">{item.name}</Typography>
                </Box>
              </Link>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Locations;
