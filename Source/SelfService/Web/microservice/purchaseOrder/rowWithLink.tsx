// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            margin: 'auto',
            backgroundColor: 'inherit',
            color: '#93959F'
        },
    }),
);

interface Props {
    prefix: React.ReactNode
    suffix: React.ReactNode;
    title: string
}

export const RowWithLink: React.FunctionComponent<Props> = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <p>{props!.title}</p>
            <Paper className={classes.paper}>
                <Grid container spacing={10}>
                    <Grid item>
                        {props!.prefix}
                    </Grid>
                    <Grid item >
                        {props!.suffix}
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};
