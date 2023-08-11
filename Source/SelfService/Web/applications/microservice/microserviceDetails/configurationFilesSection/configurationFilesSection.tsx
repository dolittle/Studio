// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { HttpResponseApplication } from '../../../../apis/solutions/application';

import { MicroserviceStore } from '../../../stores/microservice';

import { SetupSection } from './setupSection/setupSection';
import { FilesSection } from './filesSection/filesSection';
import { EnvironmentVariablesSection } from './environmentSection/environmentVariableSection';

export type ConfigurationFilesSectionProps = {
    application: HttpResponseApplication;
    applicationId: string;
    microserviceId: string;
    currentMicroservice: MicroserviceStore;
};

export const ConfigurationFilesSection = ({ application, applicationId, microserviceId, currentMicroservice }: ConfigurationFilesSectionProps) => (
    <>
        <SetupSection
            application={application}
            applicationId={applicationId}
            currentMicroservice={currentMicroservice}
            microserviceId={microserviceId}
        />

        <FilesSection
            applicationId={applicationId}
            currentMicroservice={currentMicroservice}
            microserviceId={microserviceId}
        />

        <EnvironmentVariablesSection
            applicationId={applicationId}
            currentMicroservice={currentMicroservice}
            microserviceId={microserviceId}
        />
    </>
);
