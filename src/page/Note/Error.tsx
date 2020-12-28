import React from 'react';
import { Helmet } from "react-helmet";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles(() => ({
    button: {
        backgroundColor: "purple", 
        color: "white", 
        marginTop: 20,
        '&:hover': {
            backgroundColor: "#9c27b0"
        }
    }
}));

const Error = () => {
    const classes = useStyle();
    return (
        <>
            <Helmet>
                <title>NoteSup | 404</title>
            </Helmet>
            <Grid container direction="column" alignItems="center" justify="center" style={{ minHeight: "100vh", backgroundColor: "lightgray" }}>
                <Typography variant="h3">404 | Page Not Found</Typography>
                <Link href="/" style={{ textDecoration: "none" }}>
                    <Button variant="contained" className={classes.button} >Go Back To Home Page</Button>
                </Link>
            </Grid>
        </>
    )
}

export default Error
