import React, { useState, useEffect } from "react";
import { Box, Dialog, DialogContent, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import BusTable from "../TimeTablePopupComponents/BusTable";
import busArrival from "../../../Utils/images/busArrival.png";
import busDeparture from "../../../Utils/images/bus-departure.png";
import { get_travel_time } from "../../../API/fetchExpressAPI";
import CloseIcon from '@mui/icons-material/Close';


function BusDetailsPopup({ open, handleClose, id }) {
  const [heading, setHeading] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [data, setData] = useState([]);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (id == "arrival") {
      setHeading("Arrival");
      setImgSrc(busArrival);
      fetchData({ mode: "Bus", travel_type: "Arrival" });
    } else if ((id = "departure")) {
      setHeading("Departure");
      setImgSrc(busDeparture);
      fetchData({ mode: "Bus", travel_type: "Departure" });
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
      className="busDetailsPopup"
      BackdropProps={{
        sx: {
          backgroundColor: "transparent !important",
        },
      }}
      maxWidth="md"
      fullScreen={fullScreen}
      fullWidth
    >
      <DialogContent className="busPopupDialogContent">
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          className="closeBtn"
        >
          <CloseIcon />
        </IconButton>
        <Box className="bus container">
          <Box className="wrapper"></Box>
          <Box className="row">
            <Box className="col">
              <Box className="row-1">
                <Box
                  component="img"
                  src={imgSrc}
                  alt="bus"
                  className="busArrivalImg"
                />
              </Box>

              <Box className="row-2">
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
                  <Typography>PRTC TIME TABLE</Typography>
                </Box>
              </Box>

              <Box className="row-3">
                <Typography variant="h2">{heading}</Typography>
                <Typography>Time</Typography>
              </Box>
            </Box>

            <Box className="col-2">
              <BusTable id={heading} data={data} />
            </Box>
            <Box></Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default BusDetailsPopup;
