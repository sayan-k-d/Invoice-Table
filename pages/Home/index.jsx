import HomeContent from "@/components/HomeContent";
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const Home = () => {
  return (
    <Box>
      <HomeContent />
    </Box>
  );
};

export default Home;
