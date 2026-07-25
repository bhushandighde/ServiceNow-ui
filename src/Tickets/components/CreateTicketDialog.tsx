import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    MenuItem,
    TextField
} from "@mui/material";
import { useForm } from "react-hook-form";
import { createTicket } from "../services/TicketService";
import type { CreateTicketRequest } from "../types/CreateTicketRequest";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

interface CreateTicketFormData {
  title: string;
  description: string;
  status: string;
  priority: string;
  createdBy : number;
}



interface CreateTicketDialogProps {
    open: boolean;
    onClose: () => void;
}

interface CreateTicketDialogProps {
    open: boolean;
    onClose: () => void;
    onTicketCreated: () => void;
     onSuccess: (message: string) => void;
    onError: (message: string) => void;
}

export default function CreateTicketDialog({
    open,
    onClose,
    onTicketCreated,
    onSuccess,
    onError,
}: CreateTicketDialogProps) {
const { userId } = useContext(AuthContext);

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<CreateTicketFormData>();

const onSubmit = async (data: CreateTicketFormData) => {
    try {
        console.log("clicked Create button");
if (userId == null) return;

   const request: CreateTicketRequest = {
    ...data,
    createdBy: userId,
    status: "Open",
};
        await createTicket(request);

        onClose();

        onTicketCreated();
         onSuccess("Ticket created successfully");

console.log("4. Snackbar Called");

    }
    catch (error) {
        console.log(error);
         onError("Failed to create ticket");

    }
};

    
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>
                Create Ticket
            </DialogTitle>
            
            <DialogContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
     fullWidth
  margin="normal"
  label="Title"
  {...register("title", {
      required: "Title is required",
  })}
  error={!!errors.title}
            helperText={errors.title?.message}
                          />


                          <TextField
  fullWidth
  margin="normal"
  multiline
  rows={4}
  label="Description"
  {...register("description", {
    required: "Description is required",
  })}
  error={!!errors.description}
  helperText={errors.description?.message}
/> 


<TextField
  select
  fullWidth
  margin="normal"
  label="Priority"
  defaultValue=""
  {...register("priority", {
    required: "Priority is required",
  })}
  error={!!errors.priority}
  helperText={errors.priority?.message}
>
  <MenuItem value="Low">Low</MenuItem>
  <MenuItem value="Medium">Medium</MenuItem>
  <MenuItem value="High">High</MenuItem>
</TextField>

  <Button
    variant="contained"
    type="submit"
  >
    Create
  </Button>

                </form>       
            </DialogContent>

            <DialogActions>
          <DialogActions>
  <Button onClick={onClose}>
    Cancel
  </Button>


</DialogActions>
            </DialogActions>
        </Dialog>
    );
}


