import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Typography } from "@mui/material";

export default function CustomSnackbar({
  message,
  severity,
  open,
  handleClose,
}) {
  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity={severity} variant="filled">
          <Typography className="snackbar">{message}</Typography>
        </Alert>
      </Snackbar>
    </div>
  );
}
