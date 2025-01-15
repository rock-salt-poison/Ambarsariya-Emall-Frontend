import React, { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

function NoticeBoard({data}) {
    
  const [uniqueRecords, setUniqueRecords] = useState([]);

  // Function to fetch unique records
  const fetch_unique_records = () => {
    const records = data?.reduce((acc, current_value) => {
      if (!acc.find((item) => item.title === current_value.title)) {
        acc.push(current_value);
      }
      return acc;
    }, []);
    setUniqueRecords(records); // Update state with unique records
  };

  // Use useEffect to calculate unique records when `data` changes
  useEffect(() => {
    if (data) {
      fetch_unique_records();
    }
  }, []);

  return (
    <Box className="cards">
       {data?.map((item) => {
        const params = ((item.title.toLowerCase()).split(' ')).join('-');
        return <Box className="card" key={item.id}>
            <Box className="hook"></Box>
            <Box className="frame">
                <Box className="top_border"><Box className="line"></Box></Box>
                <Link className="middle" to={`${item.title}/${item.id}`}>
                    <Typography className="title">{item.title}</Typography>
                    <Box className="desc" dangerouslySetInnerHTML={{
                      __html: `${item.message || ""}`,
                    }}></Box>
                    <Typography className="date">{(item.from_date).split('T')[0]} - {(item.to_date).split('T')[0]}</Typography>
                </Link>
                <Box className="bottom_border"><Box className="line"></Box></Box>
            </Box>
        </Box>
       })}
    </Box>
  )
}

export default NoticeBoard