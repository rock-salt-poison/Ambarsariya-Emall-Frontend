import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function NoticeBoard({ data }) {
  const [filteredRecords, setFilteredRecords] = useState([]);

  // Function to filter records where today's date is within from_date and to_date
  const filterRecords = () => {
    const today = new Date(); // Get today's date

    // Filter items based on the condition
    const filtered = data?.filter((item) => {
      const fromDate = new Date(item.from_date); // Convert from_date to Date object
      const toDate = new Date(item.to_date); // Convert to_date to Date object

      // Check if today's date lies between from_date and to_date
      return today >= fromDate && today <= toDate;
    });

    setFilteredRecords(filtered || []); // Update state with filtered records
  };

  // Use useEffect to calculate filtered records when `data` changes
  useEffect(() => {
    if (data) {
      filterRecords();
    }
  }, [data]);

  return (
    <Box className="cards">
      {filteredRecords?.map((item) => {
        const params = item.title.toLowerCase().split(" ").join("-");
        return (
          <Box className="card" key={item.id}>
            <Box className="hook"></Box>
            <Box className="frame">
              <Box className="top_border">
                <Box className="line"></Box>
              </Box>
              <Link className="middle" to={`${item.title}/${item.id}`}>
                <Typography className="title">{item.title}</Typography>
                <Typography
                  className="desc"
                  dangerouslySetInnerHTML={{
                    __html: `${item.message || ""}`,
                  }}
                ></Typography>
                <Typography className="date">
                  {item.from_date.split("T")[0]} - {item.to_date.split("T")[0]}
                </Typography>
              </Link>
              <Box className="bottom_border">
                <Box className="line"></Box>
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

export default NoticeBoard;
