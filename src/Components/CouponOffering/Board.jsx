import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Board({ text, imgSrc, redirectTo }) {
  return (
    <Box className="container">
      {redirectTo ? (
        <Link to={redirectTo}>
          <Box component="img" src={imgSrc} className="board_img" alt="board" />
          <Box className="title_container">
            <Typography>{text}</Typography>
          </Box>
        </Link>
      ) : (
        <>
          <Box component="img" src={imgSrc} className="board_img" alt="board" />
          <Box className="title_container">
            <Typography>{text}</Typography>
          </Box>
        </>
      )}
    </Box>
  );
}

export default Board;
