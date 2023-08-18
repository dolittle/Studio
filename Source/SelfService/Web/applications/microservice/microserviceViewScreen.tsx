// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useParams } from 'react-router-dom';

import { HttpResponseApplication } from '../../apis/solutions/application';

import { Overview } from './overview';

export type Props = {
    application: HttpResponseApplication;
};

export const MicroserviceViewScreen = ({ application }: Props) => {
    const { microserviceId, environment } = useParams() as any;

    return <Overview application={application} microserviceId={microserviceId} environment={environment} />;
};
