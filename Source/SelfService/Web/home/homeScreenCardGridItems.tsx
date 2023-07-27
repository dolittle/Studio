// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context/globalContext';

import { SimpleCardGrid, SimpleCardGridProps } from '@dolittle/design-system';

export const HomeScreenCardGridItems = () => {
    const { currentApplicationId } = useGlobalContext();

    const items: SimpleCardGridProps['simpleCardItems'] = [
        {
            title: 'I want to deploy and host a service',
            description: `We offer a runtime with event sourcing and the tools needed to build out distributed systems through event
        driven architecture. We then manage the infrastructure for you.`,
            primaryButton: {
                label: 'Deploy a microservice',
                overrides: {
                    component: Link,
                    to: `/microservices/application/${currentApplicationId}/Dev/overview`,
                },
            },
            buttonAlignment: 'right',
        },
        {
            title: 'I want to model data from M3',
            description: `Our integrations module lets you unlock existing data and works well with our event driven hosted platform,
        where you can also create apps that consume these integrations.`,
            primaryButton: {
                label: 'Connect to m3',
                overrides: {
                    component: Link,
                    to: '/integrations',
                },
            },
            buttonAlignment: 'right',
        },
        {
            title: `I'm new here!`,
            subtitle: 'Coming soon!',
            description: `Get started by setting up your first application and the environments you need to deploy your first
        microservice or integration service using our runtime and hosting platform.`,
            primaryButton: {
                label: 'Get Started',
                disabled: true,
            },
            buttonAlignment: 'right',
        },
    ];

    return <SimpleCardGrid simpleCardItems={items} />;
};
