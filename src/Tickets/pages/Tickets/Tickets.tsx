import { useEffect, useState} from "react";
import type { Ticket } from "../../types/Ticket";
import { getTickets } from "../../services/TicketService";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Box, Typography, Button,InputAdornment,TextField } from "@mui/material";
import {Chip, IconButton} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search"
import CreateTicketDialog from "../../components/CreateTicketDialog";



export const Tickets = () => {

  const [openDialog, setOpenDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error"
>("success");

console.log(snackbarOpen, snackbarMessage, snackbarSeverity)


const showSuccess = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
};

const showError = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarSeverity("error");
    setSnackbarOpen(true);
};

const navigate = useNavigate();
const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 80,
  },
  {
    field: "title",
    headerName: "Title",
    flex: 1,
  },
  {
    field: "description",
    headerName: "Description",
    flex: 2,
  },
  {
    field: "status",
    headerName: "Status",
    renderCell: (params) => {
    let color:
      | "success"
      | "warning"
      | "error"
      | "default" = "default";

    switch (params.value) {
      case "Open":
        color = "success";
        break;

      case "InProgress":
        color = "warning";
        break;

      case "Closed":
        color = "error";
        break;
    }
     return (
      <Chip
        label={params.value}
        color={color}
        size="small"
      />
    );
  }
  ,width: 140

 } ,
  {
    field: "priority",
    headerName: "Priority",
    width: 140,
    renderCell:(params)=>{
        let color:
      | "success"
      | "warning"
      | "error"
      | "default" = "default";

    switch (params.value) {
      case "low":
        color = "success";
        break;

      case "Medium":
        color = "warning";
        break;

      case "High":
        color = "error";
        break;
    }
     return (
      <Chip
        label={params.value}
        color={color}
        size="small"
      />
    );


    }
  },
  {
    field: "createdBy",
    headerName: "Created By",
    width: 180,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 180,
  },
  {
  field: "action",
  headerName: "Action",
  width: 120,
  renderCell: (params) => (
    <IconButton
      color="primary"
      size="small"
      onClick={() => navigate(`/tickets/${params.row.id}`)}
    >
      <VisibilityIcon />
    </IconButton>
  )
}
];
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        loadTickets();
    }, []);

    const loadTickets = async () => {
        try {
            const response = await getTickets();
            setTickets(response);
            console.log(response)
        } catch (error) {
            console.log(error);
        }
        finally
        {
            setLoading(false);
        }
    };
    if (!loading && tickets.length === 0) {
        return (
            <Typography variant="h6">
                No tickets found.
            </Typography>
        );
    }

   return (
  <Box sx={{ p: 3 }}>
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
      }}
    >
      <Typography variant="h4">
        Tickets
      </Typography>
          <Box sx={{ display: "flex", gap: 2, width: 400}}>
        <TextField
            size="small"
            placeholder="Search tickets..."
            // value={searchText}
            // onChange={(e) => setSearchText(e.target.value)}
       slotProps={{
        input: {
       startAdornment: (
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
            ),
          },
        }}
        />
        <Box/>

      <Button variant="contained" sx={{display: "flex", gap: 2,width : 200}} 
       onClick={() => setOpenDialog(true)}>
        Create Ticket
      </Button>
    </Box>
     </Box>
    <DataGrid
      rows={tickets}
      columns={columns}
      loading={loading}
       slots={{
        noRowsOverlay: () => (
            <Typography sx={{ mt: 2 }}>
                No tickets found.
            </Typography>
        ),
        }}
      pageSizeOptions={[5, 10, 20]}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
      }}
      disableRowSelectionOnClick
      autoHeight
    />
    <CreateTicketDialog
    open={openDialog}
    onClose={() => setOpenDialog(false)}
    onTicketCreated= {loadTickets}
    onSuccess={showSuccess}
    onError={showError}
    
/>

  </Box>

   
);
};
export default Tickets;