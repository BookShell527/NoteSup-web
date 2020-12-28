import React, { useContext, useState, useEffect } from 'react';
import { context } from "../../context/context";
import { firestore } from "../../firebase";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import NoteGrid from "../../components/NoteGrid";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    container: {
        padding: "80px 10px 0 10px",
    },
    starIcon: {
        color: "blue",
        marginTop: -15,
        cursor: "pointer"
    },
}))

const Home = () => {
    const classes = useStyles();
    const { currentUser, toggleImportant } = useContext(context);
    const noteCollection = firestore.collection("note");
    const [note, setNote] = useState([]) as any;

    const handleToggle = async (item: any) => {
        await toggleImportant(item.id, item.important);
    }

    useEffect(() => {
        const unsub = noteCollection.orderBy("important", "desc").where("uid", "==", currentUser.uid).where("archived", "==", false).where("inTrash", "==", false).onSnapshot(snap => {
            let documents: any[] = [];
            snap.forEach((doc: any) => {
                documents.push({ ...doc.data(), id: doc.id });
            });
            setNote(documents);
        });
        return () => unsub();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (note.length === 0) {
        return (
            <Grid container direction="column" alignItems="center" justify="center" style={{ minHeight: "100vh" }}>
                <Typography variant="h1">No notes added</Typography>
            </Grid>
        )
    } else {
        return (
            <Grid className={classes.container} container>
                <CssBaseline />
                {
                    note.map((m: any) => {
                        return (
                            <NoteGrid item={m} key={m.id} >
                                { m.important ? <StarIcon onClick={() => handleToggle(m)} className={classes.starIcon} /> : <StarBorderIcon onClick={() => handleToggle(m)} className={classes.starIcon} /> }
                            </NoteGrid>
                        )
                    })
                }
            </Grid>
        )
    }
}

export default Home
