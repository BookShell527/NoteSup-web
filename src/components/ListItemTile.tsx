import React, { FC } from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from "react-router-dom";

interface Parameter {
    text: string;
    icon: any;
    link: string;
}

const ListItemTile: FC<Parameter> = ({ text, icon: Icon, link }) => {
    return (
        <ListItem button key={text}>
            <Link to={link}>
                <ListItemIcon>
                    <Icon />
                </ListItemIcon>
                <ListItemText primary={text} />
            </Link>
        </ListItem>
    )
}

export default ListItemTile;