// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useParams } from 'react-router-dom';
import { HttpResponseApplications2 } from '../api/api';
import { Overview } from './view';

type Props = {
    environment: string
    application: HttpResponseApplications2
};

export const MicroserviceViewScreen: React.FunctionComponent<Props> = (props) => {

    const { microserviceId } = useParams() as any;
    return (
        <>
            <Overview applicationId={props!.application.id} environment={props!.environment} microserviceId={microserviceId} />
        </>
    );
};
