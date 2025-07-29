import React, { useState, useEffect } from "react";
import { Box, Dialog, DialogContent, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import TrainTable from "../../../Components/Home/TimeTablePopupComponents/TrainTable";
import trainbg from "../../../Utils/images/trainbg.webp";
import { get_travel_time } from "../../../API/fetchExpressAPI";
import CloseIcon from '@mui/icons-material/Close';


function TrainDetailsPopup({ open, handleClose, id }) {
  const [heading, setHeading] = useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  // const { id } = useParams();

  const [data, setData] = useState([]);

  useEffect(() => {
    const travelType = id === "arrival" ? "Arrival" : "Departure";
    setHeading(travelType);
    if (id) {
      fetchData({ mode: "Train", travel_type: travelType });
    }
  }, [id]);

  const fetchData = async (data) => {
    try {
      const response = await get_travel_time(data);
      setData(response?.data || []);
    } catch (error) {
      console.error("Error fetching travel data:", error);
      setData([]);
    }
  };

  const convertTo12HourFormat = (time) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours, 10);
    const period = hour >= 12 ? "PM" : "AM";
    const adjustedHour = hour % 12 || 12; // Convert 0 to 12 for 12-hour format
    return `${adjustedHour}:${minutes} ${period}`;
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className="trainDetailsPopup"
      BackdropProps={{
        sx: {
          backgroundColor: "transparent !important",
        },
      }}
      maxWidth="md"
      fullScreen={fullScreen}
      fullWidth
    >
      <DialogContent className="trainPopupDialogContent">
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          className="closeBtn"
        >
          <CloseIcon />
        </IconButton>
        <Box className="train container">
          <Box className="wrapper">
            <Box component="img" src={trainbg} alt="shadow" className="bgImg" />
          </Box>
          <Box className="row">
            <Box className="col-1">
              <Typography>{heading}</Typography>
              <Typography>
                Date: {data[0]?.date ? data[0].date.split("T")[0] : ""}
              </Typography>
              <Typography>
                {data[0]?.time_from && data[0]?.time_to
                  ? `Time : ${convertTo12HourFormat(
                      data[0].time_from
                    )} - ${convertTo12HourFormat(data[0].time_to)}`
                  : "Time not available"}
              </Typography>
            </Box>

            <Box className="col-2">
              <Box className="table_container">
                <TrainTable id={heading} data={data} />
              </Box>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default TrainDetailsPopup;
