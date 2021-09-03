// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { Create as Microservice } from '../microservice/Microservice';
import { HttpResponseApplications2 } from '../api/api';

type Props = {
    environment: string;
    application: HttpResponseApplications2;
};

export const MicroserviceNewScreen: React.FunctionComponent<Props> = (props) => {
    const _props = props!;
    return (
        <>
            <Microservice
                application={_props.application}
                environment={_props.environment}
            />
        </>
    );
};
