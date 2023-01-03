// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Create } from './create';

import { HttpResponseApplication } from '../api/application';

type MicroserviceNewScreenProps = {
    environment: string;
    application: HttpResponseApplication;
};

export const MicroserviceNewScreen = ({ application, environment }: MicroserviceNewScreenProps) =>
    <Create application={application} environment={environment} />;
