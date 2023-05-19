// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { HttpResponseApplication } from '../../../../apis/solutions/application';

import { MicroserviceStore } from '../../../stores/microservice';

import { SetupSection } from './setupSection/setupSection';
import { FilesSection } from './filesSection/filesSection';
import { EnvironmentVariablesSection } from './environmentSection/environmentVariableSection';

type ConfigurationFilesSectionProps = {
    application: HttpResponseApplication;
    applicationId: string;
    environment: string;
    microserviceId: string;
    currentMicroservice: MicroserviceStore;
};

export const ConfigurationFilesSection = (
    { application, applicationId, environment, microserviceId, currentMicroservice }: ConfigurationFilesSectionProps) => (
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
            microserviceName={currentMicroservice.name}
            microserviceId={microserviceId}
        />
    </>
);
