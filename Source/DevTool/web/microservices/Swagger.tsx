// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Application, Microservice } from '@dolittle/vanir-common';
import React from 'react';
import { ExternalContent } from './ExternalContent';

export const Swagger = (props: {application?: Application, microservice?: Microservice}) => {
    return (
        <ExternalContent microservice={props.microservice} application={props.application} path="swagger" api={true}/>
    );
};
