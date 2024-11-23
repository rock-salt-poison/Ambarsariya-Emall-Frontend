import React, { useState, useEffect } from 'react';
import { Box, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import hornSound from '../../../Utils/audio/horn-sound.mp3';
import Swal from 'sweetalert2';
import { checkLocationPermission, handleLocationRequest } from '../../../API/LocationPermission';
import { checkCameraPermission, handleCameraRequest } from '../../../API/CameraPermission';
import { checkNotificationPermission, handleNotificationRequest } from '../../../API/BannerNotificationPermission';
import { checkMicrophonePermission, handleMicrophoneRequest } from '../../../API/MicrophonePermission';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';

// import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

const OnOffComponent = ({ title }) => {
  const [view, setView] = useState('off');
  const [audio] = useState(new Audio(hornSound));
  const [accessToken, setAccessToken] = useState(null);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const { access_token } = tokenResponse;
      setAccessToken(access_token);
      setView('on');
    },
    scope: 'https://www.googleapis.com/auth/calendar.events',
  });

  useEffect(() => {
    if (title === 'Live location sharing') {
      checkLocationPermission(setView);
    } else if (title === 'Camera permissions') {
      checkCameraPermission(setView);
    } else if (title === 'Banner Notifications') {
      checkNotificationPermission(setView);
    } else if (title === 'Announcements in mall') {
      checkMicrophonePermission(setView);
    } else if (title === 'Schedule Shopping') {
      if (accessToken) {
        setView('on');
      }
    }
  }, [title, accessToken]);
  console.log(accessToken)
  const handleAddReminder = async () => {
    const reminder = {
      summary: 'Reminder: Shopping Time',
      start: {
        dateTime: '2024-06-07T09:00:00-07:00',
        timeZone: 'America/Los_Angeles',
      },
      end: {
        dateTime: '2024-06-07T09:30:00-07:00',
        timeZone: 'America/Los_Angeles',
      },
    };

    try {
      const response = await axios.post(
        'https://www.googleapis.com/calendar/v3/calendars/primary/events',
        reminder,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Reminder added:', response.data);
    } catch (error) {
      console.error('Error adding reminder to Google Calendar:', error);
    }
};


  const handleChange = (event, nextView) => {
    if (title === 'Live location sharing' && nextView === 'off') {
      Swal.fire({
        title: 'Location sharing turned off.',
        text: 'Please disable location sharing in your browser settings.',
        icon: 'info',
        customClass: {
          popup: 'swal2-popup'
        }
      });
    } else if (title === 'Live location sharing' && nextView === 'on') {
      handleLocationRequest(setView);
    } else if (title === 'Camera permissions' && nextView === 'off') {
      Swal.fire({
        title: 'Camera permissions turned off.',
        text: 'Please disable camera permissions in your browser settings.',
        icon: 'info',
        customClass: {
          popup: 'swal2-popup'
        }
      });
    } else if (title === 'Camera permissions' && nextView === 'on') {
      handleCameraRequest(setView);
    } else if (title === 'Banner Notifications' && nextView === 'off') {
      Swal.fire({
        title: 'Notification permissions turned off.',
        text: 'Please disable notification permissions in your browser settings.',
        icon: 'info',
        customClass: {
          popup: 'swal2-popup'
        }
      });
    } else if (title === 'Banner Notifications' && nextView === 'on') {
      handleNotificationRequest(setView);
    } else if (title === 'Announcements in mall' && nextView === 'off') {
      Swal.fire({
        title: 'Microphone permissions turned off.',
        text: 'Please disable microphone permissions in your browser settings.',
        icon: 'info',
        customClass: {
          popup: 'swal2-popup'
        }
      });
    } else if (title === 'Announcements in mall' && nextView === 'on') {
      handleMicrophoneRequest(setView);
    } else if (title === 'Schedule Shopping' && nextView === 'on') {
      handleAddReminder();
    } else if (title === 'Schedule Shopping' && nextView === 'off') {
      setView('off');
    } else {
      setView(nextView);
    }
  };

  const handleClick = (nextView) => {
    if (view !== nextView) {
      audio.play();
    }
    if (title === 'Schedule Shopping' && nextView === 'on') {
      handleAddReminder();
    }
  };

  return (
    <Box className="on_off_component_parent">
      <Box className="row">
        <ToggleButtonGroup
          orientation="vertical"
          value={view}
          exclusive
          onChange={(event, nextView) => {
            handleChange(event, nextView);
            handleClick(nextView);
          }}
        >
          <ToggleButton
            value="off"
            aria-label="off"
            className={view === 'off' ? 'backButton active off' : 'backButton off'}
            disabled={view === 'off'}
          >
            <Link>
              <Typography>
                Off
              </Typography>
            </Link>
          </ToggleButton>
          <ToggleButton 
            value="on" 
            aria-label="on" 
            className={view === 'on' ? 'backButton active on' : 'backButton'}
            disabled={view === 'on'}
          >
            <Link>
              <Typography>
                On
              </Typography>
            </Link>
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Box>
  );
};

const WrappedOnOffComponent = (props) => (
  <GoogleOAuthProvider clientId="60742904341-i2qqkl1fmvf33ksgnk4n0ihpes197ls9.apps.googleusercontent.com">
    <OnOffComponent {...props} />
  </GoogleOAuthProvider>
);

export default WrappedOnOffComponent;
