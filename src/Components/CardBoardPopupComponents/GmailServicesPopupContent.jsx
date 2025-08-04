import React, { useState, useEffect } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import Switch_On_Off2 from '../Form/Switch_On_Off2';
import { get_userScopes, getMemberData, getUser, post_requestDynamicGoogleAccess } from '../../API/fetchExpressAPI';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function GmailServicesPopupContent(props) {
  const [scopes, setScopes] = useState([]);
  const [loading, setLoading] = useState(false);
  const {owner} = useParams();
  const authToken = useSelector((state) => state.auth.userAccessToken);
  const token = owner || authToken;
  const [user, setUser] = useState(null);

  const [serviceSwitches, setServiceSwitches] = useState({
    contacts: false,
    maps: false,
    calendar: false,
    meet: false,
    photos : false,
    chat : false,
    profile : false,
  });

  const serviceScopeMapping = {
    contacts: 'https://www.googleapis.com/auth/contacts.readonly',
    maps: 'https://www.googleapis.com/auth/mapsengine',
    calendar: 'https://www.googleapis.com/auth/calendar',
    meet: 'https://www.googleapis.com/auth/meetings.space.created',
    photos: 'https://www.googleapis.com/auth/photoslibrary.readonly',
    chat: `https://www.googleapis.com/auth/chat.messages`,
    profile: 'https://www.googleapis.com/auth/userinfo.profile'
  };

  const fetchMemberData = async (memberToken) => {
    setLoading(true);
    const user = await getMemberData(memberToken);
    console.log(user);
    
    setUser(user?.[0]);
    if (user) {
      fetchUserScopes(user?.[0]?.oauth_access_token, user?.[0]?.oauth_refresh_token);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        setLoading(true);
        const user = (await getUser(token))?.find((u)=> u?.member_id !== null);
        if (user.user_type === "member" || user.user_type === "merchant") {
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
        profile: scopesArray.includes(serviceScopeMapping.profile),
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(serviceSwitches);
    
    // Filter out selected services
    const selectedServices = Object.keys(serviceSwitches).filter(service => serviceSwitches[service]);
  
    console.log(selectedServices);
    
    // Check if at least one service is selected
    if (selectedServices.length === 0) {
      alert('Please select at least one service!');
      return;
    }
  
    // Prepare payload with username and selected services
    const payload = {
      username: user?.username,  // Replace with actual username if available
      services: selectedServices
    };
  
    // Check if username is available
    if (!payload.username) {
      alert('Username is required!');
      return;
    }
  
    try {
      setLoading(true);
      
      // Post request to backend for dynamic Google access
      const response = await post_requestDynamicGoogleAccess(payload);
      console.log(response);
      
      // Redirect to Google auth URL if successful
      if (response.success) {
        window.location.href = response.authUrl;  // Redirect to Google's auth page
      } else {
        console.error(response.message);
        alert(`Error: ${response.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while processing your request.');
    } finally {
      setLoading(false);
    }
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

        <Box className="service">
          <Typography className='label'>Google Profile</Typography>
          <Switch_On_Off2 checked={serviceSwitches.profile} onChange={handleSwitchChange('profile')} />
        </Box>

      </Box>
      {token === authToken && <Box className="submit_button_container" onClick={handleSubmit}>
        <Button type="submit" variant="contained" className="submit_button">
          Submit
        </Button>
      </Box>}
    </Box>
  );
}

export default GmailServicesPopupContent;
