// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

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
