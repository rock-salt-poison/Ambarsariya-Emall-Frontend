import React, { useEffect, useState } from "react";
import "../styles/orientation_warning.scss";
import rotate_phone from "../Utils/gifs/rotate_phone.gif";
import { Box } from "@mui/material";

const OrientationWarning = () => {
  const [showWarning, setShowWarning] = useState(false);

  const isMobile = () => /Mobi|Android|iPhone/i.test(navigator.userAgent);

  const checkOrientation = () => {
    const inPortrait = window.innerHeight > window.innerWidth;
    setShowWarning(isMobile() && inPortrait);
  };

  useEffect(() => {
    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    return () => window.removeEventListener("resize", checkOrientation);
  }, []);

  if (!showWarning) return null;

  return (
    <div id="orientation-warning">
      <Box component="img" alt="rotate_phone" src={rotate_phone} className="rotate_phone"/>
    </div>
  );
};

export default OrientationWarning;
