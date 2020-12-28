import React, { FC, useState, useContext, ChangeEvent, FormEvent } from 'react'
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { context } from "../context/context";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";

interface Props {
    open: boolean;
    setOpen: Function;
}

const useStyles = makeStyles((theme: any) => ({
    form: {
        width: '100%',
        paddingTop: 0
    },
    submit: {
        background: "#9c27b0",
        "&:hover": {
            background: "#6d1b7b"
        },
        color: "white"
    },
    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
            borderColor: `#9c27b0 !important`,
        }
    },
    cssFocused: {
        color: '#9c27b0 !important'
    },
    notchedOutline: {
        borderWidth: '1px',
    },
    centerAlign: {
        textAlign: "center",
        color: "red"
    },
    dialogContent: {
        paddingTop: "0 !important"
    },
    formControl: {
        marginTop: "5px !important"
    }
}))

const AddNoteDialog: FC<Props> = ({ open, setOpen }) => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [color, setColor] = useState(0xFFCE93D8);
    const classes = useStyles();
    const { addNote, currentUser } = useContext(context);

    const toColor = (num: number) => {
        num >>>= 0;
        const b = num & 0xFF, g = (num & 0xFF00) >>> 8, r = (num & 0xFF0000) >>> 16, a = ( (num & 0xFF000000) >>> 24 ) / 255;

        return "rgba(" + [r, g, b, a].join(",") + ")";
    }

    return (
        <Dialog open={open} aria-labelledby="dialog-title" >
            <DialogTitle id="dialog-title" >Add Note</DialogTitle>
                <form className={classes.form} onSubmit={(e: FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    addNote(currentUser.uid, title, body, parseInt(color.toString()));
                    setOpen(false);
                }}>
                    <DialogContent className={classes.dialogContent} >
                        <TextField 
                            variant="outlined" 
                            margin="normal" 
                            required 
                            fullWidth 
                            id="title" 
                            label="Note Title" 
                            name="title" 
                            autoComplete="title" 
                            autoFocus 
                            className={classes.formControl}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement|HTMLInputElement>) => setTitle(e.target.value)} 
                            InputLabelProps={{
                                classes: {
                                    focused: classes.cssFocused,
                                },
                            }}
                            InputProps={{
                                classes: {
                                    root: classes.cssOutlinedInput,
                                    focused: classes.cssFocused,
                                    notchedOutline: classes.notchedOutline,
                                },
                                inputMode: "numeric"
                            }}
                        />
                        <TextField
                            multiline
                            variant="outlined" 
                            margin="normal" 
                            required 
                            fullWidth 
                            id="body" 
                            label="Note Body" 
                            name="body" 
                            autoComplete="body" 
                            autoFocus
                            rows={4}
                            InputLabelProps={{
                                classes: {
                                    focused: classes.cssFocused,
                                },
                            }}
                            InputProps={{
                                classes: {
                                    root: classes.cssOutlinedInput,
                                    focused: classes.cssFocused,
                                    notchedOutline: classes.notchedOutline,
                                },
                                inputMode: "numeric"
                            }}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement|HTMLInputElement>) => setBody(e.target.value)} 
                        />
                        <Grid container justify="center" spacing={2}>
                            {[0xFFCE93D8, 0xFFFFCDD2, 0xFFC8E6C9, 0xFFBBDEFB, 0xFFFFF9C4].map((value) => (
                                <Grid style={{ cursor: "pointer" }} onClick={() => setColor(value)} key={value} item>
                                    <Avatar style={{ background: toColor(parseInt(value.toString())), color: toColor(parseInt(value.toString())), border: color === value ? "2px solid black" : "1px solid grey" }}></Avatar>
                                </Grid>
                            ))}
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="secondary" onClick={() => setOpen(false)} >Cancel</Button>
                        <Button variant="contained" type="submit" className={classes.submit} >Add</Button>
                    </DialogActions>
                </form>
        </Dialog>
    )
}

export default AddNoteDialog;
