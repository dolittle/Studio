// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState, useRef } from 'react';
import { Route, BrowserRouter, useParams, useLocation } from 'react-router-dom';

import { getApplication, HttpResponseApplications2 } from '../api';

import { ApplicationOverviewScreen } from './applicationOverviewScreen';
import { MicroserviceNewScreen } from './microserviceNewScreen';

import { MicroserviceEditScreen } from './microserviceEditScreen';
import { MicroserviceViewScreen } from './microserviceViewScreen';
import { ContainerRegistryInfoScreen } from './containerRegistryInfoScreen';
import { PodViewScreen } from './podViewScreen';

import { EnvironmentNewScreen } from './environmentNewScreen';
import { EnvironmentChanger } from '../application/environment';
import { uriWithAppPrefix } from '../store';


export const ApplicationScreen: React.FunctionComponent = () => {
    const { environment } = useParams() as any;

    const location = useLocation();
    console.log('top', location);
    console.log('environment', environment);


    const didMountRef = useRef(location);

    useEffect(() => {
        console.log('useEffect', didMountRef.current);
        console.log('useEffect', location);
    }, [didMountRef, location]);


    console.log(didMountRef.current);
    console.log(location);
    const { applicationId } = useParams() as any;

    const [application, setApplication] = useState({} as HttpResponseApplications2);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        getApplication(applicationId).then(data => {
            setApplication(data);
            setLoaded(true);
        });
    }, []);

    if (!loaded) {
        return null;
    }

    if (application.id === '') {
        return (
            <>
                <h1>Application with this environment not found</h1>
            </>
        );
    }

    return (
        <>
            <h1>ApplicationsScreen</h1>


            <EnvironmentChanger application={application} environment={environment} />

            <Route exact path="/application/:applicationId/environment/create">
                <EnvironmentNewScreen />
            </Route>

            <Route exact path="/application/:applicationId/:environment">
                <ApplicationOverviewScreen application={application} />
            </Route>

            <Route exact path="/application/:applicationId/:environment/container-registry-info">
                <ContainerRegistryInfoScreen />
            </Route>
            <Route exact path="/application/:applicationId/:environment/microservice/create">
                <MicroserviceNewScreen application={application} />
            </Route>
            <Route exact path="/application/:applicationId/:environment/microservice/edit/:microserviceId">
                <MicroserviceEditScreen />
            </Route>
            <Route exact path="/application/:applicationId/:environment/microservice/view/:microserviceId">
                <MicroserviceViewScreen />
            </Route>

            <Route exact path="/application/:applicationId/pod/view/:podName/logs">
                <PodViewScreen />
            </Route>

        </>
    );
};
// 3:20


