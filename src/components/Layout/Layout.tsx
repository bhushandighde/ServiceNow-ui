import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./SideBar";
const Layout = () => {
  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <Header />

      {/* Sidebar + Page */}
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Sidebar />

       <Box
       sx={{
       width: "100%",
       height: "90%",
       bgcolor: "#fff",
       borderRight: "1px solid #e0e0e0",
           }}
       >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;