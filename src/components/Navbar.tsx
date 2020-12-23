import React, { useState, useContext } from 'react';
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
    }
}));

type Anchor = "left"

const Navbar = () => {
    const classes = useStyles();
    const [state, setState] = useState({left: false,});
    const { currentUser } = useContext(context);
    console.log(currentUser);

    const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event && event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    if (currentUser === null) {
        return null;
    } else {
        return (
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
                </Toolbar>
            </AppBar>
        )
    }
}

export default Navbar
