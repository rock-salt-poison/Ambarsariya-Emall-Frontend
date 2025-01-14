import { Box, Typography } from "@mui/material";
import React from "react";

function NoticeDetail({data, title}) {

    const notice = data.filter((notice) => notice.title === title);

  return (
    <Box className="board">
      <Box className="board_pins">
        <Box className="circle"></Box>
        <Box className="circle"></Box>
      </Box>
      <Box className="container">
            <Box className="details">
                <Box className="col-auto">
                    <Typography className="heading">To</Typography>
                    <Typography className="desc">Citizens of Amritsar</Typography>
                </Box>
                <Box className="col-auto">
                    <Typography className="heading">Date</Typography>
                    <Typography className="desc">{notice[0].date}</Typography>
                </Box>
            </Box>
            {notice[0].imgSrc && <Box className="img" component="img" src=""/>}
            <Box className="notice">
                <Box className="col-auto">
                    <Typography className="heading">Message</Typography>
                    <Typography className="desc">{notice[0].desc}</Typography>
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
