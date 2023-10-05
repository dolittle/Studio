// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { HttpResponseApplication } from '../../../../../apis/solutions/application';

import { MicroserviceStore } from '../../../../stores/microservice';

import { ConfigurationsIndex } from './Configurations';
import { ConfigurationFilesIndex } from './configurationFiles';
import { EnvironmentVariableIndex } from './environmentVariable';

export type ConfigurationIndexProps = {
    application: HttpResponseApplication;
    currentMicroservice: MicroserviceStore;
};

export const ConfigurationIndex = ({ application, currentMicroservice }: ConfigurationIndexProps) => (
    <>
        <ConfigurationsIndex application={application} currentMicroservice={currentMicroservice} />
        <ConfigurationFilesIndex applicationId={application.id} currentMicroservice={currentMicroservice} />
        <EnvironmentVariableIndex applicationId={application.id} currentMicroservice={currentMicroservice} />
    </>
);
