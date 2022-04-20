// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';

import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import { Box, Typography } from '@mui/material';

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
