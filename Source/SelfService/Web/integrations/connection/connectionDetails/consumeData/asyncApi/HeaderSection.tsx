// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Typography } from '@mui/material';

import { ContentHeader } from '@dolittle/design-system';

export const HeaderSection = () =>
    <>
        <ContentHeader title='Async API' status={{ status: 'success', label: 'Active' }} />

        <Typography>
            Event streams expose message types for the connector to be consumed in external applications and services over Kafka.
            The event streams are fully documented using Async API specifications and will reflect the message types set up for the connector.
        </Typography>
    </>;
