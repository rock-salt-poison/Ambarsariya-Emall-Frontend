import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { get_notice } from "../../../API/fetchExpressAPI";
import { useParams } from "react-router-dom";

function NoticeDetail(props) {
  const [notice, setNotice] = useState(null); // Initialize notice as null
  const { title, id } = useParams(); // Get title and id from URL params

  const [loading, setLoading] = useState(false);
  
  console.log(title);
  // Function to fetch unique records
  const fetch_unique_records = async () => {
    try {
      setLoading(true);
      // Await the asynchronous function call
      const resp = await get_notice(props.title, id);
      if (resp && resp.data.length > 0) {
        console.log(resp.data);
        setNotice(resp.data[0]); // Set the first record if response is valid
        setLoading(false);
      } else {
        setNotice(null); // Handle case where no records are found
        setLoading(false);
      }
    } catch (e) {
      console.error("Error fetching notice:", e);
      setNotice(null); // Handle errors gracefully
    }
  };

  // Fetch notice details when `title` changes
  useEffect(() => {
    if (title) {
      fetch_unique_records();
    }
  }, []);

  console.log(notice);

  return (
    <Box className="board">
      {loading && (
        <Box className="loading">
          <CircularProgress />
        </Box>
      )}
      <Box className="board_pins">
        <Box className="circle"></Box>
        <Box className="circle"></Box>
      </Box>
      <Box className="container">
        <Box className="details">
          {notice?.notice_to && <Box className="col-auto">
            <Typography className="heading">To</Typography>
            <Typography className="desc">{notice?.notice_to}</Typography>
          </Box>}

          {notice?.location && <Box className="col-auto">
            <Typography className="heading">Location</Typography>
            <Typography className="desc">{notice?.location}</Typography>
          </Box>}

          {notice?.time && <Box className="col-auto">
            <Typography className="heading">Time</Typography>
            <Typography className="desc">{notice?.time}</Typography>
          </Box>}
          
          <Box className="col-auto">
            <Typography className="heading">Date</Typography>
            <Typography className="desc">
              {notice?.from_date?.split("T")[0]} -{" "}
              {notice?.to_date?.split("T")[0]}
            </Typography>
          </Box>
        </Box>
        {notice?.image_src && <Box className="img" component="img" src={notice?.image_src} />}
        <Box className="notice">
          <Box className="col-auto">
            <Typography className="heading">Message</Typography>
            <Box
              className="desc"
              dangerouslySetInnerHTML={{
                __html: `${notice?.message || ""}`,
              }}
            ></Box>
          </Box>
        </Box>
      </Box>
      <Box className="board_pins">
        <Box className="circle"></Box>
        <Box className="circle"></Box>
      </Box>
    </Box>
  );
}

export default NoticeDetail;
