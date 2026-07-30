import api from "../../api/axios"
import type { Ticket } from "../types/Ticket"
import type   { CreateTicketRequest } from "../types/CreateTicketRequest"
import type { UpdateTicketRequest } from "../pages/TicketDetails/TicketDetails"


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


export const getTicketById = async (id: number): Promise<Ticket> => {
    const response = await api.get(`/api/Ticket/${id}`);
    return response.data;
};

export const updateTicket = async (ticket : UpdateTicketRequest) : Promise<void> => {
    const response = await api.put(`/api/Ticket/updateTicket`, ticket);
    return response.data;
}
