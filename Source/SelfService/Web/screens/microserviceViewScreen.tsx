// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useParams } from 'react-router-dom';
import { Overview } from '../microservice/view/overview';

export const MicroserviceViewScreen: React.FunctionComponent = () => {
    const { applicationId, environment, microserviceId } = useParams() as any;
    return (
        <>
            <Overview applicationId={applicationId} environment={environment} microserviceId={microserviceId} />
        </>
    );
};
