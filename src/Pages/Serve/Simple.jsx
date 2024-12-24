import { Box } from "@mui/material";
import React from "react";
import VideoPlayer from "../../Components/MerchantWrapper/VideoPlayer";
import coming_soon_video from "../../Utils/videos/simple.mp4";

function Simple() {
  return (
    <Box className="simple_wrapper">
      <VideoPlayer
        url={coming_soon_video}
        autoplay={true}
        controls={false}
        muted={true}
      />
    </Box>
  );
}

export default Simple;