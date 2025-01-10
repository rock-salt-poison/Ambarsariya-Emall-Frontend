import React, { useState, useEffect } from "react";
import { Box, Dialog, DialogContent, Typography } from "@mui/material";
import flightImg from "../../../Utils/images/flightPass1.png";
import FlightTable from "../TimeTablePopupComponents/FlightTable";
import { get_travel_time } from "../../../API/fetchExpressAPI";

function FlightDetailsPopup({ open, handleClose, id }) {
  const [heading, setHeading] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const travelType = id === "arrival" ? "Arrival" : "Departure";
    setHeading(travelType);
    if (id) {
      fetchData({ mode: "Airline", travel_type: travelType });
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
      className="flightDetailsPopup"
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Slight opacity for better focus
        },
      }}
    >
      <DialogContent className="flightPopupDialogContent">
        <Box className="flight container">
          <Box className="wrapper"></Box>
          <Box className="row">
            {/* Left Column */}
            <Box className="col-1">
              <Typography variant="h2">{heading}</Typography>
              <FlightTable id={heading} data={data} />
            </Box>

            {/* Right Column */}
            <Box className="col-2">
              <Box
                component="img"
                src={flightImg}
                alt="Flight background"
                className="img1"
              />
              <Box className="content">
                <Typography>
                  Date: {data[0]?.date ? data[0].date.split("T")[0] : "N/A"}
                </Typography>
                <Typography>
                {data[0]?.time_from && data[0]?.time_to
                  ? `Time : ${convertTo12HourFormat(
                      data[0].time_from
                    )} - ${convertTo12HourFormat(data[0].time_to)}`
                  : "Time not available"}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default FlightDetailsPopup;
