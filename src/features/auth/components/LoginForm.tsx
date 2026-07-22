import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { loginUser } from "../../../services/AuthServices";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { useAuth } from "../../../hooks/useAuth";
interface LoginFormData {
  email: string;
  password: string;
}
const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
const navigate= useNavigate();

const { login } = useAuth();

const onSubmit = async (data: LoginFormData) => {
  try {
    const response = await loginUser(data);

    if (!response.success) {
      console.log("Login failed");
      return;
    }

    console.log("Login successful");
     
    // Save JWT
     login(response.token);    
    // Later we'll navigate to dashboard
    navigate("/dashboard");
  } catch (error) {
    console.log("Login failed");
    console.error(error);
  }
};
  return (
    <Box  
    sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  }}
  >
    <Paper
      elevation={4}
      sx={{
        width: 400,
        p: 4,
        borderRadius: 2,
        display:'flex',
        flexDirection:'column'
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          mb: 3,
          fontWeight: 600,
        }}
      >
        Login
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TextField
          label="Email"
          fullWidth
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Invalid email",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Button variant="contained" type="submit">
          Login
        </Button>
      </Box>
    </Paper>
      </Box>
  );
};

export default LoginForm;