// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import { HttpResponseApplication } from '../api/application';

import { Editor as BusinessMomentEditor } from './editor';
import { BusinessMomentsOverview } from './overview';


// I wonder if scss is scoped like svelte. I hope so!
// Not scoped like svelte
import '../application/applicationScreen.scss';

import { useReadable } from 'use-svelte-store';
import { businessmoments, load, isLoaded } from '../stores/businessmoment';
import { microservices } from '../stores/microservice';
import { useRouteApplicationParams } from '../utils/route';


type Props = {
    application: HttpResponseApplication
    environment: string
};

export const BusinessMomentsContainerScreen: React.FunctionComponent<Props> = (props) => {
    const _props = props!;
    const application = _props.application;
    const routeApplicationProps = useRouteApplicationParams();
    const applicationId = routeApplicationProps.applicationId;
    const environment = _props.environment;

    const $microservices = useReadable(microservices) as any[];
    const $businessmoments = useReadable(businessmoments) as any;
    const $isLoaded = useReadable(isLoaded) as boolean;

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!$isLoaded) {
            Promise.all([
                load(applicationId, environment),
            ]).then(values => {
                setLoaded(true);
            });
        } else {
            console.log('Business moments data already loaded');
            setLoaded(true);
        }

    }, []);

    if (!loaded) {
        return null;
    }

    if ($businessmoments.applicationId === '') {
        return null;
    }

    return (
        <>
            <Switch>
                <Route exact path="/business-moments/application/:applicationId/:environment/overview">
                    <BusinessMomentsOverview application={application} businessMoments={$businessmoments} microservices={$microservices} environment={environment} />
                </Route>

                <Route exact path="/business-moments/application/:applicationId/:environment/editor/:businessMomentId/microservice/:microserviceId">
                    <BusinessMomentEditor application={application} businessMoments={$businessmoments} />
                </Route>
            </Switch>
        </>
    );
};
