// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { ShortInfoWithEnvironment } from '../api/api';
import { ApplicationsChanger } from '../application/applicationsChanger';

import { useGlobalContext } from '../stores/notifications';
import { Grid } from '@material-ui/core';
import { BreadCrumbContainer } from '../layout/breadcrumbs';
import { applications } from '../stores/state';
import { TopRightMenu } from './topRightMenu';



type Props = {
    routes: any[];// TODO struct it
    applications: ShortInfoWithEnvironment[];
    applicationId: string;
    environment: string;
};

export const TopNavBar: React.FunctionComponent<Props> = (props) => {
    const _props = props!;
    return (
        <>
            <div id="topNavBar" >
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                >
                    <BreadCrumbContainer routes={_props.routes} />
                    <Grid
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="flex-end"
                    >
                        <TopRightMenu applications={_props.applications} applicationId={_props.applicationId} environment={_props.environment} />
                    </Grid>
                </Grid>
            </div>

        </>
    );
};
