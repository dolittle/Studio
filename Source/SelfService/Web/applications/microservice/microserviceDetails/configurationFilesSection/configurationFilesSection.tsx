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
    currentMicroservice: MicroserviceStore;
};

export const ConfigurationFilesSection = ({ application, applicationId, currentMicroservice }: ConfigurationFilesSectionProps) => (
    <>
        <SetupSection application={application} currentMicroservice={currentMicroservice} />
        <FilesSection applicationId={applicationId} currentMicroservice={currentMicroservice} />
        <EnvironmentVariablesSection applicationId={applicationId} currentMicroservice={currentMicroservice} />
    </>
);
