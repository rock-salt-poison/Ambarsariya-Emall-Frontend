import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Header from "../../Components/Serve/SupplyChain/Header";
import { Link } from "react-router-dom";
import hornSound from "../../Utils/audio/horn-sound.mp3";
import CardBoardPopup from "../../Components/CardBoardPopupComponents/CardBoardPopup";
import JobsOffered_PopupContent from "../../Components/Serve/JobsOffered/JobsOffered_PopupContent";
// import frame from "../../Utils/images/Serve/emotional/eshop/jobs_offered/frame.webp";

function Jobs_offered() {
  const [audio] = useState(new Audio(hornSound));
  const [openPopupId, setOpenPopupId] = useState(null);

  const handleClose = () => {
    setTimeout(() => {
      setOpenPopupId(null);
    }, 200);
  };

  const job_types = [
    { id: 1, type: "Freelance Writing or Editing", popup_body_content: <JobsOffered_PopupContent/> },
    { id: 2, type: "Virtual Assistance", popup_body_content: <JobsOffered_PopupContent/> },
    { id: 3, type: "Graphic Design", popup_body_content: <JobsOffered_PopupContent /> },
    { id: 4, type: "Social Media Management", popup_body_content: <JobsOffered_PopupContent /> },
    { id: 5, type: "Online Tutoring or Teaching", popup_body_content: <JobsOffered_PopupContent /> },
    { id: 6, type: "E-commerce Management", popup_body_content: <JobsOffered_PopupContent /> },
    { id: 7, type: "Web Development or Programming", popup_body_content: <JobsOffered_PopupContent /> },
    { id: 8, type: "Data Entry or Analysis", popup_body_content: <JobsOffered_PopupContent /> },
    { id: 9, type: "Digital Marketing", popup_body_content: <JobsOffered_PopupContent /> },
    { id: 10, type: "Customer Support", popup_body_content: <JobsOffered_PopupContent /> },
  ];

  const handleClick = (e, id) => {
    e.preventDefault();
    const container = e.target.closest(".container");
    container.classList.add("reduceSize3");
    setTimeout(() => {
      container.classList.remove("reduceSize3");
    }, 300);
    setTimeout(() => {
      setOpenPopupId((prevId) => (prevId === id ? null : id));
    }, 600);
    audio.play();
  };

  return (
    <Box className="jobs_offered_wrapper">
      <Box className="row">
        <Header
          back_btn_link={-1}
          next_btn_link=""
          title_container={true}
          title="Jobs offered by Ambarsariya Mall"
          redirectTo="../emotional"
        />

        <Box className="col col-9">
          <Box className="col-5">
            {job_types.map((job) => {
              return (
                <React.Fragment key={job.id}>
                  <Link
                    className="container"
                    onClick={(e) => handleClick(e, job.id)}
                  >
                    {/* <Box component="img" src={frame} alt="frame" className='frame'/> */}
                    <Box className="top_bar">
                      <Box className="circle"></Box>
                    </Box>
                    <Box className="content">
                      <Typography className="job_type">{job.type}</Typography>
                    </Box>
                  </Link>
                  <CardBoardPopup
                    open={openPopupId === job.id}
                    handleClose={handleClose}
                    title={job.type}
                    body_content={job.popup_body_content}
                  />
                </React.Fragment>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Jobs_offered;
