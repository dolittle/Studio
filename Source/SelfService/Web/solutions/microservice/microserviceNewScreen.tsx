// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { DeployableMicroservicesList } from './deployableMicroservicesList';

import { HttpResponseApplication } from '../../api/solutions/application';

type MicroserviceNewScreenProps = {
    environment: string;
    application: HttpResponseApplication;
};

export const MicroserviceNewScreen = ({ application, environment }: MicroserviceNewScreenProps) =>
    <DeployableMicroservicesList application={application} environment={environment} />;
