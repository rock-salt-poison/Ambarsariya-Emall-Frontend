import React from 'react';
import { Box, Typography } from '@mui/material';
import Button2 from '../../Components/Home/Button2';
import community_icon from '../../Utils/images/Serve/emotional/campaign/community/community-network.webp';
import { Link } from 'react-router-dom';
import UserBadge from '../../UserBadge';
import CreateCommunityForm from '../../Components/Sell/Esale/Locations/CreateCommunityForm';

// Assuming these are your CSS variable names
const iconVariables = {
  icon1: '--icon1',
  icon2: '--icon2',
  icon3: '--icon3',
  icon4: '--icon4',
  icon5: '--icon5',
  icon6: '--icon6',
};

// Utility function to get image src from CSS variable
const getIconSrc = (iconName) => {
  const iconUrl = getComputedStyle(document.documentElement)
    .getPropertyValue(iconName)
    .trim()
    .replace(/^url\(["']?/, '')
    .replace(/["']?\)$/, '');
  return iconUrl;
};

function Community() {
  const data = [
    { id: 1, title: 'Choose your Media For Spreading Your Community', imgSrc: getIconSrc(iconVariables.icon1), link_to:'discussion' },
    { id: 2, title: 'Choose Community and Journal.', imgSrc: getIconSrc(iconVariables.icon2), link_to:'' },
    // { id: 3, title: 'Book the Slot And G-meet. Live Will be Available for All Members of E-mall', imgSrc: getIconSrc(iconVariables.icon3), link_to:'' },
    { id: 4, title: 'Choose Relation and group.', imgSrc: getIconSrc(iconVariables.icon4), link_to:'votes' },
    { id: 5, title: 'Upload your video, pic or text.', imgSrc: getIconSrc(iconVariables.icon5), link_to:'' },
    // { id: 6, title: 'Leader board with max votes', imgSrc: getIconSrc(iconVariables.icon6), link_to:'' },
  ];

  return (
    <Box className="community_main_wrapper">
      <Box className="row">
        <Box className="col">
          <Box></Box>
          <Link className="title_container" to="../emotional">
            <Box component="img" src={community_icon} alt="community" className="community_icon" />
            <Typography className="community_title" variant="h2">community</Typography>
          </Link>
          <UserBadge
            handleBadgeBgClick={-1}
            handleLogin="../login"
            handleLogoutClick="../../AmbarsariyaMall"
          />
        </Box>
        <Box className="col">
          {/* <Box className="cards_container">
            <Box className="cards_row">
              {data.map((item) => (
                <Link className="card" key={item.id} to={item.link_to}>
                  <Box
                    component="img"
                    src={item.imgSrc}
                    alt="icon"
                    className="icon"
                  />
                  <Typography className="title">
                    {item.title}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Box> */}

        <Box className="cards_container">
          <Box className="cards_row">
            <Box className="card">
              <CreateCommunityForm />
            </Box>
          </Box>
        </Box>

        </Box>
      </Box>
    </Box>
  );
}

export default Community;
