import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";

function ConfirmationDialog({ open, onClose, onConfirm, title, message, optionalCname, confirmBtnText = 'Confirm', closeBtnText = 'Close' }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm")); // Fullscreen on small screens

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirm-dialog"
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm" 
      className={optionalCname}
    >
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="confirm-message">{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} className="cancel-btn">
          {closeBtnText}
        </Button>
        <Button onClick={onConfirm} autoFocus className="confirm-btn">
          {confirmBtnText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationDialog;
