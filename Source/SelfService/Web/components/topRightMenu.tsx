// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { ShortInfoWithEnvironment } from '../api/api';
import { ApplicationsChanger } from '../application/applicationsChanger';
import {
    FormControl,
    IconButton,
    makeStyles,
    MenuItem,
    Select,
    Theme
} from '@material-ui/core';
import { useGlobalContext } from '../stores/notifications';
import { createStyles } from '@material-ui/styles';
import { SettingsMenu } from './settingsMenu';

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

        formControl: {
            marginRight: theme.spacing(3),
            minWidth: 120,
            float: 'left',
        },

        menuItem: {
            justifyContent: 'flex-end',
        },
    })
);

export const TopRightMenu: React.FunctionComponent<Props> = (props) => {
    const classes = useStyles();
    const _props = props!;
    const { setNotification } = useGlobalContext();

    const items = [
        <MenuItem className={classes.menuItem} key='changeCustomer' value='changeCustomer'>
            Change Customer
        </MenuItem>
    ];

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


            <SettingsMenu child={
                <IconButton aria-label="more-options" className={classes.root}>
                    <MoreVertIcon className={classes.icon} />
                </IconButton>
            } />
        </>
    );
};
