// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useSnackbar } from 'notistack';
import Input from '@mui/material/Input';
import { Theme } from '@mui/material/styles';

import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';

import { ButtonText } from '../../theme/buttonText';
import { getAzureDevopsKubernetesServiceAccount, getContainerRegistry } from '../../api/cicd';
import { Info } from '../../stores/documentationInfo';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiInput-input.Mui-disabled': {
                color: theme.palette.text.secondary
            }
        }
    })
);

type Props = {
    info: Info
};

export const Doc: React.FunctionComponent<Props> = (props) => {
    const classes = useStyles();
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
            <h2>Endpoints</h2>
            <h3>Cluster</h3>

            <Input
                fullWidth={true}
                className={classes.root}
                defaultValue={clusterEndpoint}
                disabled
                inputProps={{ 'aria-label': 'cluster endpoint' }} />

            <h3>Container Registry</h3>
            <Input className={classes.root}
                fullWidth={true}
                defaultValue={containerRegistry}
                disabled
                inputProps={{ 'aria-label': 'container registry endpoint' }} />


            <h2>Credentials</h2>
            <h3>Get credentials to deploy to the platform from the pipeline</h3>
            {buttonServiceAccount}

            <h3>Get credentials to push to container registry</h3>
            {buttonContainerRegistry}
        </>
    );
};

