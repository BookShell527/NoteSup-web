import React, { FC } from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

interface Parameter {
    text: string;
    text2?: string;
    icon: any;
    link?: string;
}

const ListItemTile: FC<Parameter> = ({ text, text2, icon: Icon, link }) => {
    const handleClick = () => {
        if (link) {
            window.location.href = link;
        } else {
            return;
        }
    }

    return (
        <ListItem onClick={handleClick} button key={text}>
            <ListItemIcon>
                <Icon />
            </ListItemIcon>
            <ListItemText primary={text} secondary={text2 && text2} />
        </ListItem>
    )
}

export default ListItemTile;