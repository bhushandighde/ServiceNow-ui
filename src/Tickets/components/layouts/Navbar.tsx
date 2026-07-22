import { AppBar, Toolbar, Typography } from "@mui/material";

export const  Navbar=()=> {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">
                    ServiceNow Clone
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;