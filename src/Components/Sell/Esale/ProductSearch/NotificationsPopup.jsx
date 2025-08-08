import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from "react-redux";
import { get_co_helper_member_notifications, getUser } from "../../../../API/fetchExpressAPI";
import { Link } from "react-router-dom";
import CoHelperTypePopup from "../../../Cart/CoHelper/CoHelperTypePopup";
import cards from "../../../../API/coHelpersData";

export default function NotificationsPopup({ open, handleClose }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm")); // Fullscreen on small screens
  const token = useSelector((state) => state.auth.userAccessToken);
  const [loading, setLoading]= useState(false);
  const [memberNotifications, setMemberNotifications]= useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);


  useEffect(()=>{
    if(token){
      fetch_currentUser(token);
    }
  }, [token]);

  const getContentFromType = (type) => cards.find((c) => c.title === type);

  const fetch_currentUser = async (token) => {
    try{
      setLoading(true);
      const resp = (await getUser(token))?.find((u)=> u?.member_id !== null);
      if(resp){
        const member_notificatons = await get_co_helper_member_notifications(resp?.member_id);
        if(member_notificatons?.valid){
          setMemberNotifications(member_notificatons?.data);
        }
      }
    }catch(e){

    }finally{
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className="member-notifications-paper"
      maxWidth="sm"
      fullScreen={fullScreen}
      fullWidth
    >
      {loading && <Box className="loading"><CircularProgress/></Box> }
      {/* <IconButton
        edge="start"
        color="inherit"
        onClick={handleClose}
        aria-label="close"
        className="closeBtn"
      >
        <CloseIcon />
      </IconButton> */}
            <Box className="notification_container">
              <Box className="notification_icon">
                  {/* <NotificationsIcon className="icon"/> */}
                  <Typography>Notifications</Typography>
              </Box>
              {/* <Box className="alert_number">
                <PriorityHighIcon className="icon"/>
              </Box> */}
            </Box>
      <DialogContent className="refundReturnPopupDialogBoxContent">
        <Box className="content">
          <Box className="content-body">
              {/* <Button>Clear all</Button> */}
              <Box className="notifications_container">
                
                {memberNotifications?.map((member) => {
                  return <React.Fragment key={member?.notification_number}><Link className="list"
                  onClick={() => {
                    setSelectedNotification(member);
                    setPopupOpen(true);
                  }}>
                  <Box className="col">
                    <Typography className="heading">
                      {member?.member_role === 'sender' ? (
                        `You assigned a task to ${member.member_name} for ${member?.co_helper_type}.`
                      ) : member?.member_role === 'receiver' && (
                        `${member?.requester_name} assigned you a new task.`
                      )}
                    </Typography>
                    <Typography className="description">
                      {
                        (member?.member_role === 'sender' && member?.status === 'pending') ? 'Awaiting response.' : (member?.member_role === 'receiver' && member?.status === 'pending') && 'Please respond.'
                      }
                    </Typography>
                  </Box>
                  <Box className="col">
                    <Box className="remove_icon">
                      <CloseIcon />
                    </Box>
                  </Box>
                </Link>
                </React.Fragment>
                })}
              </Box>
          </Box>
        </Box>
      </DialogContent>
      <CoHelperTypePopup  open={popupOpen}
                  handleClose={() => setPopupOpen(false)}
                  id={selectedNotification?.notification_number}
                  content={getContentFromType(selectedNotification?.co_helper_type)}
                />
    </Dialog>
  );
}
