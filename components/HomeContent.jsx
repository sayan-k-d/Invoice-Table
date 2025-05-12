import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { Upload, FileText, LogOut, Menu as MenuIcon } from "lucide-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
// const avatarSvg = "/images/avatar2.svg";
const HomeContent = () => {
  const router = useRouter();
  // const [activeTab, setActiveTab] = useState("upload");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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
    <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
      <div
        className={`sidebar-header ${
          !isSidebarOpen ? "justify-content-center" : ""
        }`}
      >
        <h1 className="sidebar-title">Invoice Manager</h1>
        <button
          className="sidebar-toggle"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <MenuIcon size={24} />
        </button>
      </div>
      <nav className="sidebar-nav">
        <button
          className={`nav-item ${path === "/UploadPDF" ? "active" : ""} ${
            !isSidebarOpen ? "justify-content-center" : ""
          }`}
          onClick={() => router.push("/UploadPDF")}
        >
          <Upload size={20} />
          <span>Upload Document</span>
        </button>
        {/* <button
          className={`nav-item ${path === "/InvoiceTable" ? "active" : ""} ${
            !isSidebarOpen ? "justify-content-center" : ""
          }`}
          onClick={() => router.push("/InvoiceTable")}
        >
          <FileText size={20} />
          <span>Processed Document</span>
        </button> */}
        <button
          className={`nav-item logout ${
            !isSidebarOpen ? "justify-content-center" : ""
          }`}
          onClick={handleLogout}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </nav>
    </div>

    // <Box className="nav-centent" sx={{ boxShadow: 5 }}>
    //   <Box>
    //     <Button
    //       onClick={() => router.push("/UploadPDF")}
    //       variant="contained"
    //       color="inherit"
    //       className={`${path === "/UploadPDF" ? "active" : ""}`}
    //     >
    //       Upload Documents
    //     </Button>
    //     <Button
    //       onClick={() => router.push("/InvoiceTable")}
    //       variant="contained"
    //       color="inherit"
    //       className={`${path === "/InvoiceTable" ? "active" : ""}`}
    //     >
    //       Processed Documents
    //     </Button>
    //   </Box>
    //   <Box>
    //     <Button onClick={handleLogout} variant="contained" color="inherit">
    //       Logout
    //     </Button>
    //   </Box>
    // </Box>

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
