// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { Route, useParams } from 'react-router-dom';

import { HttpResponseApplications2 } from '../api/api';

import { Editor as BusinessMomentEditor } from './editor';
import { BusinessMomentsOverview } from './Overview';


// I wonder if scss is scoped like svelte. I hope so!
// Not scoped like svelte
import '../application/applicationScreen.scss';

import { useReadable } from 'use-svelte-store';
import { businessmoments, load, isLoaded } from '../stores/businessmoment';
import { microservices } from '../stores/microservice';

type Props = {
    application: HttpResponseApplications2
};

export const BusinessMomentsContainerScreen: React.FunctionComponent<Props> = (props) => {
    const _props = props!;
    const application = _props.application;
    const { environment, applicationId } = useParams() as any;
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
            <Route exact path="/application/:applicationId/:environment/business-moments">
                <BusinessMomentsOverview application={application} businessMoments={$businessmoments} microservices={$microservices} />
            </Route>

            <Route exact path="/application/:applicationId/:environment/business-moments/editor/:businessMomentId/microservice/:microserviceId">
                <BusinessMomentEditor application={application} businessMoments={$businessmoments} />
            </Route>
        </>
    );
};
