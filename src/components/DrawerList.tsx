import React, { FC, KeyboardEvent, MouseEvent, useState, useContext } from 'react'
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import clsx from 'clsx';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListItemTile from "./ListItemTile";
import { context } from "../context/context";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

type Anchor = "left";

interface Parameter {
    anchor: Anchor;
};

const useStyles = makeStyles((theme) => ({
    list: {
        width: 250
    }
}));

const DrawerList: FC<Parameter> = ({ anchor }) => {
    const classes = useStyles();
    const [state, setState] = useState({left: false});
    const { signOut } = useContext(context);

    const toggleDrawer = (anchor: Anchor, open: boolean) => (event: KeyboardEvent | MouseEvent) => {
        if (event && event.type === 'keydown' && ((event as KeyboardEvent).key === 'Tab' || (event as KeyboardEvent).key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const handleSignOut = async () => {
        await signOut();
        window.location.href = "/login";
    }

    return (
        <div
            className={clsx(classes.list)}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>

            </List>
            <Divider />
            
            <List>
                <ListItem onClick={handleSignOut} button key={"Sign Out"}>
                    <ListItemIcon >
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Sign Out"} />
                </ListItem>
            </List>
        </div>
    )
}

export default DrawerList
