import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function NoticeBoard({ data, title }) {
  const [filteredRecords, setFilteredRecords] = useState([]);

  // Function to filter records
  const filterRecords = () => {
    const today = new Date(); // Get today's date

    // Filter items based on date range and remove duplicates by title
    const filtered = data
      ?.filter((item) => {
        const fromDate = new Date(item.from_date); // Convert from_date to Date object
        const toDate = new Date(item.to_date); // Convert to_date to Date object

        // Check if today's date lies between from_date and to_date
        return today >= fromDate && today <= toDate;
      })
      .reduce((uniqueRecords, currentItem) => {
        // Use a Map to store only unique titles
        if (!uniqueRecords.has(currentItem.title)) {
          uniqueRecords.set(currentItem.title, currentItem);
        }
        return uniqueRecords;
      }, new Map());

    // Convert the Map back to an array
    setFilteredRecords([...filtered.values()]);
  };

  // Function to get a single record by title
  const getRecordByTitle = () => {
    const today = new Date(); // Get today's date

    // Find the first record with the matching title where today's date is valid
    const singleRecord = data?.find((item) => {
      const fromDate = new Date(item.from_date);
      const toDate = new Date(item.to_date);

      return (
        item.title.toLowerCase() === title.toLowerCase() &&
        today >= fromDate &&
        today <= toDate
      );
    });

    setFilteredRecords(singleRecord ? [singleRecord] : []); // Wrap single record in an array
  };

  // Use useEffect to calculate records based on the presence of the title prop
  useEffect(() => {
    if (data) {
      if (title) {
        getRecordByTitle();
      } else {
        filterRecords();
      }
    }
  }, [data, title]);

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
