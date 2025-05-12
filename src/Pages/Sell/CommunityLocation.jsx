import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import hornSound from '../../Utils/audio/horn-sound.mp3';
import UserBadge from '../../UserBadge';
import community from '../../Utils/images/Sell/esale/locations/community/community.webp'
import community_icon from '../../Utils/images/Serve/emotional/campaign/community/community-network.webp'

function CommunityLocation() {
  const [audio] = useState(new Audio(hornSound));
  const navigate = useNavigate();


  const handleClick = async (e) => {
    if (e.target) {
      e.preventDefault();
      const target = e.target.closest(".icon");
      if (target) {
        target.classList.toggle('reduceSize3');
        audio.play();

        setTimeout(() => {
          target.classList.toggle('reduceSize3');
        }, 300)

        setTimeout(() => {
            navigate('../../AmbarsariyaMall/serve/emotional/community');
        }, 600)
      }
    }
  }

  

  return (
    <Box className='member_location_community_wrapper'>
      <Box className="row">
        <Box className="col">
          <Box component="img" src={community} alt="community" className='community_img'/>
        </Box>

        <Box className="col header_badge">
        <Link onClick={(e)=> handleClick(e)}><Box component="img" src={community_icon} alt="community" className='icon' /></Link>

          <Box className="container">
            <Box className="tooltip">
              <Typography variant='h3' className="heading">
                What defines a community isn’t just the common interest — but also the connection, communication, and sense of belonging among its members.
              </Typography>
            </Box>
            <Box className="tooltip">
              <ul>
                <li><Typography>Knowledge Sharing</Typography></li>
                <li><Typography>Support & Engagement</Typography></li>
                <li><Typography>Networking</Typography></li>
                <li><Typography>Opportunities</Typography></li>
                <li><Typography>Accountability</Typography></li>
                <li><Typography>Exposure to Diverse Perspectives</Typography></li>
                <li><Typography>Feedback & Improvement</Typography></li>
              </ul>
            </Box>
          </Box>

          <UserBadge
            handleBadgeBgClick="../esale/locations"
            handleLogin="../login"
            handleLogoutClick="../../AmbarsariyaMall"
          />
        </Box>
      </Box>
    </Box>
  );
}

export default CommunityLocation;
