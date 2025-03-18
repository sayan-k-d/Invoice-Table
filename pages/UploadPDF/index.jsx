import { Clear, FileUploadOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useUpload from "@/hooks/useUpload";
import HomeContent from "@/components/HomeContent";
import { useRouter } from "next/router";
import InvoicePreview from "@/components/InvoicePreview";
import { Hourglass } from "react-loader-spinner";
import InvoiceData from "@/components/InvoiceData";
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
    selectedFile,
    numPages,
    pageNumber,
    onDocumentLoadSuccess,
    setPageNumber,
    jsonData,
    isPaper,
    setIsPaper,
  } = useUpload();

  return (
    <Box display="flex" minHeight="100vh">
      <HomeContent />

      <Box className="drag-and-drop-container container">
        <input
          type="file"
          ref={fileInputRef}
          className="file-input"
          onChange={handleFileChange}
        />
        <Box className={`file-upload-area ${!isPaper ? "mb-3" : "mb-0"}`}>
          {/* <Typography variant="subtitle2" className="upload-label">
            Upload a Document...
          </Typography> */}

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
              Please upload your Invoice by dragging and dropping the file here.
            </Typography>
            {fileInfo.name ? (
              <Button
                type="submit"
                variant="outlined"
                className="browse-button"
                disabled={isDisabled ? true : false}
              >
                {isDisabled ? (
                  <Hourglass
                    visible={true}
                    height="25"
                    width="25"
                    ariaLabel="hourglass-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    colors={["#306cce", "#72a1ed"]}
                  />
                ) : (
                  "Upload"
                )}
              </Button>
            ) : (
              <Button
                variant="outlined"
                className="browse-button"
                onClick={handleBrowseClick}
                disabled={isDisabled ? true : false}
              >
                {isDisabled ? (
                  <Hourglass
                    visible={true}
                    height="25"
                    width="25"
                    ariaLabel="hourglass-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    colors={["#306cce", "#72a1ed"]}
                  />
                ) : (
                  "Browse Files"
                )}
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
            <IconButton onClick={handleRemoveFile} disabled={isDisabled}>
              <Clear className="remove-button" />
            </IconButton>
          </Paper>
        </Box>
        <div className="content-section">
          <div className="row g-4">
            <InvoicePreview
              selectedFile={selectedFile}
              numPages={numPages}
              pageNumber={pageNumber}
              onDocumentLoadSuccess={onDocumentLoadSuccess}
              setPageNumber={setPageNumber}
              isPaper={isPaper}
            />

            <InvoiceData jsonData={jsonData} isPaper={isPaper} />
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default UploadPDF;
