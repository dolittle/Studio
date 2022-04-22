// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';

const styles = {
    root: {
        flexGrow: 1,
    },
    paper: {
        margin: 'auto',
        backgroundColor: 'inherit',
        color: '#93959F'
    },
}

interface Props {
    prefix: React.ReactNode
    suffix: React.ReactNode;
    title: string
}

export const RowWithLink: React.FunctionComponent<Props> = (props) => {

    return (
        <Box sx={styles.root}>
            <p>{props!.title}</p>
            <Paper sx={styles.paper}>
                <Grid container spacing={10}>
                    <Grid item>
                        {props!.prefix}
                    </Grid>
                    <Grid item >
                        {props!.suffix}
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};
