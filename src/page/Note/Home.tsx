import React, { useContext, useState, useEffect } from 'react';
import { context } from "../../context/context";
import { firestore } from "../../firebase";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import NoteGrid from "../../components/NoteGrid";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";

const useStyles = makeStyles(() => ({
    container: {
        padding: "80px 10px 0 10px",
    },
    bottomRowIcon: {
        color: "blue",
        marginTop: -7
    },
}))

const Home = () => {
    const classes = useStyles();
    const { currentUser } = useContext(context);
    const noteCollection = firestore.collection("note");
    const [note, setNote] = useState([]) as any;

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

    return (
        <>
            <Grid className={classes.container} container>
                <CssBaseline />
                {
                    note.map((m: any) => {
                        return (
                            <NoteGrid item={m} >
                                { m.important ? <StarIcon /> : <StarBorderIcon /> }
                            </NoteGrid>
                        )
                    })
                }
            </Grid>
        </>
    )
}

export default Home
