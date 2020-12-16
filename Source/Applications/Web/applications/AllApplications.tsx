// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { withViewModel } from '@shared/mvvm';
import { AllApplicationsViewModel } from './AllApplicationsViewModel';
import { Link } from 'react-router-dom';
import { ApplicationForListing } from '../ApplicationForListing';
import { routes } from '../routing';

export interface AllApplicationsProps {
    applications: ApplicationForListing[];
};

export const AllApplications = withViewModel<
    AllApplicationsViewModel,
    AllApplicationsProps
>(AllApplicationsViewModel, ({ viewModel, props }) => {
    return (
        <>
            <h1>Applications:</h1>
            <ul>
                {props.applications.map((a) => (
                    <Link
                        key={a.id.toString()}
                        to={routes.applicationDetails.generate({ applicationId: a.id.toString() })}
                    >
                        {a.name}
                    </Link>
                ))}
            </ul>
        </>
    );
});
