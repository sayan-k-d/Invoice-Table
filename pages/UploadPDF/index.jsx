import { Clear, FileUploadOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";

const UploadPDF = () => {
  const [fileInfo, setFileInfo] = useState({ name: "", size: "" });
  const [zoomOut, setZoomOut] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const sizeInKB = (file.size / 1024).toFixed(2);
      setFileInfo({ name: file.name, size: `${sizeInKB} KB` });
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      const sizeInKB = (file.size / 1024).toFixed(2);
      setFileInfo({ name: file.name, size: `${sizeInKB} KB` });
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };
  const handleRemoveFile = () => {
    setZoomOut(true);
    setTimeout(() => {
      setZoomOut(false);
      setFileInfo({ name: "", size: "" }); // Clear the file name
    }, 1000);
  };
  const handleUploadClick = () => {
    // Perform upload logic here
    alert(`File uploaded successfully: ${fileInfo.name}`);
    // Reset file info and clear the input field
    setZoomOut(true);
    setTimeout(() => {
      setZoomOut(false);
      setFileInfo({ name: "", size: "" }); // Clear the file name
    }, 1000);
    fileInputRef.current.value = null;
  };

  return (
    <>
      <Box className="drag-and-drop-container container">
        <input
          type="file"
          ref={fileInputRef}
          className="file-input"
          onChange={handleFileChange}
        />
        <Box className="file-upload-area">
          <Typography variant="subtitle2" className="upload-label">
            Upload a Document...
          </Typography>

          <Box
            className={`drop-area ${isDragging ? "dragging" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Typography>
              <FileUploadOutlined className="upload-icon" />
              Drag and Drop file here
            </Typography>

            <Button
              variant="outlined"
              className="browse-button"
              onClick={fileInfo.name ? handleUploadClick : handleBrowseClick}
            >
              {fileInfo.name ? "Upload" : "Browse Files"}
            </Button>
          </Box>
          {fileInfo.name && (
            <Paper
              className={`selected-file ${zoomOut ? "zoomOut" : ""}`}
              elevation={3}
            >
              <Stack direction="row" spacing={1} alignItems="center" px={2}>
                <Typography>{fileInfo.name}</Typography>
                <Typography variant="caption">{fileInfo.size}</Typography>
              </Stack>
              <IconButton onClick={handleRemoveFile}>
                <Clear className="remove-button" />
              </IconButton>
            </Paper>
          )}
        </Box>
      </Box>
    </>
  );
};

export default UploadPDF;
