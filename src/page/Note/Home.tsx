import React, { useContext, useState, useEffect, Fragment } from 'react';
import { context } from "../../context/context";
import { firestore } from "../../firebase";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import NoteGrid from "../../components/NoteGrid";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { Typography } from '@material-ui/core';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import EditIcon from '@material-ui/icons/Edit';
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import AddNoteDialog from "../../components/AddNoteDialog";
import { Helmet } from "react-helmet";

const useStyles = makeStyles(() => ({
    container: {
        padding: "80px 10px 0 10px",
    },
    starIcon: {
        color: "blue",
        marginTop: -15,
        cursor: "pointer"
    },
    zoomIcon: {
        marginTop: -15, 
        marginRight: 10, 
        cursor: "pointer"
    },
    archivedIcon: {
        color: "green",
        marginTop: -15,
        cursor: "pointer",
        marginRight: 10
    },
    deleteIcon: {
        color: "red",
        marginTop: -15,
        cursor: "pointer",
        marginRight: 10
    },
    editIcon: {
        color: "orange",
        marginTop: -15,
        cursor: "pointer",
        marginRight: 10
    }
}))

const Home = () => {
    const classes = useStyles();
    const { currentUser, toggleImportant, toggleArchived, toggleInTrash } = useContext(context);
    const noteCollection = firestore.collection("note");
    const [note, setNote] = useState([]) as any;
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = noteCollection.orderBy("important", "desc").where("uid", "==", currentUser.uid).where("archived", "==", false).where("inTrash", "==", false).onSnapshot(snap => {
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
                <>
                    <Helmet>
                        <title>NoteSup | Home</title>
                    </Helmet>
                    <Grid container direction="column" alignItems="center" justify="center" style={{ minHeight: "100vh" }}>
                        <Typography variant="h5">No notes added</Typography>
                    </Grid>
                </>
            )
        } else {
            return (
                <>
                    <Helmet>
                        <title>NoteSup | Home</title>
                    </Helmet>
                    <Grid className={classes.container} container>
                        <CssBaseline />
                        {
                            note.map((m: any) => {
                                return (
                                    <Fragment key={m.id}>
                                        <NoteGrid item={m}>
                                            <ZoomOutMapIcon className={classes.zoomIcon} onClick={() => window.location.href = `/note/${m.id}`} />
                                            <EditIcon className={classes.editIcon} onClick={() => setOpen(true)} />
                                            <ArchiveOutlinedIcon onClick={() => toggleArchived(m.id, m.archived)} className={classes.archivedIcon} />
                                            <DeleteIcon className={classes.deleteIcon} onClick={() => toggleInTrash(m.id, m.inTrash)} />
                                            { m.important ? <StarIcon onClick={() => toggleImportant(m.id, m.important)} className={classes.starIcon} /> : <StarBorderIcon onClick={() => toggleImportant(m.id, m.important)} className={classes.starIcon} /> }
                                        </NoteGrid>
                                        <AddNoteDialog open={open} setOpen={setOpen} edit={true} noteBody={m.body} noteColor={m.color} noteTitle={m.title} noteId={m.id} />
                                    </Fragment>
                                )
                            })
                        }
                    </Grid>
                </>
            )
        }
    } else {
        return (
            <Helmet>
                <title>NoteSup | Home</title>
            </Helmet>
        );
    }
}

export default Home
