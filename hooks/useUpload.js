import axios from "axios";
import React, { useRef, useState } from "react";

const useUpload = () => {
  const [fileInfo, setFileInfo] = useState({ name: "", size: "" });
  const [zoomOut, setZoomOut] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [message, setMessage] = useState({ msg: "", isError: false });
  const fileInputRef = useRef(null);

  const resetStates = () => {
    setTimeout(() => {
      setZoomOut(false);
      setFileInfo({ name: "", size: "" }); // Clear the file name
      setIsDisabled(false);
      fileInputRef.current.value = null;
    }, 300);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const sizeInKB = (file.size / 1024).toFixed(2);
      setFileInfo({ name: file.name, size: `${sizeInKB} KB` });
      setMessage({ msg: "", isError: false });
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
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileInputRef.current.files = dataTransfer.files;
      const sizeInKB = (file.size / 1024).toFixed(2);
      setFileInfo({ name: file.name, size: `${sizeInKB} KB` });
      setMessage({ msg: "", isError: false });
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };
  const handleRemoveFile = () => {
    setZoomOut(true);
    setIsDisabled(true);
    setMessage({ msg: "", isError: false });
    resetStates();
  };
  const handleUploadClick = (event) => {
    event.preventDefault();
    // Perform upload logic here
    const formData = new FormData();
    formData.append("file", fileInputRef.current.files[0]);

    if (fileInfo.name) {
      axios
        .post("http://localhost:5000/upload", formData)
        .then((response) => {
          setZoomOut(true);
          setIsDisabled(true);
          setMessage({
            msg: `${fileInfo.name} Uploaded Successfully!`,
            isError: false,
          });
          resetStates();
        })
        .catch((error) => {
          console.error("Error Uploading File:", error);
          setMessage({ msg: "Failed to Upload File.", isError: true });
        });
    } else {
      setMessage({ msg: "Please select an File to Upload.", isError: true });
    }
  };

  return {
    fileInfo,
    zoomOut,
    isDragging,
    isDisabled,
    handleFileChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleBrowseClick,
    handleRemoveFile,
    handleUploadClick,
    fileInputRef,
    message,
  };
};

export default useUpload;
