// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSnackbar } from 'notistack';

import { ShortInfoWithEnvironment } from '../api/api';
import { ApplicationsChanger } from '../application/applicationsChanger';
import { IconButton, SxProps } from '@mui/material';
import { AccountSettingsMenu } from './accountSettingsMenu';

type Props = {
    applications: ShortInfoWithEnvironment[];
    applicationId: string;
    environment: string;
};

const styles = {
    iconButton: {
        padding: 0,
        marginRight: 1,
    } as SxProps,
    icon: {
        fill: 'white',
    } as SxProps,
};

export const TopRightMenu: React.FunctionComponent<Props> = (props) => {
    const { enqueueSnackbar } = useSnackbar();
    const _props = props!;

    return <>
        <ApplicationsChanger applications={_props.applications} applicationId={_props.applicationId} environment={_props.environment} />
        <IconButton
            sx={styles.iconButton}
            aria-label="notification"
            onClick={() => {
                enqueueSnackbar('TODO: Something with notifications', { variant: 'error' });
            }}
            size="large">
            <NotificationsIcon sx={styles.icon} />
        </IconButton>

        {/* <AccountSettingsMenu child={
            <IconButton aria-label="more-options" sx={styles.iconButton} size="large">
                <AccountCircleIcon sx={styles.icon} />
            </IconButton>
        } /> */}

        <IconButton
            aria-label="account"
            onClick={() => {
                enqueueSnackbar('TODO: More options?', { variant: 'error' });
            }}
            sx={styles.iconButton}
            size="large">
            <MoreVertIcon sx={styles.icon} />
        </IconButton>

    </>;
};
