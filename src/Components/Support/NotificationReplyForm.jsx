import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Paper,
} from "@mui/material";
import {
  initializeWebSocket,
  get_supportChatMessages,
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
        console.log(err);
        
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
    
    if (selectedNotification?.support_id) {
      socket.emit("join_room", selectedNotification.support_id);
    }

    socket.on("chat_message", (message) => {
      setMessages((prev) => [...prev, message]);
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
        sender_id: currentUser.user_type === 'merchant' ? currentUser.merchant_id : currentUser.user_type === 'shop' ? currentUser.shop_no : currentUser.user_type === 'member' ? currentUser.member_id : currentUser.user_type === 'visitor' ? currentUser.visitor_id :  null,
        sender_type: currentUser.user_type,
        receiver_id: selectedNotification.sent_from,
        receiver_type: selectedNotification.user_type,
        message: newMessage
      };
      
      const resp = await post_supportChatMessage(data);
      if(resp.message==='Chat created successfully'){
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

  };
  
  const getCurrentUserId = () => {
    switch (currentUser.user_type) {
      case 'merchant':
        return currentUser.merchant_id;
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
  

  return (
    <Box className="chat_container">

      <Box className="chat">
        {loading && (
          <Box className="loading">
            <CircularProgress />
          </Box>
        )}
        {messages?.map((msg, index) => {

          const isMyMsg = msg.sender_id === getCurrentUserId() && msg.sender_type === currentUser.user_type;
          
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
