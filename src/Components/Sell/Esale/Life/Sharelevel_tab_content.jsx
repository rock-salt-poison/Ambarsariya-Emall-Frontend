import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import Switch_On_Off2 from '../../../Form/Switch_On_Off2';
import { useSelector } from 'react-redux';
import { get_member_share_level, getUser, put_member_share_level } from '../../../../API/fetchExpressAPI';
import CustomSnackbar from '../../../CustomSnackbar';

function Sharelevel_tab_content({ title, communityData }) {
  const [loading, setLoading] = useState(false);
  const [member, setMember] = useState(null);
  const [checkedStates, setCheckedStates] = useState({});
  const token = useSelector((state) => state.auth.userAccessToken);

  const [snackbar, setSnackbar] = useState({
      open: false,
      message: "",
      severity: "success",
    });

  const data = [
    { id: 1, title: 'Emotional' },
    { id: 2, title: 'Personal' },
    { id: 3, title: 'Professional' },
    { id: 4, title: 'Community' },
    { id: 5, title: 'Relations' },
    { id: 6, title: 'Locations' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        const user = (await getUser(token))[0];
        if (user.user_type === 'member') {
          console.log('User:', user);
          setMember(user);
        }
      }
    };
    fetchData();
  }, [token]);

  useEffect(() => {
    const fetchMemberShareLevel = async () => {
      if (member) {
        try {
          setLoading(true);
          const resp = await get_member_share_level(member.member_id);
          console.log('Share Levels:', resp);
          if(resp.valid){
              // Map the API response to checkedStates
              const newCheckedStates = {
                Emotional: resp?.data?.[0]?.emotional_public || false,
                Personal: resp?.data?.[0]?.personal_public || false,
                Professional: resp?.data?.[0]?.professional_public || false,
                Community: false, // Assuming these are manually controlled
                Relations: resp?.data?.[0]?.relations_public || false,
                Locations: false,
              };
              setCheckedStates(newCheckedStates);
          }
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchMemberShareLevel();
  }, [member]);

  const handleOnChange = async (id, title) => {
    const newIsPublic = !checkedStates[title];

    

    if (title !== 'Community' && title !== 'Locations') {
      try {
        setLoading(true);
        const data = {
          memberId: member.member_id,
          level: title,
          isPublic: newIsPublic,
        };
        const resp = await put_member_share_level(data);
        console.log('Updated:', resp);
        if(resp.success){
          setSnackbar({
            open: true,
            message: resp.message,
            severity: "success",
          });
          setCheckedStates((prevStates) => ({
            ...prevStates,
            [title]: newIsPublic,
          }));
        }
      } catch (e) {
        console.error(e);
         setSnackbar({
            open: true,
            message: e.response.data.message,
            severity: "error",
          });
      } finally {
        setLoading(false);
      }
    }
  };

  console.log('checkedStates:', checkedStates);

  return (
    <Box className="tab_content">
      {loading && (
        <Box className="loading">
          <CircularProgress />
        </Box>
      )}
      <Typography className="title">{title}</Typography>
      <Box className="content">
        {data.map((item) => (
          <Box className="list share_level" key={item.id}>
            <Typography className="heading">{item.title}</Typography>
            <Switch_On_Off2
              checked={checkedStates[item.title] || false}
              onChange={() => handleOnChange(item.id, item.title)}
            />
          </Box>
        ))}
      </Box>
      <CustomSnackbar
        open={snackbar.open}
        handleClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </Box>
  );
}

export default Sharelevel_tab_content;
