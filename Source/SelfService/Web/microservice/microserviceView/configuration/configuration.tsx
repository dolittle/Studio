// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useHistory } from 'react-router-dom';

import { HttpResponseApplication } from '../../../api/application';

import { MicroserviceStore } from '../../../stores/microservice';

import { Box, Divider } from '@mui/material';

import { ButtonText } from '../../../theme/buttonText';
import { DownloadButton } from '../../../theme/downloadButton';
import { DownloadButtons } from '../../components/downloadButtons';

import { LiveIngressView } from '../../base/liveIngressView';

import { SetupSection } from './editSection/editSection';
import { FilesSection } from './filesSection/filesSection';
import { EnvironmentVariablesSection } from './environmentVariablesSection/environmentVariableSection';

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

            <EnvironmentVariablesSection
                applicationId={applicationId}
                environment={environment}
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
        </>
    );
};
