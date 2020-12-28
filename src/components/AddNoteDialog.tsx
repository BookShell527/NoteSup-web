import React, { FC } from 'react'
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import purple from '@material-ui/core/colors/purple';

interface Props {
    open: boolean;
    setOpen: Function;
}

const AddNoteDialog: FC<Props> = ({ open, setOpen }) => {
    return (
        <Dialog open={open} aria-labelledby="dialog-title" >
            <DialogTitle id="dialog-title" >Add Note</DialogTitle>
            <DialogActions>
                <Button variant="contained" color="secondary" onClick={() => setOpen(false)} >Cancel</Button>
                <Button variant="contained" style={{ background: "#9c27b0", color: "white" }} >Add</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddNoteDialog;
