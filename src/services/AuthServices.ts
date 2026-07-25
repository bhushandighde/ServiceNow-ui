import { responsiveFontSizes } from "@mui/material";
import type { LoginRequest } from "../features/auth/types/Auth";
import api from "../api/axios";

export const loginUser= async (data:LoginRequest)=>{
const response= await api.post("/api/User/login", data)
console.log(response.data);
return response.data;

}