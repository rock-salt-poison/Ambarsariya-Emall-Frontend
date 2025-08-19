import React, { useEffect, useMemo, useState } from "react";
import { Avatar, Badge, Box, CircularProgress, Typography } from "@mui/material";
import VisitorShopForm from "./VisitorShopForm";
import { Link, useNavigate } from "react-router-dom";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { delete_supportChatNotification, get_co_helper_member_notifications, get_supportChatNotifications, getUser, post_supportChatMessage } from "../../API/fetchExpressAPI";
import ClearIcon from '@mui/icons-material/Clear';
import ForumIcon from '@mui/icons-material/Forum';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import NotificationReplyForm from "./NotificationReplyForm";
import { useSelector } from "react-redux";
import CoHelperTypePopup from "../Cart/CoHelper/CoHelperTypePopup";
import cards from "../../API/coHelpersData";
import ConfirmationDialog from "../ConfirmationDialog";
dayjs.extend(relativeTime);

const VisitorFormBox = ({ visitorData, shopData, currentUser }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [value, setValue] = useState({ domain: "domain", sector: "sector" });
  const [notifications, setNotifications] = useState([]);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [showFields, setShowFields] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const navigate = useNavigate();  
  const token = useSelector((state) => state.auth.userAccessToken);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedCoHelperNotification, setSelectedCoHelperNotification] = useState(null);
  const [openDialog, setOpenDialog] = useState({open: false, id:''});

  const getContentFromType = (type) => cards.find((c) => c.title === type);

  console.log(currentUser);
  

  const handleFormSubmitSuccess = (domain, sector, submit) => {
    setFormSubmitted(submit);
    setValue((prevData) => ({ ...prevData, domain, sector }));
  };

  const handleHeadingClick = () => {
    setShowFields((prev) => !prev);
  };

  const handleNotificationClick = async (shopNo) => {
    if (shopNo) {
      try {
        setLoading(true);
        let combined = [];

      // Fetch shop notifications
      if (shopData?.shop_no) {
        const shopResp = await get_supportChatNotifications(shopData.shop_no);
        if (shopResp?.valid) {
          combined = [...combined, ...shopResp.data];
        }
      }

      // Fetch co-helper notifications (same as NotificationsPopup)
      if (token) {
        const userResp = (await getUser(token))?.find(u => u?.member_id);
        if (userResp?.member_id) {
          const memberNotifs = await get_co_helper_member_notifications(userResp.member_id);
          if (memberNotifs?.valid) {
            // Optional: normalize the shape so UI can handle both
            const formatted = memberNotifs.data.map(n => ({
              ...n,
              id: n.notification_number,
              name: n.member_name || n.requester_name,
              notification: n.member_role === 'sender'
                ? `You assigned a task to ${n.member_name} for ${n?.co_helper_type}.`
                : `${n?.requester_name} assigned you a new task.`,
              notification_received_at: n.notification_created_at || new Date().toISOString(),
              type: 'co_helper'
            }));
            combined = [...combined, ...formatted];
          }
        }
      }

      // Deduplicate by ID
      const unique = combined.filter(
        (item, index, self) => index === self.findIndex(t => t.id === item.id)
      );

      setNotifications(unique);
      setNotificationOpen(true);
      } catch (e) {
        console.error("Error: ", e);
        // setNotificationOpen(false);
      } finally {
        setLoading(false);
      }
    } else {
      // setNotificationOpen(false);
      setNotifications([]);
    }
  };
  
  
  const handleRemove = async (e, id) => {
    e.preventDefault();
    if (id) {
      try {
        setOpenDialog(false);
        setLoading(true);
        const resp = await delete_supportChatNotification(id);
        if (resp.valid) {
          setNotifications((prev) => prev.filter((n) => n.id !== id)); // Remove from UI
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCardClick = async (msg) => {
    setSelectedNotification(msg);
  };  

  const handleSelectedNotification = async (msg) =>{
    setSelectedNotification(msg);
  }

  console.log(currentUser);
  console.log(visitorData);
  

  useEffect(() => {
    if (shopData) {
      handleNotificationClick(shopData?.shop_no);
    }
  }, [shopData]);
  
  

  return (
    <Box className="container">
      {loading && <Box className="loading"><CircularProgress /></Box>}
      <Box className="circle">
      {notifications ? (
          notificationOpen ? (
            selectedNotification === null ? (
              <Link onClick={() => {setNotificationOpen(false);setSelectedNotification(null);}}>
                <Badge className="badge_bg">
                  <ForumIcon className="notification_icon" />
                </Badge>
              </Link>
            ) : (
              <Link onClick={() => { setNotificationOpen(true); setSelectedNotification(null) }}>
                <Badge className="badge_bg" badgeContent={notifications?.length}>
                  <NotificationsIcon className="notification_icon" />
                </Badge>
              </Link>
            )
          ) : (
            <Link onClick={() => { handleNotificationClick(shopData?.shop_no);  setNotificationOpen(true);setSelectedNotification(null) }}>
              <Badge className="badge_bg" badgeContent={notifications?.length}>
                <NotificationsIcon className="notification_icon" />
              </Badge>
            </Link>
          )
        ) : null}
      </Box>

      {notificationOpen && selectedNotification === null ? (
  notifications?.length === 0 ? (
    <Box className="content noNotification">
      <Typography variant="h2">No new notifications</Typography>
    </Box>
  ) : (
    <Box className="list content">
      {notifications.map((msg) => (
        <Link key={msg.id} className="card" onClick={() => {
            if (msg.type === "co_helper") {
              setSelectedCoHelperNotification(msg);
              setPopupOpen(true);
            } else {
              handleCardClick(msg);
            }
          }}
        >
          <Box className="col">
            <Avatar alt={msg.name} src="/broken-image.jpg" />
          </Box>
          <Box className="col">
            <Box className="header">
              <Typography variant="h3">{msg?.type === 'co_helper' ? msg?.notification : msg?.name}</Typography>
              {msg?.type !== 'co_helper' && <Link onClick={(e) =>{e.stopPropagation(); setOpenDialog({open: true, id : msg?.id})}}>
                <ClearIcon />
              </Link>}
            </Box>
            <Typography className="message">{msg?.type=== 'co_helper' ? `Date : ${(msg?.task_date)?.split('T')?.[0]}, \n Time : ${msg?.task_time}`: msg.notification}</Typography>
            <Typography className="time">
              {dayjs(msg.notification_received_at).fromNow()}
            </Typography>
          </Box>
        </Link>
      ))}
    </Box>
  )
) : selectedNotification !== null ? (
  <Box className="content chatContent">
    <Box className="form_container chatBox">
      <NotificationReplyForm
        visitorData={visitorData}
        onSubmitSuccess={handleFormSubmitSuccess}
        selectedNotification={selectedNotification}
        currentUser={currentUser}
      />
    </Box>
  </Box>
) : !notificationOpen && selectedNotification === null && (
  <Box className="content">
    <Typography variant="h2">
      We are here to solve your query with care and clarity !
      {/* <Link onClick={handleHeadingClick}>
        <Typography variant="span">
          {shopData ? `${shopData.domain_name} - ${shopData.sector_name}` : formSubmitted && visitorData?.domain_name && visitorData?.sector_name
            ? `${visitorData.domain_name} - ${visitorData.sector_name}`
            : `${value.domain} - ${value.sector}`}
        </Typography>
      </Link> */}
    </Typography>
    <Box className="form_container">
      <VisitorShopForm
        visitorData={visitorData}
        onSubmitSuccess={handleFormSubmitSuccess}
        showFields={showFields}
        setSelectedNotification={handleSelectedNotification}
        currentUser={currentUser}
      />
    </Box>
  </Box>
)}
<CoHelperTypePopup  open={popupOpen}
                  handleClose={() => setPopupOpen(false)}
                  id={selectedCoHelperNotification?.notification_number}
                  content={getContentFromType(selectedCoHelperNotification?.co_helper_type)}
                />

                <ConfirmationDialog
                              open={openDialog.open}
                              onClose={() => setOpenDialog(false)}
                              onConfirm={(e) => handleRemove(e, openDialog.id)}
                              title="Confirm Delete"
                              message={'Are you sure you want to delete this message.?'}
                              optionalCname="logoutDialog"
                              confirmBtnText='Confirm'
                            />
    </Box>
  );
};

export default VisitorFormBox;
