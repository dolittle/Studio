// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { withViewModel } from '@shared/mvvm';
import { AllApplicationsViewModel } from './AllApplicationsViewModel';
import { Link } from 'react-router-dom';
import { ApplicationForListingModel } from '../ApplicationForListingModel';

export interface AllApplicationsProps {
    applications: ApplicationForListingModel[];
};

export const AllApplications = withViewModel<
    AllApplicationsViewModel,
    AllApplicationsProps
>(AllApplicationsViewModel, ({ viewModel, props }) => {
    return (
        <>
            <h1>Applications</h1>
            <ul>
                {props.applications.map((a) => (
                    <Link key={a.id.toString()} to={a.id.toString()}>
                        {a.name}
                    </Link>
                ))}
            </ul>
        </>
    );
});
