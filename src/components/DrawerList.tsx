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
import HomeIcon from '@material-ui/icons/Home';
import PhoneIcon from '@material-ui/icons/Phone';
import DeleteIcon from '@material-ui/icons/Delete';
import EmailIcon from '@material-ui/icons/Email';
import ArchiveIcon from '@material-ui/icons/Archive';
import Avatar from "@material-ui/core/Avatar";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

type Anchor = "left";

interface Parameter {
    anchor: Anchor;
};

const useStyles = makeStyles((theme) => ({
    list: {
        width: 250
    },
    avatar: {
        margin: "20px auto",
        textAlign: "center",
        transform: "scale(1.5)"
    }
}));

const DrawerList: FC<Parameter> = ({ anchor }) => {
    const classes = useStyles();
    const [state, setState] = useState({left: false});
    const { signOut, currentUser } = useContext(context);

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
            {
                currentUser.photoURL === null ?
                    <Avatar className={classes.avatar} >
                        <AccountCircleIcon />
                    </Avatar> :
                    <Avatar className={classes.avatar} src={currentUser.photoURL} />
            }
            <Divider />
            <List>
                <ListItemTile text="Email" text2={currentUser.email} icon={EmailIcon} link="" />
            </List>
            <Divider />
            <List>
                <ListItemTile text="Home" icon={HomeIcon} link="/" />
                <ListItemTile text="Archived" icon={ArchiveIcon} link="/archived" />
                <ListItemTile text="Trash" icon={DeleteIcon} link="/trash" />
                <ListItemTile text="ContactUs" icon={PhoneIcon} link="/contactus" />
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
