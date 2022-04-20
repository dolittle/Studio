// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';


import { Theme } from '@mui/material/styles';

import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';

import Typography from '@mui/material/Typography';

import { IconButton, Paper } from '@mui/material';

import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CachedIcon from '@mui/icons-material/Cached';

type Props = {
    state: string;
};


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        flowing: {
            'fill': '#48E0CF',
            '& .MuiSvgIcon-root': {
                color: '#48E0CF',
                marginRight: theme.spacing(1),
            },
            '& .MuiTypography-root': {
                color: '#48E0CF',
                textTransform: 'uppercase'
            }
        },
        waiting: {
            'fill': '#FF9366',
            '& .MuiSvgIcon-root': {
                color: '#FF9366',
                marginRight: theme.spacing(1),
            },
            '& .MuiTypography-root': {
                color: '#FF9366',
                textTransform: 'uppercase'
            }
        },
        error: {
            'fill': '#F66666',
            '& .MuiSvgIcon-root': {
                color: '#F66666',
                marginRight: theme.spacing(1),
            },
            '& .MuiTypography-root': {
                color: '#F66666',
                textTransform: 'uppercase'
            }
        },
        paper: {
            padding: theme.spacing(1),
            textAlign: 'center',
        },
    })
);

export const DataStateIcon: React.FunctionComponent<Props> = (props) => {
    const classes = useStyles();
    const state = props!.state;

    const options = {
        flowing: {
            className: classes.flowing,
            text: 'Data is flowing',
            icon: (<CheckCircleIcon className={classes.flowing} />),
        },
        error: {
            className: classes.error,
            text: 'Failing to sync',
            icon: (<ErrorIcon className={classes.error} />),
        },
        waiting: {
            className: classes.waiting,
            icon: (<CachedIcon className={classes.waiting} />),
            text: 'Waiting for data'
        },
    };

    const option = options[state] ?? options.error;
    const icon = option.icon;
    const iconText = option.text;

    return (
        <Paper className={classes.paper}>
            <IconButton className={option.className} size="large">
                {icon}
                <Typography>{iconText}</Typography>
            </IconButton>
        </Paper>
    );
};
