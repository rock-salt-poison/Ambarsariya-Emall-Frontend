import React from "react";
import { Box, Typography } from "@mui/material";
import Header from "../../Components/Serve/SupplyChain/Header";
import time_and_date from "../../Utils/gifs/time_and_date.gif";
import location_gif from "../../Utils/gifs/location.gif";

function DailyDelivery() {
    return (
        <Box className="daily_delivery_wrapper">
            <Header
                back_btn_link={-1}
                next_btn_link={""}
                heading_with_bg={true}
                title={"Daily Delivery"}
                redirectTo={""}
                next_btn={true}
            />

            <Box className="body">
                <Box className="gif_row">
                    <Box className="gif_container">
                        <Box
                            component="img"
                            src={time_and_date}
                            alt="time and date"
                            className="gif time_and_date"
                        />
                        <Typography className="text">
                            Time and date
                        </Typography>
                    </Box>
                    <Box className="gif_container">
                        <Box
                            component="img"
                            src={location_gif}
                            alt="location"
                            className="gif location"
                        />
                        <Typography className="text">
                            Location
                        </Typography>

                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default DailyDelivery;

