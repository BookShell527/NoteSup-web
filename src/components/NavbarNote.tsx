import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from '@material-ui/core/Drawer';
import DrawerList from './DrawerList';
import { context } from "../context/context";
import AddNoteDialog from "./AddNoteDialog";
import { firestore } from "../firebase";
import DeleteIcon from '@material-ui/icons/Delete';
import Link from "@material-ui/core/Link";
import ArchiveIcon from "@material-ui/icons/Archive";
import EditIcon from "@material-ui/icons/Edit";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        textDecoration: "none",
        color: "white"
    },
    titleLink: {
        textDecoration: "none !important",
        color: "white",
    },
    root: {
        background: "purple"
    },
    deleteButton: {
        color: "red"
    },
    archivedButton: {
        color: "green"
    },
    importantButton: {
        color: "blue"
    },
    editButton: {
        color: "orange"
    }
}));

type Anchor = "left"

const NavbarNote = (props: any) => {
    const classes = useStyles();
    const [state, setState] = useState({left: false});
    const { toggleInTrash, toggleArchived, toggleImportant } = useContext(context);
    const [open, setOpen] = useState(false);
    const noteCollection = firestore.collection("note");
    const [note, setNote] = useState([]) as any;

    useEffect(() => {
        const unsub = noteCollection.doc(props.match.params.id).onSnapshot((snap) => {
            setNote({...snap.data(), id: snap.id});
        })

        return () => unsub();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event && event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const handleToggleInTrash = async () => {
        await toggleInTrash(note.id, note.inTrash);
        window.location.href = "/";
    }

    return (
        <>
            <AppBar position="fixed" className={classes.root} >
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer("left", true)} >
                        <MenuIcon />
                    </IconButton>
                    <SwipeableDrawer anchor={"left"}
                        open={state["left"]}
                        onClose={toggleDrawer("left", false)}
                    >
                        {<DrawerList anchor="left" />}
                    </SwipeableDrawer>
                    <Typography variant="h6" className={classes.title}>
                        <Link href="/" className={classes.titleLink} >NoteSup</Link>
                    </Typography>
                    <IconButton onClick={() => setOpen(true)} edge="start" aria-label="edit" className={classes.editButton} >
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={handleToggleInTrash} edge="start" aria-label="deleteAll" className={classes.deleteButton} >
                        <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={() => toggleImportant(note.id, note.important)} edge="start" aria-label="important" className={classes.importantButton} >
                        { note.important ? <StarIcon /> : <StarBorderIcon /> }
                    </IconButton>
                    <IconButton onClick={() => toggleArchived(note.id, note.archived)} edge="start" aria-label="archived" className={classes.archivedButton} >
                        { note.archived ? <ArchiveIcon /> : <ArchiveOutlinedIcon /> }
                    </IconButton>
                    <AddNoteDialog open={open} setOpen={setOpen} edit={true} noteBody={note.body} noteColor={note.color} noteTitle={note.title} noteId={note.id} />
                </Toolbar>
            </AppBar>
        </>
    )
}

export default NavbarNote;