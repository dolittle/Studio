// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { withViewModel } from '@shared/mvvm';
import { ApplicationDetailsViewModel } from './ApplicationDetailsViewModel';
import { ApplicationForListing } from '../ApplicationForListing';
import { Link } from 'react-router-dom';
import { routes } from '../routing';

export interface ApplicationDetailsProps {
    applicationId: string;
    applicationForListing?: ApplicationForListing;
}

export const ApplicationDetails = withViewModel<
    ApplicationDetailsViewModel,
    ApplicationDetailsProps
>(ApplicationDetailsViewModel, ({ viewModel, props }) => {
    return (
        <>
            <h1>{props.applicationForListing?.name}</h1>
            <h3>{props.applicationId}</h3>

            <h2>Microservices:</h2>
            <ul>
                {props.applicationForListing?.microservices.map((m) => (
                    <Link
                        key={m.id.toString()}
                        to={routes.microserviceDetails.generate({
                            applicationId: props.applicationForListing!.id.toString(),
                            microserviceId: m.id.toString(),
                        })}
                    >
                        {m.name}
                    </Link>
                ))}
            </ul>
        </>
    );
});
