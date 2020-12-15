// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { withViewModel } from '@shared/mvvm';
import { MicroserviceDetailsViewModel } from './MicroserviceDetailsViewModel';

export interface MicroserviceDetailsProps{
    applicationId: string;
    microserviceId: string;
};

export const MicroserviceDetails = withViewModel<MicroserviceDetailsViewModel, MicroserviceDetailsProps>(MicroserviceDetailsViewModel, ({viewModel, props}) => {
    return (
        <>
            <h1>Microservice MicroserviceDetails {props.microserviceId} for Application {props.applicationId}</h1>
        </>
    );
});
