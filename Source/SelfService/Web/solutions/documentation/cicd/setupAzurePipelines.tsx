// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useSnackbar } from 'notistack';
import Input from '@mui/material/Input';


import { ButtonText } from '../../../theme/buttonText';
import { getAzureDevopsKubernetesServiceAccount, getContainerRegistry } from '../../../api/cicd';
import { Info } from '../../stores/documentationInfo';
import { Typography } from '@mui/material';

const styles = {
    '& .MuiInput-input.Mui-disabled': {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        '-webkit-text-fill-color': (theme) => theme.palette.text.secondary
    }
};

type Props = {
    info: Info
};

export const Doc: React.FunctionComponent<Props> = (props) => {
    const { enqueueSnackbar } = useSnackbar();
    const _props = props!;
    const info = _props.info;
    const applicationID = info.applicationId;

    const buttonServiceAccount = <ButtonText
        withIcon={false}
        onClick={async (event: React.MouseEvent<HTMLElement>) => {
            try {
                const data = await getAzureDevopsKubernetesServiceAccount(applicationID);
                await navigator.clipboard.writeText(JSON.stringify(data));
                enqueueSnackbar('Kubernetes service account copied to clipboard.');
            } catch {
                enqueueSnackbar('Failed to get data.', { variant: 'error' });
            }
        }}
    >
        Copy Credentials to clipboard
    </ButtonText>;


    const buttonContainerRegistry = <ButtonText
        withIcon={false}
        onClick={async (event: React.MouseEvent<HTMLElement>) => {
            try {
                const data = await getContainerRegistry(applicationID);
                await navigator.clipboard.writeText(JSON.stringify(data));
                enqueueSnackbar('Container registry copied to clipboard.');
            } catch {
                enqueueSnackbar('Failed to get data.', { variant: 'error' });
            }
        }}
    >
        Copy Credentials to clipboard
    </ButtonText>;

    const clusterEndpoint = info.endpoints.cluster;
    const containerRegistry = info.endpoints.containerRegistry;

    return (
        <>
            <Typography variant='h2' my={2}>Endpoints</Typography>
            <Typography variant='h3' my={2}>Cluster</Typography>

            <Input
                fullWidth={true}
                sx={styles}
                defaultValue={clusterEndpoint}
                disabled
                inputProps={{ 'aria-label': 'cluster endpoint' }} />

            <Typography variant='h3' my={2}>Container Registry</Typography>
            <Input sx={styles}
                fullWidth={true}
                defaultValue={containerRegistry}
                disabled
                inputProps={{ 'aria-label': 'container registry endpoint' }} />


            <Typography variant='h2' my={2}>Credentials</Typography>
            <Typography variant='h3' my={2}>Get credentials to deploy to the platform from the pipeline</Typography>
            {buttonServiceAccount}

            <Typography variant='h3' my={2}>Get credentials to push to container registry</Typography>
            {buttonContainerRegistry}
        </>
    );
};

