import React, { useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import UserBadge from "../../UserBadge";
import { Link, useNavigate } from "react-router-dom";
import big_cloud from "../../Utils/images/Socialize/city_junctions/co_helpers/big_cloud.svg";
import small_cloud from "../../Utils/images/Socialize/city_junctions/co_helpers/small_cloud.svg";
import hornSound from "../../Utils/audio/horn-sound.mp3";
import CoHelperPopup from "../../Components/Socialize/CoHelperPopup";
import { useDispatch, useSelector } from "react-redux";
import { post_coHelper } from "../../API/fetchExpressAPI";
import CustomSnackbar from "../../Components/CustomSnackbar";
import { clearCoHelper } from "../../store/CoHelperSlice";
import cards from '../../API/coHelpersData'

function CoHelpers() {
  const navigate = useNavigate();
  const [audio] = useState(new Audio(hornSound));
  const coHelpers = useSelector((state) => state.co_helper.coHelpers);
  const [openPopupId, setOpenPopupId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });  
  const dispatch = useDispatch();  

  

  const handleClick = async (e, id) => {
    const target = e.target.closest(".card");
    const btn = e.target.closest(".btn");
    const heading_container = e.target.closest(".heading_container");

    if (target) {
      target.classList.toggle("reduceSize3");
      audio.play();

      setTimeout(() => {
        target.classList.toggle("reduceSize3");
      }, 300);

      setTimeout(() => {
        setOpenPopupId(id);
        // if(target.classList.contains('co_helpers')){
        //     navigate('../city-junctions/co-helpers')
        // }else if(target.classList.contains('work_from_home')){
        //     navigate('../../serve/emotional/eshop/jobs-offered')
        // }
      }, 600);
    } else if (btn) {
      btn.classList.toggle("reduceSize3");
      audio.play();

      setTimeout(() => {
        btn.classList.toggle("reduceSize3");
      }, 300);

      console.log(coHelpers);
      if(coHelpers?.length>0){
        handleApplyNow(coHelpers);
      }

      setTimeout(() => {
        // if(target.classList.contains('co_helpers')){
        //     navigate('../city-junctions/co-helpers')
        // }
      }, 600);
    } else if (heading_container) {
      heading_container.classList.toggle("reduceSize3");
      audio.play();

      setTimeout(() => {
        heading_container.classList.toggle("reduceSize3");
      }, 300);
      setTimeout(() => {
        // if(target.classList.contains('co_helpers')){
        //     navigate('../city-junctions/co-helpers')
        // }
      }, 600);
    }
  };

  const handleApplyNow = async (data) => {
    if(data){
      try{
        setLoading(true);
        const resp = await post_coHelper(data);
        console.log(resp);
        setSnackbar({
          open: true,
          message: resp.message,
          severity: 'success',
        });
        dispatch(clearCoHelper());
      }catch(e){
        console.log(e);
        setSnackbar({
          open: true,
          message: e,
          severity: 'info',
        });
      }finally{
        setLoading(false);
      }
      console.log(data);
      
    }
  }


  const handleClose = () => {
    setOpenPopupId(false);
  };

  return (
    <>
    <Box className="co_helpers_wrapper">
      {loading && <Box className="loading"><CircularProgress/></Box> }
      <Box>
        <Box
          component="img"
          src={big_cloud}
          className="big_cloud"
          alt="cloud"
        />
      </Box>
      <Box
        component="img"
        src={big_cloud}
        className="big_cloud cloud_2"
        alt="cloud"
      />
      <Box className="row">
        <Box className="col back-button-wrapper">
          <UserBadge
            handleLogoutClick="../../"
            handleBadgeBgClick={-1}
            handleLogin="login"
          />
        </Box>
        <Box className="col">
          <Box className="container">
            <Link className="heading_container" onClick={(e) => handleClick(e)}>
              <Typography className="heading" variant="h2">
                Co-Helpers
              </Typography>
            </Link>

            <Box className="sub_container">
              <Box className="col-group">
                <Box
                  component="img"
                  src={small_cloud}
                  alt="small_cloud"
                  className="small_cloud"
                />
                {cards?.slice(0, 3)?.map((card) => {
                  return (
                    <React.Fragment key={card?.id}>
                      <Link
                        className="card"
                        onClick={(e) => handleClick(e, card?.id)}
                      >
                        <Box
                          component="img"
                          src={card?.imgSrc}
                          alt={card?.alt}
                          className="card_img"
                        />
                        <Box className="title_container">
                          <Typography className="title">
                            {card?.title}
                          </Typography>
                        </Box>
                      </Link>

                      <CoHelperPopup
                        open={openPopupId === card?.id}
                        handleClose={handleClose}
                        content={card}
                      />
                    </React.Fragment>
                  );
                })}
              </Box>

              <Box className="col-group-2">
                {cards?.slice(3, 9)?.map((card) => {
                  return (
                    <React.Fragment key={card?.id}>
                      <Link
                        className="card"
                        key={card?.id}
                        onClick={(e) => handleClick(e, card?.id)}
                      >
                        <Box
                          component="img"
                          src={card?.imgSrc}
                          alt={card?.alt}
                          className="card_img"
                        />
                        <Box className="title_container">
                          <Typography className="title">
                            {card?.title}
                          </Typography>
                        </Box>
                      </Link>

                      <CoHelperPopup
                        open={openPopupId === card?.id}
                        handleClose={handleClose}
                        content={card}
                      />
                    </React.Fragment>
                  );
                })}
              </Box>

              <Box className="col-group">
                <Box
                  component="img"
                  src={small_cloud}
                  alt="small_cloud"
                  className="small_cloud cloud_2"
                />

                {cards?.slice(9)?.map((card) => {
                  return (
                    <React.Fragment key={card?.id}>
                      <Link
                        className="card"
                        key={card?.id}
                        onClick={(e) => handleClick(e, card?.id)}
                      >
                        <Box
                          component="img"
                          src={card?.imgSrc}
                          alt={card?.alt}
                          className="card_img"
                        />
                        <Box className="title_container">
                          <Typography className="title">
                            {card?.title}
                          </Typography>
                        </Box>
                      </Link>

                      <CoHelperPopup
                        open={openPopupId === card?.id}
                        handleClose={handleClose}
                        content={card}
                      />
                    </React.Fragment>
                  );
                })}
              </Box>
            </Box>
          </Box>
          <Box className="button_container">
            <Button className="btn" onClick={(e) => handleClick(e)}>
              Apply Now
            </Button>
          </Box>
        </Box>
      </Box>
      
    </Box>
    <CustomSnackbar
        open={snackbar.open}
        handleClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        severity={snackbar.severity}
        disableAutoHide={true}
      />
      </>
  );
}

export default CoHelpers;
