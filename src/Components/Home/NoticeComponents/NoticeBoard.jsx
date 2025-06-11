import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function NoticeBoard({ data, title }) {
  const [filteredRecords, setFilteredRecords] = useState([]);

  console.log(data);
  
  // Function to filter records
  // const filterRecords = () => {
  //   const today = new Date().toLocaleDateString('en-CA'); // Get today's date as 'YYYY-MM-DD'

  //   // Filter items based on date range and remove duplicates by title
  //   const filtered = data
  //     ?.filter((item) => {
  //       const fromDate = new Date(item.from_date).toLocaleDateString('en-CA');
  //     const toDate = new Date(item.to_date).toLocaleDateString('en-CA'); // Convert to_date to Date object

  //       // Check if today's date lies between from_date and to_date
  //       return today >= fromDate && today <= toDate;
  //     })
  //     .reduce((uniqueRecords, currentItem) => {
  //       // Use a Map to store only unique titles
  //       if (!uniqueRecords.has(currentItem.title)) {
  //         uniqueRecords.set(currentItem.title, currentItem);
  //       }
  //       return uniqueRecords;
  //     }, new Map());

  //   // Convert the Map back to an array
  //   setFilteredRecords([...filtered.values()]);
  // };


 const filterRecords = () => {
  const today = new Date().toLocaleDateString('en-CA');
  const categoryList = [
    "city events",
    "district administration",
    "ambarsariya mall events",
    "thought of the day",
  ];

  const getBestRecord = (items = []) => {
    // Priority 1: Today
    const todayRecord = items.find((item) => {
      const fromDate = new Date(item.from_date).toLocaleDateString('en-CA');
      const toDate = new Date(item.to_date).toLocaleDateString('en-CA');
      return today >= fromDate && today <= toDate;
    });
    if (todayRecord) return todayRecord;

    // Priority 2: Upcoming
    const upcoming = items
      .filter((item) => new Date(item.from_date) > new Date())
      .sort((a, b) => new Date(a.from_date) - new Date(b.from_date));
    if (upcoming.length) return upcoming[0];

    // Priority 3: Most recent past
    const past = items
      .filter((item) => new Date(item.to_date) < new Date())
      .sort((a, b) => new Date(b.to_date) - new Date(a.to_date));
    if (past.length) return past[0];

    return null;
  };

  const finalRecords = categoryList.map((category) => {
    const categoryItems = data?.filter(
      (item) => item.title.toLowerCase() === category.toLowerCase()
    );
    return getBestRecord(categoryItems);
  }).filter(Boolean); // remove nulls

  setFilteredRecords(finalRecords);
};


  // Function to get a single record by title
  // const getRecordByTitle = () => {
  //   const today = new Date().toLocaleDateString('en-CA');

  //   // Find the first record with the matching title where today's date is valid
  //   const singleRecord = data?.find((item) => {
  //     const fromDate = new Date(item.from_date).toLocaleDateString('en-CA');
  //   const toDate = new Date(item.to_date).toLocaleDateString('en-CA');

  //     return (
  //       item.title.toLowerCase() === title.toLowerCase() &&
  //       today >= fromDate &&
  //       today <= toDate
  //     );
  //   });

  //   setFilteredRecords(singleRecord ? [singleRecord] : []); // Wrap single record in an array
  // };


  const getRecordByTitle = () => {
  const today = new Date().toLocaleDateString('en-CA');

  // 1. Try to find today's notice for title
  const todayRecord = data?.find((item) => {
    const fromDate = new Date(item.from_date).toLocaleDateString('en-CA');
    const toDate = new Date(item.to_date).toLocaleDateString('en-CA');
    return (
      item.title.toLowerCase() === title.toLowerCase() &&
      today >= fromDate &&
      today <= toDate
    );
  });

  if (todayRecord) {
    setFilteredRecords([todayRecord]);
    return;
  }

  // 2. Try to find upcoming notice for title
  const upcomingRecord = data
    ?.filter(
      (item) =>
        item.title.toLowerCase() === title.toLowerCase() &&
        new Date(item.from_date) > new Date()
    )
    .sort((a, b) => new Date(a.from_date) - new Date(b.from_date))[0];

  if (upcomingRecord) {
    setFilteredRecords([upcomingRecord]);
    return;
  }

  // 3. Try to find latest past notice for title
  const pastRecord = data
    ?.filter(
      (item) =>
        item.title.toLowerCase() === title.toLowerCase() &&
        new Date(item.to_date) < new Date()
    )
    .sort((a, b) => new Date(b.to_date) - new Date(a.to_date))[0];

  setFilteredRecords(pastRecord ? [pastRecord] : []);
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
                  {new Date(item.from_date).toLocaleDateString('en-CA')} - {new Date(item.to_date).toLocaleDateString("en-CA")}
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
