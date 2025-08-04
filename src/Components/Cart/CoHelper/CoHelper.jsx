import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import btn_bg from "../../../Utils/images/Sell/cart/co_helper/btn_bg.png";
import icon from "../../../Utils/images/Sell/cart/co_helper/icon.webp";
import { Link } from "react-router-dom";
import CoHelperTypePopup from "./CoHelperTypePopup";
import cards from '../../../API/coHelpersData';

function CoHelper() {
 
  const [openPopupId, setOpenPopupId] = useState(null);
  const handleClose = () => {
    setOpenPopupId(false);
  };

  const handleClick = (e, id) => {
    const target = e.target.closest(".list");
    if (target) {
      target.classList.add("reduceSize3");
     
      setTimeout(() => {
        target.classList.remove("reduceSize3");
      }, 300);
      setOpenPopupId(id);
    }
  };
  return (
    <>
      <Box className="title_container">
        <Typography className="title">Co-Helper</Typography>
      </Box>
      <Box className="body_container">
        {cards.map((list) => {
          return (
        <React.Fragment key={list?.id}>
            <Link
              className="list"
              onClick={(e) => handleClick(e, list?.id)}
            >
              <Box component="img" src={btn_bg} className="list_bg" alt="bg" />
              <Typography className="list_title">{list.title}</Typography>
            </Link>
            <CoHelperTypePopup
                open={openPopupId === list?.id}
                handleClose={handleClose}
                content={list}
            />
        </React.Fragment>
          );
        })}
      </Box>
    </>
  );
}

export default CoHelper;
