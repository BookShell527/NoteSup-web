import React, { FC } from 'react';
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
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
        // marginRight: 10,
    },
    noteTitle: {
        textAlign: "center"
    },
    noteBody: {
        textAlign: "center",
        overflowWrap: "break-word",
        height: 210,
    },
    bottomRow: {
        paddingLeft: 20,
        paddingRight: 20
    }
}))

const NoteGrid: FC<Parameter> = ({ children, item }) => {
    const toColor = (num: number) => {
        num >>>= 0;
        const b = num & 0xFF, g = (num & 0xFF00) >>> 8, r = (num & 0xFF0000) >>> 16, a = ( (num & 0xFF000000) >>> 24 ) / 255;

        return "rgba(" + [r, g, b, a].join(",") + ")";
    }

    const classes = useStyles();
    return (
        <Grid key={item.id} className={classes.note} xs={6} lg={3} xl={2} item style={{ background: toColor(item.color) }} >
            <h4 className={classes.noteTitle} >{item.title}</h4>
            <Container className={classes.noteBody}>
                <Typography display="inline">
                    {item.body}
                </Typography>
            </Container>
            <Box display="flex" justifyContent="flex-end" className={classes.bottomRow} >
                { children }
            </Box>
        </Grid>
    )
}

export default NoteGrid
