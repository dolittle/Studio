// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useGlobalContext } from '../context/globalContext';
import { useNavigate, generatePath } from 'react-router-dom';

import { Paper, Stack, Typography } from '@mui/material';

import { Button } from '@dolittle/design-system';

import { ShortInfoWithEnvironment } from '../apis/solutions/api';
import { HttpResponseApplication } from '../apis/solutions/application';

export type PickEnvironmentProps = {
    applications: ShortInfoWithEnvironment[];
    application: HttpResponseApplication;
    redirectTo: string;
    openModal?: boolean;
};

export const isEnvironmentValidFromUrl = (applications: ShortInfoWithEnvironment[], currentApplicationId: string, currentEnvironment: string): boolean => {
    return applications.some((info) => {
        return currentApplicationId === info.id && currentEnvironment === info.environment;
    });
};

export const PickEnvironment = ({ applications, openModal, redirectTo }: PickEnvironmentProps) => {
    const { setCurrentEnvironment, setCurrentApplicationId } = useGlobalContext();
    const navigate = useNavigate();

    const environments: ShortInfoWithEnvironment[] = applications;

    const handleEnvironmentClick = (application: ShortInfoWithEnvironment) => {
        const href = generatePath(redirectTo, {
            applicationId: application.id,
            environment: application.environment,
        });

        setCurrentEnvironment(application.environment);
        setCurrentApplicationId(application.id);
        navigate(href);
    };

    return (
        <Stack sx={{ width: 1, height: 1, minHeight: '100vh', alignItems: 'center', justifyContent: 'center' }}>
            <Paper sx={{ width: 400, p: 2, textAlign: 'center' }}>
                <Typography variant='h1' my={2}>Pick an environment</Typography>

                <Stack>
                    {environments.map(application =>
                        <Button
                            key={`${application.name} ${application.environment}`}
                            label={`${application.name} ${application.environment}`}
                            onClick={() => handleEnvironmentClick(application)}
                        />
                    )}
                </Stack>
            </Paper>
        </Stack>
    );
};
