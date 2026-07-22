import api from "../../api/axios"
import type { Ticket } from "../types/Ticket"

export const getTickets= async ():Promise<Ticket[]>=>{
    const response = await api.get("api/Ticket/getTickets")
    return response.data;
}