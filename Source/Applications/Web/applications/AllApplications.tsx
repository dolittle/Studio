// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { withViewModel } from '@dolittle/vanir-react';
import { AllApplicationsViewModel } from './AllApplicationsViewModel';
import { Link } from '@fluentui/react';
import { ApplicationForListing } from '../ApplicationForListing';
import { routes } from '../routing';

export interface AllApplicationsProps {
    applications: ApplicationForListing[];
}

export const AllApplications = withViewModel<
    AllApplicationsViewModel,
    AllApplicationsProps
>(AllApplicationsViewModel, ({ viewModel, props }) => {
    return (
        <>
            <h1>Applications:</h1>
            <ul>
                {props.applications.map((a) => (
                    <li key={a.id.toString()}>
                        <Link
                            href={
                                '/_/applications' +
                                routes.applicationDetails.generate({
                                    applicationId: a.id.toString(),
                                })
                            }
                        >
                            {a.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
});
