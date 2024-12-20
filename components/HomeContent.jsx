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
  const handleLogout = () => {
    localStorage.removeItem("loginStatus");
    router.push("/Login");
  };
  return (
    <Box className="nav-centent" sx={{ boxShadow: 5 }}>
      <Box>
        <Button
          onClick={() => router.push("/UploadPDF")}
          variant="contained"
          color="inherit"
          className={`${path === "/UploadPDF" ? "active" : ""}`}
        >
          Upload Documents
        </Button>
        <Button
          onClick={() => router.push("/InvoiceTable")}
          variant="contained"
          color="inherit"
          className={`${path === "/InvoiceTable" ? "active" : ""}`}
        >
          Processed Documents
        </Button>
      </Box>
      <Box>
        <Button onClick={handleLogout} variant="contained" color="inherit">
          Logout
        </Button>
      </Box>
    </Box>
    // <AppBar
    //   position="static"
    //   sx={{ background: "linear-gradient(to right, #E0E0FA,#E0F7FA, #B3E5FC)" }}
    //   className="home-header"
    // >
    //   <Toolbar component={Box} gap={2}>
    //     <Button
    //       onClick={() => router.push("/UploadPDF")}
    //       variant="outlined"
    //       color="inherit"
    //       className={`${path === "/UploadPDF" ? "active" : ""}`}
    //     >
    //       Upload Documents
    //     </Button>
    //     <Button
    //       onClick={() => router.push("/InvoiceTable")}
    //       variant="outlined"
    //       color="inherit"
    //       className={`${path === "/InvoiceTable" ? "active" : ""}`}
    //     >
    //       Processed Documents
    //     </Button>
    //   </Toolbar>
    // </AppBar>
  );
};

export default HomeContent;
