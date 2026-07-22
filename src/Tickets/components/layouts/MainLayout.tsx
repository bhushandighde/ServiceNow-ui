import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export const MainLayout=()=> {
    return (
        <>
            <Navbar />
            <Box sx={{ display: "flex" }}>
                <Sidebar />

                <Box sx={{ p: 3, flex: 1 }}>
                    <Outlet />
                </Box>
            </Box>
        </>
    );
}

export default MainLayout;