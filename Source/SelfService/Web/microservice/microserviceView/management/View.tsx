// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, {} from 'react';

import { View as BuildResults} from './buildResults/View';
import { useRuntimeManagementAvailable } from './useRuntimeManagement';

export type ViewProps = {
    applicationId: string;
    environment: string;
    microserviceId: string;
};

export const View = (props: ViewProps) => {
    const buildResultsAvailable = useRuntimeManagementAvailable(props.applicationId, props.environment, props.microserviceId);
    return (
        <>
            {buildResultsAvailable
                ? <BuildResults applicationId={props.applicationId} environment={props.environment} microserviceId={props.microserviceId}/>
                : <h2>There are not any management endpoints on your microservice.</h2>
            }
        </>
    );
};
