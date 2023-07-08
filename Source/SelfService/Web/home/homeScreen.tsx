// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Typography } from '@mui/material';

import { WorkSpaceWithoutSideBarLayout } from '../components/layout/workSpaceLayout/workSpaceLayout';
import { HomeScreenCardGridItems } from './homeScreenCardGridItems';

export const HomeScreen = () =>
    <WorkSpaceWithoutSideBarLayout pageTitle='Home'>
        <Typography variant='h1' sx={{ my: 3 }}>Welcome to Aigonix!</Typography>

        <Typography variant='subtitle1' sx={{ maxWidth: 1018, mb: 4 }}>
            Aigonix is a decentralized, distributed, event-driven, microservice platform built to harness the power of events.
            Our goal is to enable your company to build and run microservice based solutions that react in real-time whenever meaningful
            changes occur with a guaranteed uptime.
        </Typography>

        <HomeScreenCardGridItems />
    </WorkSpaceWithoutSideBarLayout>;
