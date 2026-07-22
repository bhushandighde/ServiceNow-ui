import { Box, List, ListItemButton, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <Box sx={{ width: 220 }}>
            <List>
                <ListItemButton component={Link} to="/dashboard">
                    <ListItemText primary="Dashboard" />
                </ListItemButton>

                <ListItemButton component={Link} to="/tickets">
                    <ListItemText primary="Tickets" />
                </ListItemButton>

                <ListItemButton component={Link} to="/profile">
                    <ListItemText primary="Profile" />
                </ListItemButton>
            </List>
        </Box>
    );
}

export default Sidebar;