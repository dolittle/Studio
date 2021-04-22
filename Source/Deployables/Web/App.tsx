// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { CreateApplication } from './CreateApplication';
import { AssignMicroservice } from './AssignMicroservice';
import { AppViewModel } from './AppViewModel';
import { RouteComponentProps } from 'react-router-dom';

import { ActionBar, Toolbar, ToolbarItem } from '@shared/components';
import { withViewModel, MicroserviceRoute, Routing } from '@dolittle/vanir-react';

import { AllApplications } from './applications/AllApplications';
import { ApplicationDetails } from './applications/ApplicationDetails';
import { MicroserviceDetails } from './microservices/MicroserviceDetails';
import { routes } from './routing';
import { ApplicationForListing } from './ApplicationForListing';
import { MicroserviceForListing } from './MicroserviceForListing';

import '@shared/styles/theme';
import './index.scss';

export const App = withViewModel(AppViewModel, ({ viewModel }) => {
    const [showCreateApplicationDialog, setShowCreateApplicationDialog] = useState(false);
    const [showAssignMicroserviceDialog, setShowAssignMicroserviceDialog] = useState(false);

    return (
        <>
            <Toolbar>
                <ToolbarItem
                    title='Assign microservice'
                    icon='AppIconDefaultAdd'
                    onClick={() => setShowAssignMicroserviceDialog(true)}
                />
            </Toolbar>

            <ActionBar
                title='New Application'
                icon='Add'
                onTriggered={() => setShowCreateApplicationDialog(true)}
            />

            <CreateApplication
                visible={showCreateApplicationDialog}
                onCreated={() => setShowCreateApplicationDialog(false)}
                onCancelled={() => setShowCreateApplicationDialog(false)}
            />
            <AssignMicroservice
                forApplication={viewModel.selectedApplication}
                visible={showAssignMicroserviceDialog}
                onAssigned={() => setShowAssignMicroserviceDialog(false)}
                onCancelled={() => setShowAssignMicroserviceDialog(false)}
            />

            <Routing>
                <MicroserviceRoute
                    exact
                    path={routes.allApplications.route}
                    render={() => (
                        <AllApplications applications={viewModel.applications} />
                    )}
                />
                <MicroserviceRoute
                    exact
                    path={routes.applicationDetails.route}
                    render={(
                        routeProps: any
                    ) => (
                        <ApplicationDetails
                            applicationForListing={resolveApplication(
                                viewModel.applications,
                                routeProps.match.params.applicationId!
                            )}
                            {...routeProps.match.params}
                        />
                    )}
                />
                <MicroserviceRoute
                    exact
                    path={routes.microserviceDetails.route}
                    render={(routeProps: any) => (
                        <MicroserviceDetails
                            microserviceForListing={resolveMicroservice(
                                viewModel.applications!,
                                routeProps.match.params.applicationId!,
                                routeProps.match.params.microserviceId!
                            )}
                            {...routeProps.match.params}
                        />
                    )}
                />
            </Routing>
        </>
    );
});


function resolveApplication(
    applications: ApplicationForListing[],
    applicationId: string
): ApplicationForListing | undefined {
    return applications.find((a) => a.id.toString() === applicationId);
}

function resolveMicroservice(
    applications: ApplicationForListing[],
    applicationId: string,
    microserviceId: string,
): MicroserviceForListing | undefined {
    return applications
        .find((a) => a.id.toString() === applicationId)
        ?.microservices.find((m) => m.id.toString() === microserviceId);
}
