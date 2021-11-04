// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useSnackbar } from 'notistack';

import { HttpResponseApplications2 } from '../../api/api';
import { DownloadButton } from '../../theme/downloadButton';
import { getKubernetesServiceAccount, getContainerRegistry } from '../../api/cicd';
type Props = {
    application: HttpResponseApplications2
    info: any
};

export const Doc: React.FunctionComponent<Props> = (props) => {
    const { enqueueSnackbar } = useSnackbar();
    const applicationID = props!.application.id;
    const buttonServiceAccount = <DownloadButton
        onClick={async (event: React.MouseEvent<HTMLElement>) => {
            try {
                const data = await getKubernetesServiceAccount(applicationID);
                await navigator.clipboard.writeText(data);
                enqueueSnackbar('Kubernetes service account copied to clipboard.');
            } catch {
                enqueueSnackbar('Failed to get data.', { variant: 'error' });
            }
        }}
    >
        Copy Credentials to clipboard
    </DownloadButton>;

    const buttonContainerRegistry = <DownloadButton
        onClick={async (event: React.MouseEvent<HTMLElement>) => {
            try {
                const data = await getContainerRegistry(applicationID);
                await navigator.clipboard.writeText(data);
                enqueueSnackbar('Container registry copied to clipboard.');
            } catch {
                enqueueSnackbar('Failed to get data.', { variant: 'error' });
            }
        }}
    >
        Copy Credentials to clipboard
    </DownloadButton>;

    return (
        <>
            <p>Work in progress...</p>

            <h2>Get credentials to deploy to the platform from the pipeline</h2>
            {buttonServiceAccount}

            <h2>Get credentials to push to container registry</h2>
            {buttonContainerRegistry}
        </>
    );
};

