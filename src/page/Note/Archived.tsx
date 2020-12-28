import React, { useContext, useState, useEffect } from 'react';
import { context } from "../../context/context";
import { firestore } from "../../firebase";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import NoteGrid from "../../components/NoteGrid";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import ArchiveIcon from "@material-ui/icons/Archive";
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
    archivedIcon: {
        color: "green",
        marginTop: -15,
        cursor: "pointer",
        marginRight: 15
    }
}))

const Archived = () => {
    const classes = useStyles();
    const { currentUser, toggleImportant, toggleArchived } = useContext(context);
    const noteCollection = firestore.collection("note");
    const [note, setNote] = useState([]) as any;

    const handleToggleImportant = async (item: any) => {
        await toggleImportant(item.id, item.important);
    }

    const handleToggleArchived = async (item: any) => {
        await toggleArchived(item.id, item.archived)
    }

    useEffect(() => {
        const unsub = noteCollection.orderBy("important", "desc").where("uid", "==", currentUser.uid).where("archived", "==", true).where("inTrash", "==", false).onSnapshot(snap => {
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
                <Typography variant="h1">No notes archived</Typography>
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
                                <ArchiveIcon onClick={() => handleToggleArchived(m)} className={classes.archivedIcon} />
                                { m.important ? <StarIcon onClick={() => handleToggleImportant(m)} className={classes.starIcon} /> : <StarBorderIcon onClick={() => handleToggleImportant(m)} className={classes.starIcon} /> }
                            </NoteGrid>
                        )
                    })
                }
            </Grid>
        )
    }
}

export default Archived;