import React, { ChangeEvent, useContext, useState, FormEvent } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from "../../components/Copyright"
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom";
import { context } from "../../context/context";



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
        width: '100%', // Fix IE 11 issue.
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
}));

export default function SignIn() {
    const classes = useStyles();
    const { login }  = useContext(context); 
    const history = useHistory();
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await login(email, password);
            history.push("/");
        } catch {
            setError("Failed to log in")
        }
    }

    return (
        <Container component="main" maxWidth="xs" className={classes.container} >
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Sign in</Typography>
                <form className={classes.form} onSubmit={handleLogin} >
                    <TextField 
                        variant="outlined" 
                        margin="normal" 
                        required 
                        fullWidth 
                        id="email" 
                        label="Email Address" 
                        name="email" 
                        autoComplete="email" 
                        onChange={(e: ChangeEvent<HTMLTextAreaElement|HTMLInputElement>) => setEmail(e.target.value)} 
                        autoFocus 
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
                        variant="outlined" 
                        margin="normal" 
                        required 
                        fullWidth 
                        name="password" 
                        label="Password" 
                        type="password" 
                        id="password" 
                        onChange={(e: ChangeEvent<HTMLTextAreaElement|HTMLInputElement>) => setPassword(e.target.value)} 
                        autoComplete="current-password" 
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
                    {error && <h1>{error}</h1>}
                    <Button className={classes.submit} type="submit" disabled={loading} fullWidth variant="contained" color="primary">Sign In</Button>
                    <Grid container>
                        <Grid item>
                            <Link to="/register" className={classes.link} >{"Don't have an account? Register!"}</Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={3}>
                <Copyright />
            </Box>
        </Container>
    );
}