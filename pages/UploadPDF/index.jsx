import { Clear, FileUploadOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import useUpload from "@/hooks/useUpload";
import HomeContent from "@/components/HomeContent";
import { useRouter } from "next/router";
const UploadPDF = () => {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("loginStatus")) {
      router.push("/Login");
      return;
    }
  }, []);

  const {
    fileInfo,
    isDisabled,
    isDragging,
    zoomOut,
    fileInputRef,
    handleBrowseClick,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleFileChange,
    handleRemoveFile,
    handleUploadClick,
    message,
  } = useUpload();

  return (
    <>
      <Box display="flex" justifyContent="center">
        <HomeContent />
      </Box>

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

          <form
            className={`drop-area ${isDragging ? "dragging" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            encType="multipart/form-data"
            onSubmit={handleUploadClick}
            method="POST"
          >
            <Typography>
              <FileUploadOutlined className="upload-icon" />
              Drag and Drop file here
            </Typography>
            {fileInfo.name ? (
              <Button
                type="submit"
                variant="outlined"
                className="browse-button"
                disabled={isDisabled ? true : false}
              >
                Upload
              </Button>
            ) : (
              <Button
                variant="outlined"
                className="browse-button"
                onClick={handleBrowseClick}
                disabled={isDisabled ? true : false}
              >
                Browse Files
              </Button>
            )}
          </form>

          <Paper
            className={`selected-file ${fileInfo.name ? "file-info" : ""}
                ${
                  message.isError && message.msg
                    ? "error-message"
                    : !message.isError && message.msg != ""
                    ? "submit-message"
                    : ""
                } ${zoomOut ? "zoomOut" : ""}`}
            elevation={3}
          >
            {message.msg ? (
              <Typography>{message.msg}</Typography>
            ) : (
              <Stack direction="row" spacing={1} alignItems="center" px={2}>
                <Typography>{fileInfo.name}</Typography>
                <Typography variant="caption">{fileInfo.size}</Typography>
              </Stack>
            )}
            <IconButton onClick={handleRemoveFile}>
              <Clear className="remove-button" />
            </IconButton>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default UploadPDF;
