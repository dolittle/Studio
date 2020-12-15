// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { withViewModel } from '@shared/mvvm';
import { ApplicationDetailsViewModel } from './ApplicationDetailsViewModel';
import { RouteComponentProps } from 'react-router-dom';

export interface ApplicationDetailsProps{
    applicationId: string
};

export const ApplicationDetails = withViewModel<ApplicationDetailsViewModel, ApplicationDetailsProps>(ApplicationDetailsViewModel, ({viewModel, props}) => {
    return (
        <>
            <h1>Microservice ApplicationDetails {props.applicationId}</h1>
        </>
    );
});
