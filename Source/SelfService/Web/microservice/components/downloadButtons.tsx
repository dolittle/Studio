// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Grid } from '@mui/material';
import { getServerUrlPrefix } from '../../api/api';
import { DownloadButton } from '../../theme/downloadButton';

interface Props {
    applicationId: string
    environment: string
    microserviceName: string
}


export const DownloadButtons: React.FunctionComponent<Props> = (props) => {
    const _props = props!;
    const applicationId = _props.applicationId;
    const configMapPrefix = `${_props.environment.toLowerCase()}-${_props.microserviceName.toLowerCase()}`;

    return (
        <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
        >
            <DownloadButton
                onClick={(event: React.MouseEvent<HTMLElement>) => {
                    const secretName = `${configMapPrefix}-secret-env-variables`;
                    const href = `${getServerUrlPrefix()}/live/application/${applicationId}/secret/${secretName}?download=1&fileType=yaml`;
                    window.open(href, '_blank');
                }}
            >
                Download secret env-variables yaml
            </DownloadButton>

            <DownloadButton
                onClick={(event: React.MouseEvent<HTMLElement>) => {
                    const configMapName = `${configMapPrefix}-config-files`;
                    const href = `${getServerUrlPrefix()}/live/application/${applicationId}/configmap/${configMapName}?download=1&fileType=yaml`;
                    window.open(href, '_blank');
                }}
            >
                Download config files yaml
            </DownloadButton>

            <DownloadButton
                onClick={(event: React.MouseEvent<HTMLElement>) => {
                    const configMapName = `${configMapPrefix}-env-variables`;
                    const href = `${getServerUrlPrefix()}/live/application/${applicationId}/configmap/${configMapName}?download=1&fileType=yaml`;
                    window.open(href, '_blank');
                }}
            >
                Download env-variables yaml
            </DownloadButton>
        </Grid>
    );
};
