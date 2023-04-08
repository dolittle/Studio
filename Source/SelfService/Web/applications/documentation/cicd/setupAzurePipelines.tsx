// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useSnackbar } from 'notistack';

import { Input, Typography } from '@mui/material';

import { Button } from '@dolittle/design-system';

import { getAzureDevopsKubernetesServiceAccount, getContainerRegistry } from '../../../apis/solutions/cicd';
import { Info } from '../../stores/documentationInfo';

export type DocProps = {
    info: Info;
};

export const Doc = ({ info }: DocProps) => {
    const { enqueueSnackbar } = useSnackbar();

    const applicationID = info.applicationId;

    const handleKubernetesAccountCopy = async (event: React.MouseEvent<HTMLElement>) => {
        try {
            const data = await getAzureDevopsKubernetesServiceAccount(applicationID);
            await navigator.clipboard.writeText(JSON.stringify(data));
            enqueueSnackbar('Kubernetes service account copied to clipboard.');
        } catch {
            enqueueSnackbar('Failed to get data.', { variant: 'error' });
        }
    };

    const handleContainerRegistryCopy = async (event: React.MouseEvent<HTMLElement>) => {
        try {
            const data = await getContainerRegistry(applicationID);
            await navigator.clipboard.writeText(JSON.stringify(data));
            enqueueSnackbar('Container registry copied to clipboard.');
        } catch {
            enqueueSnackbar('Failed to get data.', { variant: 'error' });
        }
    };

    const clusterEndpoint = info.endpoints.cluster;
    const containerRegistry = info.endpoints.containerRegistry;

    return (
        <>
            <Typography variant='h2' my={2}>Endpoints</Typography>
            <Typography variant='h3' my={2}>Cluster</Typography>

            <Input
                fullWidth={true}
                defaultValue={clusterEndpoint}
                disabled
                inputProps={{ 'aria-label': 'cluster endpoint' }}
            />

            <Typography variant='h3' my={2}>Container Registry</Typography>
            <Input
                fullWidth={true}
                defaultValue={containerRegistry}
                disabled
                inputProps={{ 'aria-label': 'container registry endpoint' }}
            />

            <Typography variant='h2' my={2}>Credentials</Typography>
            <Typography variant='h3' my={2}>Get credentials to deploy to the platform from the pipeline</Typography>
            <Button label='Copy Credentials to clipboard' endWithIcon='CopyAllRounded' onClick={handleKubernetesAccountCopy} />

            <Typography variant='h3' my={2}>Get credentials to push to container registry</Typography>
            <Button label='Copy Credentials to clipboard' endWithIcon='CopyAllRounded' onClick={handleContainerRegistryCopy} />
        </>
    );
};
