import React, { FC, useContext } from 'react';
import { context } from "../context/context";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Timeago from "react-timeago";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';

interface Parameter {
    children: any;
    item: any;
}

const useStyles = makeStyles(() => ({
    note: {
        border: "1px solid #eee",
        borderRadius: 10,
        height: 300,
        marginRight: 10,
    },
    noteTitle: {
        textAlign: "center"
    },
    noteBody: {
        textAlign: "center",
        overflowWrap: "break-word",
        height: 210,
    },
    bottomRowIcon: {
        color: "blue",
        marginTop: -15
    },
    bottomRow: {
        paddingLeft: 20,
        paddingRight: 20
    }
}))

const NoteGrid: FC<Parameter> = ({ children, item }) => {
    const { toggleImportant } = useContext(context);

    const toColor = (num: number) => {
        num >>>= 0;
        const b = num & 0xFF, g = (num & 0xFF00) >>> 8, r = (num & 0xFF0000) >>> 16, a = ( (num & 0xFF000000) >>> 24 ) / 255;

        return "rgba(" + [r, g, b, a].join(",") + ")";
    }

    const toDateTime = (secs: number) => {
        var t = new Date(1970, 0, 1); // Epoch
        t.setSeconds(secs);
        return t;
    }

    const handleToggle = async () => {
        await toggleImportant(item.id, item.important);
    }

    const classes = useStyles();

    return (
        <Grid key={item.id} className={classes.note} xs={5} lg={3} xl={2} item style={{ background: toColor(item.color) }} >
            <h4 className={classes.noteTitle} >{item.title}</h4>
            <Container className={classes.noteBody}>
                <Typography display="inline">
                    {item.body}
                </Typography>
            </Container>
            <Box display="flex" justifyContent="flex-end" className={classes.bottomRow} >
                <Timeago date={toDateTime(item.createdDate.seconds)} style={{ marginRight: 5 }} />
                <IconButton onClick={handleToggle} className={classes.bottomRowIcon}>
                    { children }
                </IconButton>
            </Box>
        </Grid>
    )
}

export default NoteGrid
