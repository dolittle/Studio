// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Typography } from '@mui/material';
import { RocketLaunch } from '@mui/icons-material';

import { NoEntityView } from '../../../components/noEntityView/noEntityView';

type NoMicroservicesProps = {
    onCreate: () => void;
};

export const NoMicroservices = ({ onCreate }: NoMicroservicesProps) =>
    <NoEntityView
        title='No microservices deployed yet...'
        createEntityProps={{
            createEntityText: 'Deploy new microservice',
            createEntityIcon: <RocketLaunch />,
            onCreateEntity: onCreate
        }}
    >
        <Typography variant='body1' mb={2}>
            After you deploy your first microservice it will appear here.
        </Typography>

        <Typography variant='body1'>
            To deploy a new microservice click on the &apos;deploy a microservice&apos; button or &apos;deploy new&apos; tab at the top.
        </Typography>
    </NoEntityView>;
