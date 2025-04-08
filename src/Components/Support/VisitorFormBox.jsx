import React, { useEffect, useMemo, useState } from "react";
import { Avatar, Badge, Box, CircularProgress, Typography } from "@mui/material";
import VisitorShopForm from "./VisitorShopForm";
import { Link, useNavigate } from "react-router-dom";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { delete_supportChatNotification, get_supportChatNotifications } from "../../API/fetchExpressAPI";
import ClearIcon from '@mui/icons-material/Clear';
import ForumIcon from '@mui/icons-material/Forum';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import NotificationReplyForm from "./NotificationReplyForm";
dayjs.extend(relativeTime);

const VisitorFormBox = ({ visitorData, shopNo }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [value, setValue] = useState({ domain: "domain", sector: "sector" });
  const [notifications, setNotifications] = useState([]);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [showFields, setShowFields] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const navigate = useNavigate();

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
        const response = await get_supportChatNotifications(shopNo);
        if (response.valid) {
          // Deduplicate before setting
          const unique = response.data.filter(
            (item, index, self) =>
              index === self.findIndex((t) => t.id === item.id)
          );
          setNotifications(unique);
          setNotificationOpen(true);
        }
      } catch (e) {
        console.error("Error: ", e);
        setNotificationOpen(false);
      } finally {
        setLoading(false);
      }
    } else {
      setNotificationOpen(false);
      setNotifications([]);
    }
  };
  
  
  const handleRemove = async (e, id) => {
    e.preventDefault();
    if (id) {
      try {
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

  const handleCardClick = (msg) => {
    setSelectedNotification(msg);
  };  

  useEffect(() => {
    if (shopNo) {
      handleNotificationClick(shopNo);
    }
  }, [shopNo]);
  
  
console.log(notifications);

  return (
    <Box className="container">
      {loading && <Box className="loading"><CircularProgress /></Box>}
      <Box className="circle">
      {notifications?.length > 0 ? (
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
            <Link onClick={() => { handleNotificationClick(shopNo); setSelectedNotification(null) }}>
              <Badge className="badge_bg" badgeContent={notifications?.length}>
                <NotificationsIcon className="notification_icon" />
              </Badge>
            </Link>
          )
        ) : null}
      </Box>

      {notifications?.length > 0 && notificationOpen && selectedNotification === null ? (
        <Box className="list content">
          {notifications?.map((msg) => (
            <Link key={msg.id} className="card" onClick={() => handleCardClick(msg)}>
              <Box className="col">
                <Avatar alt={msg.name} src="/broken-image.jpg" />
              </Box>
              <Box className="col">
                <Box className="header">
                  <Typography variant="h3">{msg.name}</Typography>
                  <Link onClick={(e) => handleRemove(e, msg.id)}><ClearIcon /></Link>
                </Box>
                <Typography className="message">{msg.notification}</Typography>
                <Typography className="time">
                  {dayjs(msg.notification_received_at).fromNow()}
                </Typography>
              </Box>
            </Link>
          ))}
        </Box>
      ) : selectedNotification !== null ? (
        <Box className="content">
          <Box className="form_container">
            <NotificationReplyForm
              visitorData={visitorData}
              onSubmitSuccess={handleFormSubmitSuccess}
              selectedNotification={selectedNotification}
            />
          </Box>
        </Box>
      ) : !notificationOpen && selectedNotification === null && (
        <Box className="content">
          <Typography variant="h2">
            E-Ambarsariya:
            <Link onClick={handleHeadingClick}>
              <Typography variant="span">
                {formSubmitted && visitorData?.domain_name && visitorData?.sector_name
                  ? `${visitorData.domain_name} - ${visitorData.sector_name}`
                  : `${value.domain} - ${value.sector}`}
              </Typography>
            </Link>
          </Typography>
          <Box className="form_container">
            <VisitorShopForm
              visitorData={visitorData}
              onSubmitSuccess={handleFormSubmitSuccess}
              showFields={showFields}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default VisitorFormBox;
