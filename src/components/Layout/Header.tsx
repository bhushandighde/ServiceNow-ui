import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Header = () => {
  const { logout } = useAuth();
  
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        <Typography sx={{variant:"h6" ,fontWeight:"bold"}}>
          ServiceNow Clone
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Typography >
          Bhushan
        </Typography>

        <Button
          color="inherit"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;