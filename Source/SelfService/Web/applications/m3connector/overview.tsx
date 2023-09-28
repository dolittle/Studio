// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useNavigate } from 'react-router-dom';

import { Typography } from '@mui/material';

import { Button } from '@dolittle/design-system';

import { HttpResponseApplication } from '../../apis/solutions/application';

type EnvironmentInfo = {
    name: string;
    connected: boolean;
};

export type OverviewProps = {
    application: HttpResponseApplication;
};

export const Overview = ({ application }: OverviewProps) => {
    const navigate = useNavigate();

    const applicationId = application.id;

    const environments = application.environments.map(env => ({
        name: env.name,
        connected: env.connections.m3Connector,
    })) as EnvironmentInfo[];

    return (
        <>
            <Typography variant='h1' my={2}>Overview</Typography>

            {environments.map(row => (
                <>
                    <Typography variant='h2' my={2}>{row.name}</Typography>

                    <Button
                        label={row.connected ? 'View Details' : 'Setup'}
                        onClick={async () => {
                            const environment = row.name;
                            const href = row.connected ?
                                `/m3connector/application/${applicationId}/${environment}/details` :
                                `/m3connector/application/${applicationId}/${environment}/setup`;
                            navigate(href);
                        }}
                    />
                </>
            ))}
        </>
    );
};
