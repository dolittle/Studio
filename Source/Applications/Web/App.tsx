// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import '@shared/styles/theme';
import './index.scss';
import { CreateApplication } from './CreateApplication';
import { AssignMicroservice } from './AssignMicroservice';
import { withViewModel } from '@shared/mvvm';
import { AppViewModel } from './AppViewModel';
import { BrowserRouter as Router, Link, Switch, Route, RouteComponentProps } from 'react-router-dom';

import { ActionBar, Toolbar, ToolbarItem } from '@shared/components';
import { AllApplications } from './applications/AllApplications';
import { ApplicationDetails } from './applications/ApplicationDetails';
import { MicroserviceDetails } from './microservices/MicroserviceDetails';
import { baseurl, routes } from './routing';
import { ApplicationForListingModel } from './ApplicationForListingModel';

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

            <Router basename={baseurl}>
                <Switch>
                    <Route
                        exact
                        path={routes.allApplications.route}
                        render={() => (
                            <AllApplications applications={viewModel.applications} />
                        )}
                    />
                    <Route
                        exact
                        path={routes.applicationDetails.route}
                        render={(
                            routeProps: RouteComponentProps<{ applicationId: string }>
                        ) => (
                            <ApplicationDetails
                                applicationForListing={resolveApplication(
                                    viewModel.applications,
                                    routeProps.match.params.applicationId
                                )}
                                {...routeProps.match.params}
                            />
                        )}
                    />
                    <Route
                        exact
                        path={routes.microserviceDetails.route}
                        render={(routeProps) => (
                            <MicroserviceDetails {...routeProps.match.params} />
                        )}
                    />
                </Switch>
            </Router>
        </>
    );
});


function resolveApplication(
    applications: ApplicationForListingModel[],
    applicationId: string
): ApplicationForListingModel | undefined {
    return applications.find((a) => a.id.toString() === applicationId);
}