// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import 'reflect-metadata';

import { Guid } from '@dolittle/rudiments';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { container } from 'tsyringe';

import { Bindings as PortalBindings, Navigation, ToolbarItems, ToolbarItem, NavigationButton, NavigationGroup, NavigationActionBar } from '@shared/portal';
import { Bindings as MVVMBindings } from '@shared/mvvm';
import { Bindings as PlatformBindings } from '@shared/platform';

import '@shared/styles/theme';
import './index.scss';
// import { Overview } from './Overview';
import { CreateApplication } from './CreateApplication';
import { Bindings } from './Bindings';
import { AssignMicroservice } from './AssignMicroservice';
import { ApplicationToolbarItems } from './ApplicationToolbarItems';
import { ApplicationModel } from './ApplicationModel';
import { NavigationStructure } from './NavigationStructure';
import { AllApplicationsQuery } from './AllApplicationsQuery';

export default function App(this: any) {
    Bindings.initialize();
    MVVMBindings.initialize();
    PortalBindings.initialize();
    PlatformBindings.initialize();

    const [showCreateApplicationDialog, setShowCreateApplicationDialog] = useState(false);
    const [showAssignMicroserviceDialog, setShowAssignMicroserviceDialog] = useState(false);
    const [selectedApplications, setSelectedApplications]= useState<ApplicationModel[]>([]);
    const [allApplications, setAllApplications]= useState<ApplicationModel[]>([]);

    const allApplicationsQuery = container.resolve(AllApplicationsQuery);

    useEffect(() => {
        const id = Guid.create().toString();
        const subscription = allApplicationsQuery.items.subscribe((apps) =>{
            setAllApplications(apps);
        });
        return () => {
            subscription.unsubscribe();
        };
    },[allApplications]);



    return (
        <>
            <NavigationStructure
                applications={allApplications}
                handleNavbarActionButtonClick={() => setShowCreateApplicationDialog(true)}
            />
            <ApplicationToolbarItems
                onCreateApplicationClicked={() => setShowCreateApplicationDialog(true)}
                onAssignMicroserviceClicked={() => setShowAssignMicroserviceDialog(true)}
            />
            <CreateApplication
                visible={showCreateApplicationDialog}
                onCreated={() => setShowCreateApplicationDialog(false)}
                onCancelled={() => setShowCreateApplicationDialog(false)}
            />
            <AssignMicroservice
                forApplication={selectedApplications[0]}
                visible={showAssignMicroserviceDialog}
                onAssigned={() => setShowAssignMicroserviceDialog(false)}
                onCancelled={() => setShowAssignMicroserviceDialog(false)}
            />
        </>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
