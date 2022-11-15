// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useHistory } from 'react-router-dom';

import { getServerUrlPrefix } from '../../../api/api';
import { HttpResponseApplication } from '../../../api/application';

import { MicroserviceStore } from '../../../stores/microservice';

import { Box, Divider, Grid, Typography } from '@mui/material';

import { ButtonText } from '../../../theme/buttonText';
import { DownloadButton } from '../../../theme/downloadButton';
import { DownloadButtons } from '../../components/downloadButtons';

import { LiveIngressView } from '../../base/liveIngressView';

import { SetupSection } from './setupSection';
import { FilesSection } from './filesSection';

export type ConfigurationProps = {
    application: HttpResponseApplication;
    applicationId: string;
    environment: string;
    microserviceId: string;
    currentMicroservice: MicroserviceStore;
};

const styles = {
    divider: {
        backgroundColor: '#3B3D48'
    }
};

export const Configuration = ({
    application, applicationId, environment, microserviceId, currentMicroservice }: ConfigurationProps) => {

    const history = useHistory();

    // This is reused. consider moving
    const configMapPrefix = `${environment.toLowerCase()}-${currentMicroservice.name.toLowerCase()}`;

    const handleEnvironmentClick = async () => {
        const href = `/microservices/application/${applicationId}/${environment}/view/${microserviceId}/environment-variables`;
        history.push(href);
    };

    return (
        <>
            <SetupSection
                application={application}
                applicationId={applicationId}
                environment={environment}
                currentMicroservice={currentMicroservice}
                microserviceId={microserviceId}
            />

            <FilesSection
                applicationId={applicationId}
                environment={environment}
                microserviceName={currentMicroservice.name}
                microserviceId={microserviceId}
            />

            <Divider sx={styles.divider} />

            <Box ml={2}>
                <LiveIngressView urls={currentMicroservice.live.ingressUrls} paths={currentMicroservice.live.ingressPaths} />
            </Box>

            <Box ml={2}>
                <ButtonText
                    onClick={handleEnvironmentClick}>
                    Manage environment variables
                </ButtonText>

                <DownloadButtons
                    environment={environment}
                    microserviceName={currentMicroservice.name}
                    applicationId={applicationId}
                />
            </Box>

            <Divider sx={styles.divider} />

            <Box ml={2}>
                <Typography variant='h2' my={2}>Configuration files</Typography>

                <Grid container spacing={3}>
                    <Grid item>
                        <DownloadButton
                            onClick={(event: React.MouseEvent<HTMLElement>) => {
                                const configMapName = `${configMapPrefix}-config-files`;
                                const href = `${getServerUrlPrefix()}/live/application/${applicationId}/configmap/${configMapName}?download=1&fileType=yaml`;
                                window.open(href, '_blank');
                            }}
                        >
                            Download config files yaml
                        </DownloadButton>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};
