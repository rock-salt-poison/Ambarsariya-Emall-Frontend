import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import Switch_On_Off2 from '../Form/Switch_On_Off2';
import { get_userScopes, getMemberData, getUser } from '../../API/fetchExpressAPI';
import { useSelector } from 'react-redux';

function GmailServicesPopupContent(props) {
  const [scopes, setScopes] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.auth.userAccessToken);

  const [serviceSwitches, setServiceSwitches] = useState({
    contacts: false,
    maps: false,
    calendar: false,
    meet: false,
  });

  const serviceScopeMapping = {
    contacts: 'https://www.googleapis.com/auth/contacts.readonly',
    maps: 'https://www.googleapis.com/auth/mapsengine',
    calendar: 'https://www.googleapis.com/auth/calendar',
    meet: 'https://www.googleapis.com/auth/meetings.space.created',
    photos: 'https://www.googleapis.com/auth/photoslibrary.readonly',
    chat: 'https://www.googleapis.com/auth/chat.bot',
  };

  const fetchMemberData = async (memberToken) => {
    setLoading(true);
    const user = await getMemberData(memberToken);
    if (user) {
      fetchUserScopes(user?.[0]?.oauth_access_token, user?.[0]?.oauth_refresh_token);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        setLoading(true);
        const user = (await getUser(token))[0];
        if (user.user_type === "member") {
          fetchMemberData(user.user_access_token);
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [token]);

  const fetchUserScopes = async (oauth_access_token, oauth_refresh_token) => {
    try {
      setLoading(true);
      const resp = await get_userScopes(oauth_access_token, oauth_refresh_token);
      const scopesArray = resp?.scopes?.split(' ') || [];

      setScopes(scopesArray);

      // Update switches based on scopes
      setServiceSwitches({
        contacts: scopesArray.includes(serviceScopeMapping.contacts),
        maps: scopesArray.includes(serviceScopeMapping.maps),
        calendar: scopesArray.includes(serviceScopeMapping.calendar),
        meet: scopesArray.includes(serviceScopeMapping.meet),
        photos: scopesArray.includes(serviceScopeMapping.photos),
        chat: scopesArray.includes(serviceScopeMapping.chat),
      });

    } catch (e) {
      console.log(e);
    }finally{
      setLoading(false);
    }
  };
 
  const handleSwitchChange = (service) => (e) => {
    const { checked } = e.target;
    setServiceSwitches((prevState) => ({
      ...prevState,
      [service]: checked
    }));
    console.log(`Switch for ${service} is now ${checked ? 'ON' : 'OFF'}`);
  };

  return (
    <Box className="gmail_service_container">
     {loading && <Box className="loading"><CircularProgress/></Box>}
      {props.description && (
        <Typography className='description'>
          {props.description}
        </Typography>
      )}
      <Box className="gmail_services">
        <Box className="service">
          <Typography className='label'>Google Contacts</Typography>
          <Switch_On_Off2 checked={serviceSwitches.contacts} onChange={handleSwitchChange('contacts')} />
        </Box>

        <Box className="service">
          <Typography className='label'>Google Maps</Typography>
          <Switch_On_Off2 checked={serviceSwitches.maps} onChange={handleSwitchChange('maps')} />
        </Box>

        <Box className="service">
          <Typography className='label'>Google Calendar</Typography>
          <Switch_On_Off2 checked={serviceSwitches.calendar} onChange={handleSwitchChange('calendar')} />
        </Box>

        <Box className="service">
          <Typography className='label'>Google Meet</Typography>
          <Switch_On_Off2 checked={serviceSwitches.meet} onChange={handleSwitchChange('meet')} />
        </Box>

        <Box className="service">
          <Typography className='label'>Google Photos</Typography>
          <Switch_On_Off2 checked={serviceSwitches.photos} onChange={handleSwitchChange('photos')} />
        </Box>

        <Box className="service">
          <Typography className='label'>Google Chats</Typography>
          <Switch_On_Off2 checked={serviceSwitches.chat} onChange={handleSwitchChange('chat')} />
        </Box>

      </Box>
    </Box>
  );
}

export default GmailServicesPopupContent;
