// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Typography } from '@mui/material';

import { Layout, SimpleCardGrid, SimpleCardGridProps } from '@dolittle/design-system';

import { primaryNavigationItems, secondaryNavigationItems, selectionMenuItems } from '../components/layout/workSpaceLayout/workSpaceLayoutLinks';

const simpleCardGridItems: SimpleCardGridProps['simpleCardItems'] = [
    {
        title: 'I want to deploy and host a service',
        description: `We offer a runtime with event sourcing and the tools needed to build out distributed systems through event
        driven architecture. We then manage the infrastructure for you.`,
        primaryButton: {
            label: 'Deploy a microservice',
        },
        buttonAlignment: 'right',
    },
    {
        title: 'I want to model data from M3',
        description: `Our integrations module lets you unlock existing data and works well with our event driven hosted platform,
        where you can also create apps that consume these integrations.`,
        primaryButton: {
            label: 'Connect to m3',
        },
        buttonAlignment: 'right',
    },
    {
        title: `I'm new here!`,
        description: `Get started by setting up your first application and the environments you need to deploy your first
        microservice or integration service using our runtime and hosting platform.`,
        primaryButton: {
            label: 'Get Started'
        },
        buttonAlignment: 'right',
    },
];

export const HomeScreen = () => {
    return (
        <Layout
            navigationBar={{
                logo: 'AigonixLightCube',
                primaryNavigationItems,
                secondaryNavigationItems,
                selectionMenuItems,
            }}
        >
            <Typography variant='h1' sx={{ mb: 3 }}>Welcome to Dolittle Studio!</Typography>

            <Typography variant='subtitle1' sx={{ maxWidth: 1018, mb: 4 }}>
                Dolittle Studio is a decentralized, distributed, event-driven, microservice platform built to harness the power of events.
                Our goal is to enable your company to build and run microservice based solutions that react in real-time whenever meaningful
                changes occur with a guaranteed uptime.
            </Typography>

            <SimpleCardGrid simpleCardItems={simpleCardGridItems} />
        </Layout>
    );
};
