// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useSnackbar } from 'notistack';

import { ShortInfoWithEnvironment } from '../api/api';
import { ApplicationsChanger } from '../application/applicationsChanger';
import {
    IconButton,
    makeStyles,
    Theme
} from '@material-ui/core';
import { createStyles } from '@material-ui/styles';
import { AccountSettingsMenu } from './accountSettingsMenu';

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
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();
    const _props = props!;

    return (
        <>
            <ApplicationsChanger applications={_props.applications} applicationId={_props.applicationId} environment={_props.environment} />
            <IconButton aria-label="notification" onClick={() => {
                enqueueSnackbar('TODO: Something with notifications', { variant: 'error' });
            }}
                className={classes.root}
            >
                <NotificationsIcon className={classes.icon} />
            </IconButton>

            <AccountSettingsMenu child={
                <IconButton aria-label="more-options" className={classes.root}>
                    <AccountCircleIcon className={classes.icon} />
                </IconButton>
            } />

            <IconButton aria-label="account" onClick={() => {
                enqueueSnackbar('TODO: More options?', { variant: 'error' });
            }}
                className={classes.root}
            >
                <MoreVertIcon className={classes.icon} />
            </IconButton>

        </>
    );
};
