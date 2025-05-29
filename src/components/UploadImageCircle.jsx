import React from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
const UploadCircle = styled("label")(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  overflow: "hidden",
  position: "relative",
  color: "#999",
  fontSize: 48,
  backgroundColor: "#f0f0f0",
  transition: "border-color 0.3s",
  "&:hover": {
    borderColor: "#0d9488",
    color: "#0d9488",
  },
  "& input": {
    display: "none",
  },
}));

const UploadImageCircle = ({ imagePreview, onImageChange, id = "image-upload" }) => {
  return (
    <UploadCircle htmlFor={id}>
      {imagePreview ? (
        <Box
          component="img"
          src={imagePreview}
          alt="Preview"
          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <span><CameraAltIcon /></span>
      )}
 
      <input
        type="file"
        id={id}
        accept="image/*"
        onChange={onImageChange}
      />
    </UploadCircle>
  );
};

export default UploadImageCircle;
