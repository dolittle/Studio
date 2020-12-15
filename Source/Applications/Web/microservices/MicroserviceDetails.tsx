// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { withViewModel } from '@shared/mvvm';
import { MicroserviceDetailsViewModel } from './MicroserviceDetailsViewModel';
import { MicroserviceForListing } from '../MicroserviceForListing';
const microservice_mock = require('./microservice_dashboard_mock.jpg').default;

export interface MicroserviceDetailsProps{
    applicationId: string;
    microserviceId: string;
    microserviceForListing?: MicroserviceForListing
};

export const MicroserviceDetails = withViewModel<MicroserviceDetailsViewModel, MicroserviceDetailsProps>(MicroserviceDetailsViewModel, ({viewModel, props}) => {
    return (
        <>
            <h1>{props.microserviceForListing?.name}</h1>
            <h3>{props.microserviceForListing?.id}</h3>
            <div>
                <img src={microservice_mock} style={{width:'100%'}}></img>
            </div>
        </>
    );
});
