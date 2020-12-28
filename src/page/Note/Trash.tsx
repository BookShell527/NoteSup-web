import React, { useContext, useState, useEffect } from 'react';
import { context } from "../../context/context";
import { firestore } from "../../firebase";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import NoteGrid from "../../components/NoteGrid";
import { Typography } from '@material-ui/core';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(() => ({
    container: {
        padding: "80px 10px 0 10px",
    },
    restoreIcon: {
        color: "blue",
        marginTop: -15,
        cursor: "pointer"
    },
    deleteIcon: {
        color: "red",
        marginTop: -15,
        cursor: "pointer",
        marginRight: 10
    }
}))

const Trash = () => {
    const classes = useStyles();
    const { toggleInTrash, deleteNote } = useContext(context);
    const noteCollection = firestore.collection("note");
    const [note, setNote] = useState([]) as any;
    const [loading, setLoading] = useState(true);

    const handleToggleInTrash = async (item: any) => {
        await toggleInTrash(item.id, item.inTrash);
    }

    const handleDelete = async (item: any) => {
        if (window.confirm("Are you sure want to delete this item?")) {
            await deleteNote(item.id);
        }
    }

    useEffect(() => {
        const unsub = noteCollection.where("inTrash", "==", true).onSnapshot(snap => {
            let documents: any[] = [];
            snap.forEach((doc: any) => {
                documents.push({ ...doc.data(), id: doc.id });
            });
            setNote(documents);
            setLoading(false);
        });
        return () => unsub();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!loading) {
        if (note.length === 0) {
            return (
                <Grid container direction="column" alignItems="center" justify="center" style={{ minHeight: "100vh" }}>
                    <Typography variant="h1">No notes moved to trash</Typography>
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
                                    <DeleteIcon className={classes.deleteIcon} onClick={() => handleDelete(m)} />
                                    <RestoreFromTrashIcon className={classes.restoreIcon} onClick={() => handleToggleInTrash(m)} />
                                </NoteGrid>
                            )
                        })
                    }
                </Grid>
            )
        }
    } else {
        return null;
    }
}

export default Trash;