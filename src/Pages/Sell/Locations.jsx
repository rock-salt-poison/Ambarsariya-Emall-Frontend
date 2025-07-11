import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Header from '../../Components/Serve/SupplyChain/Header';
import location_img from "../../Utils/images/Sell/esale/location.webp";
import member_icon from '../../Utils/images/Sell/esale/life/member_icon.png';
import events from '../../Utils/videos/events.mp4';
import relations from '../../Utils/videos/relations.mp4';
import community from '../../Utils/videos/community.mp4';
import destinations from '../../Utils/videos/destinations.mp4';
import fourway from '../../Utils/videos/fourway.mp4';
import VideoPlayer from '../../Components/MerchantWrapper/VideoPlayer';
import { Link, useNavigate } from 'react-router-dom';
import hornSound from '../../Utils/audio/horn-sound.mp3';
import UserBadge from '../../UserBadge';

function Locations() {
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [audio] = useState(new Audio(hornSound));
  const navigate = useNavigate();

  const data = [
    { id: 1, name: 'Events', alt: 'events', video_url: events, cName: 'card1 events' },
    { id: 2, name: 'Community', alt: 'community', video_url: community, cName: 'card2 community' },
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
              }else if(target.classList.contains('community')){
                navigate('../esale/locations/community')
            }
          }, 600)
      }
    }
  }

  return (
    <Box className='member_locations_wrapper'>
      <Box className="row">
        {/* <Header
          icon_1={location_img}
          icon_2={member_icon}
          icon_1_link='../../sell/user'
          icon_2_link='../../sell/user'
          title="Locations"
          title_container={true}
          redirectTo='../../sell/esale'
        /> */}

        <Box className="col header_badge">
          <Link to={'../../sell/esale'} className='icon_link'>
                      <Box component="img" src={location_img} alt="suppliers_for_shop" className='icon' />
                    </Link>

                    <Box className="title_container">
                                <Link to={'../../sell/esale'}>
                                  <Typography className="title">Locations</Typography>
                                </Link>
                            </Box>
                            <UserBadge
            handleBadgeBgClick={'../esale'}
            handleLogin="../login"
            handleLogoutClick="../../"
          />
        </Box>

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