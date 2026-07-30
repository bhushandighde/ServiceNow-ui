import { Typography } from "@mui/material";
import { getTicketById } from "../../services/TicketService";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { Ticket } from "../../types/Ticket";
import {CircularProgress} from "@mui/material";
import {Snackbar, Alert} from "@mui/material";
import {
    Box,
    Card,
    CardContent,
    Chip,
    Divider,
    Stack,
    Button,
    TextField,
    MenuItem
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { updateTicket } from "../../services/TicketService";

export interface UpdateTicketRequest {
    id: number;
    title: string;
    description: string;
    status: string;
    priority: string;
}



export const TicketDetails =()=>{

   const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error"
>("success");
const [saving, setSaving] = useState(false);

const navigate=useNavigate();


const handleSnackbarClose = () => {
    setSnackbarOpen(false);
};

    const handleSave = async() => {

        if(!ticket)return;
        setSaving(true)
       try {
        console.log(ticket);
        await updateTicket(ticket);
        setSnackbarOpen(true)
        setSnackbarMessage("Ticket Updated Successfully")
        setSnackbarSeverity("success")
        
        // Snackbar later
        console.log("Updated Successfully");
        navigate("/tickets", {
    state: {
        success: "Ticket updated successfully"
    }
});
    }
    catch (error) {
        console.log(error);
             setSnackbarOpen(true)
        setSnackbarMessage("Failed to update Ticket")
        setSnackbarSeverity("error")
    }
    finally{
      setSaving(false)

    }
    }

    const { id } = useParams();

    const [ticket, setTicket] = useState<Ticket | null>(null);
     const [loading, setLoading] = useState(true);

         useEffect(() => {
    if (!id) return;

    loadTicket();
 }, [id]);

 const loadTicket = async () => {
    try {
        const response = await getTicketById(Number(id));
        console.log(response)
        setTicket(response);
    }
    catch (error) {
        console.log(error);
    }
    finally {
        setLoading(false);
    }
};

if (loading) {
    return (<CircularProgress />);
}

else {
     if (!ticket) {
    return <Typography>Ticket not found</Typography>;
} else {
   return (
    <Box sx={{ "p":"{3}"}}>

       
        <Stack sx={{ direction:"row",
            justifyContent:"space-between",
            alignItems:"center",
            mb:3}}
           
        >
            <Typography variant="h4">
                Ticket Details
            </Typography>

            <Button
                variant="contained"
                 onClick={handleSave}
                 disabled ={saving}
            >
                {saving ? "Saving..." : "Save Changes"}
            </Button>
        </Stack>

        <Card>
 <Snackbar
    open={snackbarOpen}
    autoHideDuration={3000}
    onClose={handleSnackbarClose}
>
    <Alert
        severity={snackbarSeverity}
        onClose={handleSnackbarClose}
        sx={{ width: "100%" }}
    >
        {snackbarMessage}
    </Alert>
</Snackbar>

            <CardContent>

               <TextField
    fullWidth
    label="Title"
    value={ticket.title}
    onChange={(e) =>
        setTicket({
            ...ticket,
            title: e.target.value,
        })
    }
/>
                <Divider sx={{ my: 2 }} />


               <TextField
    fullWidth
    multiline
    rows={4}
    label="Description"
    value={ticket.description}
    onChange={(e) =>
        setTicket({
            ...ticket,
            description: e.target.value,
        })
    }
/>
                
<Divider sx={{ my: 3 }} />

<Stack spacing={2}>
<TextField
    select
    label="Status"
    value={ticket.status}
    onChange={(e) =>
        setTicket({
            ...ticket,
            status: e.target.value,
        })
    }
>
    <MenuItem value="Open">Open</MenuItem>
    <MenuItem value="InProgress">In Progress</MenuItem>
    <MenuItem value="Closed">Closed</MenuItem>
</TextField>
    

<TextField
    select
    label="Priority"
    value={ticket.priority}
    onChange={(e) =>
        setTicket({
            ...ticket,
            priority: e.target.value,
        })
    }
>
    <MenuItem value="low">Low</MenuItem>
    <MenuItem value="medium">Medium</MenuItem>
    <MenuItem value="high">High</MenuItem>
</TextField>
    
<Typography variant="h6">
    Created At :   {
    new Date(ticket.createdAt).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
})}
</Typography>
<Typography >
  
</Typography>
</Stack>
<Divider sx={{ my: 3 }} />

<Typography variant="h6">
    Comments
</Typography>

<Typography color="text.secondary">
    No comments yet.
</Typography>

<Divider sx={{ my: 3 }} />

<Typography variant="h6">
    AI Suggestions
</Typography>

<Typography color="text.secondary">
    AI suggestions will appear here.
</Typography>
            </CardContent>
            

        </Card>
        

    </Box>
);
}
}}

export default TicketDetails;