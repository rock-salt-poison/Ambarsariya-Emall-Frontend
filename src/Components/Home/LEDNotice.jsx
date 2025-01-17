import React, { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import ledBoard from "../../Utils/images/led-board.webp";
import Marquee from "./MarqueeComponent";
import { get_led_board_message } from "../../API/fetchExpressAPI"; // Import API call

function LEDNotice() {
  const [notice, setNotice] = useState([]); // Initially empty
  const [loading, setLoading] = useState(true); // Loading state for fetching data

  // Fetch notices from the API
  const fetchNotices = async () => {
    try {
      const response = await get_led_board_message(); // Fetch messages from backend
      console.log(response);
      if (response && response.length > 0) {
        const messages = response.map((item) => item.message); // Extract messages
        setNotice(messages);
      } else {
        setNotice(["No notices available."]); // Fallback message
      }
    } catch (error) {
      console.error("Error fetching LED notices:", error);
      setNotice(["Failed to load notices."]); // Error fallback
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  useEffect(() => {
    fetchNotices(); // Fetch data on component mount
  }, []);

  return (
    <Box className="ledNoticeParent">
        {loading && <Box className="loading"><CircularProgress/></Box>}
      <Box
        component="img"
        src={ledBoard}
        alt="LED-board"
        className="ledBoardImg"
      />
      <Box className="content">
          <Marquee text={notice} speed={60} />
      </Box>
    </Box>
  );
}

export default LEDNotice;
