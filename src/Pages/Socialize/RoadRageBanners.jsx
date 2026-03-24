import React from 'react';
import { Box, Typography } from '@mui/material';
import UserBadge from '../../UserBadge';

const ROAD_RAGE_BANNER_LINK = 'https://www.google.com/maps/d/embed?mid=13jvjY-xAlq5TuZv-QhFApxqI70018s4&ehbc=2E312F';

function RoadRageBanners() {
  return (
    <Box className="road_rage_banners_wrapper">
      <Box className="row">
        <Box className="col back_button">
          <UserBadge
            handleLogoutClick="../../"
            handleBadgeBgClick={-1}
            handleLogin="login"
          />
        </Box>
        <Box className="col heading_container">
          <Typography className="heading">Road Rage Banners</Typography>
        </Box>
      </Box>

      <Box className="row">
        <Box className="col">
          <Box className="map_frame">
            <iframe
              src={ROAD_RAGE_BANNER_LINK}
              title="Road Rage Banners Map"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default RoadRageBanners;
