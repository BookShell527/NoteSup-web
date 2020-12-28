import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from "@material-ui/core/Link";
import SwipeableDrawer from '@material-ui/core/Drawer';
import DrawerList from './DrawerList';
import { context } from "../context/context";
import AddIcon from '@material-ui/icons/Add';
import { useLocation } from 'react-router-dom';
import AddNoteDialog from "./AddNoteDialog";
import { firestore } from "../firebase";
import DeleteIcon from '@material-ui/icons/Delete';

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
    addButton: {
        color: "white"
    },
    deleteAllButton: {
        color: "red"
    }
}));

type Anchor = "left"

const Navbar = () => {
    const classes = useStyles();
    const [state, setState] = useState({left: false});
    const { currentUser, deleteAllNote } = useContext(context);
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const noteCollection = firestore.collection("note");
    const [note, setNote] = useState([]) as any;

    useEffect(() => {
        const unsub = noteCollection.where("inTrash", "==", true).onSnapshot(snap => {
            let documents: any[] = [];
            snap.forEach((doc: any) => {
                documents.push({ ...doc.data(), id: doc.id });
            });
            setNote(documents);
        });
        return () => unsub();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event && event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const handleDeleteAll = () => {
        if(window.confirm("Are you sure want to delete All Note in Trash?")) {
            deleteAllNote();
        }
    }

    const deleteAllCheck = () => {
        if (location.pathname === "/trash" && note.length !== 0) {
            return (
                <IconButton onClick={handleDeleteAll} edge="start" aria-label="deleteAll" className={classes.deleteAllButton} >
                    <DeleteIcon /> <Typography>Delete All</Typography>
                </IconButton>
            )
        } else {
            return null;
        }
    }

    const homeCheck = () => {
        if (location.pathname === "/") {
            return (
                <IconButton onClick={() => setOpen(true)} edge="start" aria-label="add" className={classes.addButton} >
                    <AddIcon /> <Typography>Add Note</Typography>
                </IconButton>
            )
        } else {
            return null;
        }
    }

    if (currentUser === null) {
        return null;
    } else {
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
                        { homeCheck() }
                        { deleteAllCheck() }
                    </Toolbar>
                </AppBar>
                <AddNoteDialog open={open} setOpen={setOpen} />
            </>
        )
    }
}

export default Navbar
