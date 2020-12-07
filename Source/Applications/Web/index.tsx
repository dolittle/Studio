// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import 'reflect-metadata';

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { container } from 'tsyringe';


import '@shared/styles/theme';
import './index.scss';
import { CreateApplication } from './CreateApplication';
import { Bindings } from './Bindings';
import { AssignMicroservice } from './AssignMicroservice';
import { ApplicationToolbarItems } from './ApplicationToolbarItems';
import { ApplicationModel } from './ApplicationModel';
import { NavigationStructure } from './NavigationStructure';
import { AllApplicationsQuery } from './AllApplicationsQuery';

export default function App(this: any) {

    const [showCreateApplicationDialog, setShowCreateApplicationDialog] = useState(false);
    const [showAssignMicroserviceDialog, setShowAssignMicroserviceDialog] = useState(false);
    const [selectedApplications, setSelectedApplications]= useState<ApplicationModel[]>([]);
    const [allApplications, setAllApplications]= useState<ApplicationModel[]>([]);

    const allApplicationsQuery = container.resolve(AllApplicationsQuery);

    useEffect(() => {
        const subscription = allApplicationsQuery.items.subscribe((apps) =>{
            setAllApplications(apps);
        });
        return () => {
            subscription.unsubscribe();
        };
    },[allApplications]);


import { Bootstrapped } from './BootStrapped';

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

ReactDOM.render(
    <Bootstrapped>
        <App />
    </Bootstrapped>,
    document.getElementById('root')
);
export default Bootstrapped;
