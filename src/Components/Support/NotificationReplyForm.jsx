import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import {
  initializeWebSocket,
  fetchChatMessagesBySupportId,
  sendSupportMessage,
  get_supportChatMessages,
  getUser,
  post_supportChatMessage,
} from "../../API/fetchExpressAPI";
import CustomSnackbar from "../CustomSnackbar";
import FormField from "../Form/FormField";
import { useSelector } from "react-redux";

const NotificationReplyForm = ({ visitorData, selectedNotification, currentUser }) => {
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messageEndRef = useRef(null);

  const token = useSelector((state) => state.auth.userAccessToken);
  
    
  
  //   const fetchData = async (visitor_token) => {
  //     try {
  //       setLoading(true);
  //       const resp = (await get_visitorData(visitor_token));
  //       if (resp.valid) {
  //         setVisitorData(resp.data[0]);
  //         setLoading(false);
  //       } else {
  //         console.error(resp);
  //         setVisitorData(null);
  //         setLoading(false);
  //         setSnackbar({ open: true, message: resp.message, severity: 'error' });
  //       }
  //     } catch (error) {
  //       console.error(error);
        
  //       setLoading(false);
  //       setSnackbar({ open: true, message: error.response.data.message, severity: 'error' });
  //       setVisitorData(null);
  //     }
  //   };
  
  //   const fetchShopData = async (shop_token, user_token) => {
  //     try{
  //       setLoading(true);
  //       const resp = await getShopUserData(shop_token);
  //       const shopUserData = resp?.[0] || {}; // Ensure an object even if API returns nothing
  
  //     // console.log(shopUserData);
  
  //     if (Object.keys(shopUserData).length > 0) {
  //       setShopData((prev) => ({
  //         ...shopUserData,
  //         user_type: "shop",
  //         access_token: user_token
  //       }));
  //     }
  //     }catch(e){
  //       console.log(e);
  //       setSnackbar({ open: true, message: e.response.data.message, severity: 'error' });
  //       setVisitorData(null);
  //       setShopData(null);
  //     }finally{
  //       setLoading(false);
  //     }
  //   }
  
  //   const fetchMemberData = async (user_access_token) => {
  //     try{
  //       setLoading(true);
  //       const resp = await getMemberData(user_access_token);
  //       const memberUserData = resp?.[0] || {}; // Ensure an object even if API returns nothing
        
  //       if (Object.keys(memberUserData).length > 0) {
  //       setMemberData((prev) => ({
  //         ...memberUserData,
  //         user_type: "member",
  //         access_token : user_access_token
  //       }));
  //     } 
  //     }catch(e){
  //       console.log(e);
  //       setSnackbar({ open: true, message: e.response.data.message, severity: 'error' });
  //       setVisitorData(null);
  //       setShopData(null);
  //     }finally{
  //       setLoading(false);
  //     }
  //   }
  // console.log(shopData);
  
  // useEffect(() => {
  //   if(token){
  //     const verifyUser = async () => {
  //       const user = (await getUser(token))[0];
  //       console.log(user);
        
  //         // if(user.support_id && user.visitor_id){
  //         //   fetchData(user.user_access_token);
  //         // }

  //         // if(user.shop_access_token && user.user_type === 'shop'){
  //         //   fetchShopData(user.shop_access_token, user.user_access_token);
  //         //   if(user.support_id && user.visitor_id){
  //         //     fetchData(user.user_access_token);
  //         //   }
  //         //   setUserLoggedIn(true);
  //         // }

  //         // else if(user.user_access_token && user.user_type === 'member'){
  //         //   fetchMemberData(user.user_access_token)
  //         //   if(user.support_id && user.visitor_id){
  //         //     fetchData(user.user_access_token);
  //         //   }
  //         //   setUserLoggedIn(true);
  //         // }

  //         // else if(user.user_access_token && user.user_type === 'visitor'){
  //         //   setUserLoggedIn(true);
  //         //   fetchData(user.user_access_token);
  //         // } 

  //         // else{
  //         //   setUserLoggedIn(false);
  //         // }
  //     }
  //     verifyUser();
  //   }
  // }, [token]);

  console.log('userData' , visitorData);
  console.log('selectedNotification' , selectedNotification);
  console.log('currentUser' , currentUser);
  
  // Auto scroll to latest message
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch previous chat messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const resp = await get_supportChatMessages(selectedNotification.support_id, selectedNotification.id);
        if(resp.valid){
          console.log(resp.data);
          
          setMessages(resp.data);
        }
      } catch (err) {
        setSnackbar({
          open: true,
          message: "Failed to load chat",
          severity: "error",
        });
      }finally{
        setLoading(false);
      }
    };

    if (selectedNotification?.support_id) {
      fetchMessages();
    }
  }, [selectedNotification]);

  // WebSocket for real-time updates
  useEffect(() => {
    const socket = initializeWebSocket();

    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
     try{
      setLoading(true);
      const data = {
        visitor_id: selectedNotification.visitor_id,
        notification_id: selectedNotification.id,
        support_id: selectedNotification.support_id,
        sender_id: currentUser.user_type === 'shop' ? currentUser.shop_no : currentUser.user_type === 'member' ? currentUser.member_id : currentUser.user_type === 'visitor' ? currentUser.visitor_id :  null,
        sender_type: currentUser.user_type,
        receiver_id: selectedNotification.sent_from,
        receiver_type: selectedNotification.user_type,
        message: newMessage
      };

      console.log(data);
      
      const resp = await post_supportChatMessage(data);
      if(resp.message==='Chat created successfully'){
        setMessages((prev) => [...prev, { ...data, sent_at: new Date() }]);
      setNewMessage("");
      }      
    }catch(e){
      console.log(e);
      setSnackbar({
            open: true,
            message: "Failed to send message",
            severity: "error",
          });
    }finally{
      setLoading(false);
    }

    // const msgPayload = {
    //   support_id: selectedNotification.support_id,
    //   sender_id: currentUser.id,
    //   sender_type: currentUser.type,
    //   receiver_id: visitorData?.user_id,
    //   receiver_type: "visitor",
    //   message: newMessage.trim(),
    // };

    // try {
    //   await sendSupportMessage(msgPayload); // backend API call
    //   setMessages((prev) => [...prev, { ...msgPayload, sent_at: new Date() }]);
    //   setNewMessage("");
    // } catch (err) {
    //   setSnackbar({
    //     open: true,
    //     message: "Failed to send message",
    //     severity: "error",
    //   });
    // }
  };
  console.log('messages : ', messages);
  
  const getCurrentUserId = () => {
    switch (currentUser.user_type) {
      case 'shop':
        return currentUser.shop_no;
      case 'member':
        return currentUser.member_id;
      case 'visitor':
        return currentUser.visitor_id;
      default:
        return null;
    }
  };
  console.log(currentUser);
  

  return (
    <Box className="chat_container">

      <Box className="chat">
        {loading && (
          <Box className="loading">
            <CircularProgress />
          </Box>
        )}
        {messages?.map((msg, index) => {
          console.log(msg);

          const isMyMsg = msg.sender_id === getCurrentUserId() && msg.sender_type === currentUser.user_type;
          
          console.log('isMyMsg : ', isMyMsg);
          // Determine sender name
          let senderName = "";
          if (msg.sender_id === currentUser.shop_no || msg.sender_id === currentUser.member_id || msg.sender_id === visitorData?.visitor_id) {
            senderName = "You";
          }  else {
            senderName =  msg.receiver_name;
          }
          
          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: isMyMsg ? "flex-end" : "flex-start",
                mb: 1,
              }}
            >
              <Paper
                elevation={1}
                sx={{
                  p: 1,
                  bgcolor: isMyMsg ? "#e0ffe0" : "#f5f5f5",
                  maxWidth: "70%",
                  borderRadius: "10px",
                }}
              >
                <Typography variant="body2">{msg.message}</Typography>
                <Box className="caption">
                  <Typography variant="caption" color="textSecondary">
                    ~ {senderName}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                  {new Date(msg.sent_at).toLocaleTimeString('en-IN', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true})}
                  </Typography>
                </Box>
              </Paper>
            </Box>
          );
        })}
        <div ref={messageEndRef} />
      </Box>

      <Box className="sendMessagaeForm" autoComplete="off" component="form" onSubmit={handleSendMessage}>
        <Box className="form-group form-group2">
          <FormField
            type="text"
            name="reply"
            multiline
            rows={2}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)} // Handle file selection
            placeholder="Type your message..."
            className="input_field"
            required={true}
          />
        </Box>
        <Box className="submit_button_container">
          <Button type="submit" variant="contained" className="submit_button">
            Submit
          </Button>
        </Box>

      </Box>

      <CustomSnackbar
        open={snackbar.open}
        handleClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        severity={snackbar.severity}
        disableAutoHide={true}
      />
    </Box>
  );
};

export default NotificationReplyForm;
