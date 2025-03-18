import axios from "axios";
import React, { useRef, useState } from "react";

const useUpload = () => {
  const [fileInfo, setFileInfo] = useState({ name: "", size: "" });
  const [zoomOut, setZoomOut] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [message, setMessage] = useState({ msg: "", isError: false });
  const [selectedFile, setSelectedFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [jsonData, setJsonData] = useState(null);
  const [isPaper, setIsPaper] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [insights, setInsights] = useState([]);
  const fileInputRef = useRef(null);

  const resetStates = () => {
    setTimeout(() => {
      setZoomOut(false);
      setFileInfo({ name: "", size: "" }); // Clear the file name
      setIsDisabled(false);
      fileInputRef.current.value = null;
    }, 300);
  };

  const handleReset = () => {
    setZoomOut(true);
    setIsDisabled(true);
    setMessage({ msg: "", isError: false });
    setSelectedFile(null);
    setPageNumber(1);
    setNumPages(null);
    setJsonData(null);
    setIsPaper(false);
    setInsights([]);
    resetStates();
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file);
      setPageNumber(1);
      setIsPaper(true);
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
      setSelectedFile(file);
      setIsPaper(true);
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
    setSelectedFile(null);
    setPageNumber(1);
    setNumPages(null);
    setJsonData(null);
    setIsPaper(false);
    resetStates();
  };
  const handleUploadClick = async (event) => {
    event.preventDefault();
    // Perform upload logic here
    try {
      const formData = new FormData();
      formData.append("file", fileInputRef.current.files?.[0]);

      if (fileInfo.name) {
        setIsDisabled(true);
        setIsPaper(true);
        const response = await axios.post(
          "https://openaiservices-dfamawfaeacmhhax.canadacentral-01.azurewebsites.net/upload",
          formData
        );

        const insightsData = await axios.post(
          "https://openaiservices-dfamawfaeacmhhax.canadacentral-01.azurewebsites.net/getinsights",
          formData
        );

        insightsData.data
          ? setInsights(
              insightsData.data.split("\n").filter((item) => item.trim() !== "")
            )
          : setInsights([]);
        // console.log(response);

        setJsonData(response.data);
        if (response.data) {
          setZoomOut(true);
          setMessage({
            msg: `${fileInfo.name} Uploaded Successfully!`,
            isError: false,
          });
          setIsUploaded(true);
          resetStates();
          setTimeout(() => {
            setMessage({ msg: "", isError: false });
            setIsPaper(false);
          }, 3000);
        }
        // .then((response) => {
        // })
        // .catch((error) => {
        //   console.error("Error Uploading File:", error);
        //   setMessage({ msg: "Failed to Upload File.", isError: true });
        // });
      } else {
        setMessage({ msg: "Please select an File to Upload.", isError: true });
      }
    } catch (error) {
      setMessage({ msg: "Failed to Upload File.", isError: true });
      setIsDisabled(false);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
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
    selectedFile,
    pageNumber,
    numPages,
    onDocumentLoadSuccess,
    setPageNumber,
    jsonData,
    isPaper,
    setIsPaper,
    isUploaded,
    setIsUploaded,
    handleReset,
    insights,
  };
};

export default useUpload;
