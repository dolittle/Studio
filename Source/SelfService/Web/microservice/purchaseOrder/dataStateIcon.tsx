// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';


import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

import { IconButton, Paper } from '@material-ui/core';

import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CachedIcon from '@material-ui/icons/Cached';

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

    const option = options[state] ? options[state] : options.error;
    const icon = option.icon;
    const iconText = option.text;

    return (
        <Paper className={classes.paper}>
            <IconButton
                className={option.className}
            >
                {icon}
                <Typography>{iconText}</Typography>
            </IconButton>
        </Paper>

    );
};
