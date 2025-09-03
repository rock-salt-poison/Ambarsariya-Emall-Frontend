import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import imageCompression from "browser-image-compression";

const ImageCropperDialog = ({ open, srcImg, aspect = 1, onClose, onSave }) => {
  const imgRef = useRef(null);
  const [crop, setCrop] = useState({ unit: "%", width: 50, aspect });
  const [completedCrop, setCompletedCrop] = useState(null);

  const getCroppedImg = (image, crop) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }
        const file = new File([blob], "cropped.jpg", { type: "image/jpeg" });
        resolve(file);
      }, "image/jpeg");
    });
  };

  const handleSave = async () => {
    if (!completedCrop || !imgRef.current) return;

    try {
      const croppedFile = await getCroppedImg(imgRef.current, completedCrop);

      // compress to ≤1MB
      const compressedFile = await imageCompression(croppedFile, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      });

      onSave(compressedFile);
    } catch (err) {
      console.error("Crop/Compression failed", err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth className="custom crop_image">
      <DialogTitle className="heading">Crop your image</DialogTitle>
      <DialogContent>
        {srcImg && (
          <ReactCrop
            crop={crop}
            onChange={(newCrop) => setCrop(newCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspect}
          >
            <img ref={imgRef} src={srcImg} alt="Crop preview" style={{ maxWidth: "100%" }} />
          </ReactCrop>
        )}
      </DialogContent>
      <DialogActions>
        <Box className="submit_button_container">
            <Button onClick={onClose} className="submit_button">Cancel</Button>
            <Button onClick={handleSave} variant="contained" className="submit_button">
            Save
            </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default ImageCropperDialog;