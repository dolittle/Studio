// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useParams } from 'react-router-dom';
import { HttpResponseApplication } from '../../apis/solutions/application';
import { Overview } from './overview';

type Props = {
    environment: string
    application: HttpResponseApplication
};

export const MicroserviceViewScreen = (props: Props) => {
    const { microserviceId } = useParams() as any;

    return <Overview application={props!.application} environment={props!.environment} microserviceId={microserviceId} />;
};
