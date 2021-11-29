// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({

        label: {
            paddingBottom: theme.spacing(2),
            color: theme.palette.text.primary
        },
        data: {
            color: theme.palette.text.secondary
        },

    })
);

export interface HeaderDataRowProps {
    head: string
    data: string
}

export const HeaderDataRow: React.FunctionComponent<HeaderDataRowProps> = (props) => {
    const classes = useStyles();
    const head = props!.head;
    const data = props!.data;

    return (
        <Box px={0} mx={0} py={1}>
            <Typography component="p" className={classes.label}>
                {head}
            </Typography>

            <Typography component="p" className={classes.data}>
                {data}
            </Typography>
        </Box>
    );
};
