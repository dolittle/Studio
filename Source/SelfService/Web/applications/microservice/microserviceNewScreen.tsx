// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { DeployableMicroservicesList } from './deployableMicroservicesList';

import { HttpResponseApplication } from '../../apis/solutions/application';

type MicroserviceNewScreenProps = {
    application: HttpResponseApplication;
};

export const MicroserviceNewScreen = ({ application }: MicroserviceNewScreenProps) =>
    <DeployableMicroservicesList application={application} />;
