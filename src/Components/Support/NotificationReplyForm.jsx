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
  get_visitorData,
  initializeWebSocket,
  fetchChatMessagesBySupportId,
  sendSupportMessage,
  get_supportChatMessages,
} from "../../API/fetchExpressAPI";
import CustomSnackbar from "../CustomSnackbar";
import FormField from "../Form/FormField";

const NotificationReplyForm = ({ visitorData, selectedNotification }) => {
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messageEndRef = useRef(null);

  const currentUser = {
    id: visitorData.shop_id || visitorData.visitor_id || visitorData.member_id, // dynamically assign this based on logged-in user
    type: visitorData.user_type,
  };

  console.log(visitorData);
  
  // Auto scroll to latest message
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch previous chat messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const resp = await get_supportChatMessages(selectedNotification.support_id);
        if(resp.valid){
          setMessages(resp.data);
        }
      } catch (err) {
        setSnackbar({
          open: true,
          message: "Failed to load chat",
          severity: "error",
        });
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

  const handleSendMessage = async () => {
     // try{
    //   setLoading(true);
    //   const data = {
    //     visitor_id: msg.visitor_id,
    //     notification_id: msg.id,
    //     support_id: msg.support_id,
    //     sender_id: msg.visitor_id,
    //     sender_type: msg.user_type,
    //     receiver_id: msg.sent_to,
    //     receiver_type: 'shop',
    //     message: msg.message,
    //   };
    //   const resp = await post_supportChatMessage(data);
    //   if(resp.message==='Chat created successfully'){
    //     setSelectedNotification(msg);
    //   }      
    // }catch(e){
    //   console.log(e);
    // }finally{
    //   setLoading(false);
    // }
  //   if (!newMessage.trim()) return;

  //   const msgPayload = {
  //     support_id: selectedNotification.support_id,
  //     sender_id: currentUser.id,
  //     sender_type: currentUser.type,
  //     receiver_id: visitorData?.user_id,
  //     receiver_type: "visitor",
  //     message: newMessage.trim(),
  //   };

  //   try {
  //     await sendSupportMessage(msgPayload); // backend API call
  //     setMessages((prev) => [...prev, { ...msgPayload, sent_at: new Date() }]);
  //     setNewMessage("");
  //   } catch (err) {
  //     setSnackbar({
  //       open: true,
  //       message: "Failed to send message",
  //       severity: "error",
  //     });
  //   }
  };

  return (
    <Box className="chat_container">
      {loading && (
        <Box className="loading">
          <CircularProgress />
        </Box>
      )}

      <Box className="chat">
        {messages?.map((msg, index) => {
          const isMyMsg = msg.sender_id === currentUser.id && msg.sender_type === currentUser.type;
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
                <Typography variant="caption" color="textSecondary">
                  {msg.sender_type} - {new Date(msg.sent_at).toLocaleTimeString()}
                </Typography>
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
