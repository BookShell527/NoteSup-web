import React, { ChangeEvent, useState, FormEvent, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Phone from '@material-ui/icons/Phone';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { context } from "../../context/context";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: "#9c27b0",
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        background: "#9c27b0",
        "&:hover": {
            background: "#6d1b7b"
        }
    },
    container: {
        marginTop: 80
    },
    link: {
        textDecoration: "none"
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
    success: {
        textAlign: "center",
        color: "green"
    }
}));

const ContactUs = () => {
    const classes = useStyles();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const { sendMessage } = useContext(context);
    const history = useHistory();

    const handleSend = async (e: FormEvent) => {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await sendMessage(message);
            history.push("/");
        } catch {
            setLoading(false);
            setError("Failed Registering User");
        }
    }

    return (
        <Container component="main" maxWidth="xs" className={classes.container} >
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <Phone />
                </Avatar>
                <Typography component="h1" variant="h5">Contact Us</Typography>
                <form className={classes.form} onSubmit={handleSend} >
                    <TextField 
                        variant="outlined" 
                        margin="normal" 
                        required 
                        fullWidth 
                        name="message" 
                        label="Message"
                        multiline
                        rows={4}
                        id="message" 
                        autoComplete="current-message" 
                        onChange={(e: ChangeEvent<HTMLTextAreaElement|HTMLInputElement>) => setMessage(e.target.value)} 
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
                    {error && <h4 className={classes.centerAlign}>{error}</h4>}
                    <Button className={classes.submit} disabled={loading} type="submit" fullWidth variant="contained" color="primary">Send Message</Button>
                </form>
            </div>
        </Container>
    )
}

export default ContactUs
