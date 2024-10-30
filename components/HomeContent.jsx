import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const HomeContent = () => {
  const router = useRouter();
  const [path, setPath] = useState("");
  useEffect(() => {
    setPath(router.pathname);
  }, []);
  console.log(path);

  return (
    <AppBar position="static" sx={{ background: "rgba(0, 0, 0, 0.87)" }}>
      <Toolbar component={Box} gap={2}>
        <Button
          onClick={() => router.push("/UploadPDF")}
          variant="outlined"
          color="inherit"
          className={`${path === "/UploadPDF" ? "active" : ""}`}
        >
          Upload Documents
        </Button>
        <Button
          onClick={() => router.push("/InvoiceTable")}
          variant="outlined"
          color="inherit"
          className={`${path === "/InvoiceTable" ? "active" : ""}`}
        >
          Processed Documents
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default HomeContent;
