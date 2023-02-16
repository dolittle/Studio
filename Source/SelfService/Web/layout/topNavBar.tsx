// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { ShortInfoWithEnvironment } from '../api/api';

import { Box, Grid } from '@mui/material';
import { BreadCrumbContainer, BreadcrumbsRoute } from './breadcrumbs';
import { TopRightMenu } from './topRightMenu';

type TopNavBarProps = {
    routes: BreadcrumbsRoute[];
    applications: ShortInfoWithEnvironment[];
    applicationId: string;
    environment: string;
};

export const TopNavBar = (props: TopNavBarProps) =>
    <Box sx={{ mb: 2 }} id='topNavBar'>
        <Grid container direction='row' justifyContent='space-between'>
            <BreadCrumbContainer routes={props.routes} />
            <Grid>
                <TopRightMenu
                    applications={props.applications}
                    applicationId={props.applicationId}
                    environment={props.environment}
                />
            </Grid>
        </Grid>
    </Box>;
