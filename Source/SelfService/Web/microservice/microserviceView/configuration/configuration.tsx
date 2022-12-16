// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { HttpResponseApplication } from '../../../api/application';

import { MicroserviceStore } from '../../../stores/microservice';

import { SetupSection } from './setupSection/setupSection';
import { FilesSection } from './filesSection/filesSection';
import { EnvironmentVariablesSection } from './environmentVariablesSection/environmentVariableSection';

export type ConfigurationProps = {
    application: HttpResponseApplication;
    applicationId: string;
    environment: string;
    microserviceId: string;
    currentMicroservice: MicroserviceStore;
};

export const Configuration = ({ application, applicationId, environment, microserviceId, currentMicroservice }: ConfigurationProps) => (
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
