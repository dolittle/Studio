// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { ShortInfoWithEnvironment } from '../api/api';
import { ApplicationsChanger } from '../application/applicationsChanger';
import {
    IconButton,
    makeStyles,
    Theme
} from '@material-ui/core';
import { useGlobalContext } from '../stores/notifications';
import { createStyles } from '@material-ui/styles';


type Props = {
    applications: ShortInfoWithEnvironment[];
    applicationId: string;
    environment: string;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: 0,
            marginRight: theme.spacing(1),
        },
        icon: {
            fill: 'white',
        },
    })
);

export const TopRightMenu: React.FunctionComponent<Props> = (props) => {
    const classes = useStyles();
    const _props = props!;
    const { setNotification } = useGlobalContext();

    return (
        <>
            <ApplicationsChanger applications={_props.applications} applicationId={_props.applicationId} environment={_props.environment} />
            <IconButton aria-label="notification" onClick={() => {
                setNotification('TODO: Something with notifications', 'info');
            }}
                className={classes.root}
            >
                <NotificationsIcon className={classes.icon} />
            </IconButton>
            <IconButton aria-label="account" onClick={() => {
                setNotification('TODO: Something with account info', 'info');
            }}
                className={classes.root}
            >
                <AccountCircleIcon className={classes.icon} />
            </IconButton>

            <IconButton aria-label="more-options" onClick={() => {
                setNotification('TODO: More options?', 'info');
            }}
                className={classes.root}
            >
                <MoreVertIcon className={classes.icon} />
            </IconButton>
        </>
    );
};
