import api from "../../api/axios"
import type { Ticket } from "../types/Ticket"
import type   { CreateTicketRequest } from "../types/CreateTicketRequest"
export const getTickets= async ():Promise<Ticket[]>=>{
    const response = await api.get("api/Ticket/getTickets")
    return response.data;
}


export const createTicket = async (ticket: CreateTicketRequest) => {
    const response = await api.post(
        "/api/Ticket/createTicket",
        ticket
    );

    return response.data;
};