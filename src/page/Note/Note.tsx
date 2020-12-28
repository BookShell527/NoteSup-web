import React, { useState, useEffect } from 'react';
import { firestore } from "../../firebase";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Helmet } from "react-helmet";

const useStyles = makeStyles(() => ({
    container: {
        padding: "80px 10px 0 10px"
    },
    titleContainer: {
        margin: "auto",
        textAlign: "center"
    },
    bodyContainer: {
        fontSize: 24
    }
}));

const Note = (props: any) => {
    const [note, setNote] = useState({}) as any;
    const noteCollection = firestore.collection("note");
    const classes = useStyles();

    const toColor = (num: number) => {
        num >>>= 0;
        const b = num & 0xFF, g = (num & 0xFF00) >>> 8, r = (num & 0xFF0000) >>> 16, a = ( (num & 0xFF000000) >>> 24 ) / 255;

        return "rgba(" + [r, g, b, a].join(",") + ")";
    }

    const html: HTMLHtmlElement = document.querySelector("html")!;
    html.style.background = toColor(note.color);

    useEffect(() => {
        const unsub = noteCollection.doc(props.match.params.id).onSnapshot((snap) => {
            setNote({...snap.data(), id: snap.id});
        })

        return () => unsub();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Helmet>
                <title>NoteSup | Note</title>
            </Helmet>
            <Grid container className={classes.container} >
                <Container className={classes.titleContainer} >
                    <Typography variant="h2">{ note.title }</Typography>
                </Container>
                <Container>
                    <Typography className={classes.bodyContainer} variant="body1">{ note.body }</Typography>
                </Container>
            </Grid>
        </>
    )
}

export default Note
