// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useReadable } from 'use-svelte-store';

import { getPodStatus, HttpResponsePodStatus } from '../api/api';
import { microservices } from '../stores/microservice';
import { View as BaseView } from './base/view';
import { View as BusinessMomentsAdaptorView } from './businessMomentsAdaptor/view';
import { View as RawDataLogView } from './rawDataLog/view';

type Props = {
    applicationId: string
    environment: string
    microserviceId: string
};

export const Overview: React.FunctionComponent<Props> = (props) => {
    const $microservices = useReadable(microservices) as any;
    const history = useHistory();
    const _props = props!;
    const applicationId = _props.applicationId;
    const microserviceId = _props.microserviceId;
    const environment = _props.environment;

    // Want microservice name
    const [podsData, setPodsData] = useState({
        namespace: '',
        microservice: {
            name: '',
            id: ''
        },
        pods: []
    } as HttpResponsePodStatus);
    const [loaded, setLoaded] = useState(false);
    const currentMicroservice = $microservices.find(ms => ms.id === microserviceId);
    if (!currentMicroservice) {
        const href = `/application/${applicationId}/${environment}/microservices/overview`;
        history.push(href);
        return null;
    }

    useEffect(() => {
        Promise.all([
            getPodStatus(applicationId, environment, microserviceId)
        ]).then(values => {
            setPodsData(values[0]);
            setLoaded(true);
        });
    }, []);


    if (!loaded) {
        return null;
    }

    let kind = currentMicroservice.kind;
    if (kind === '') {
        // Hack
        console.log(currentMicroservice);
        if (
            currentMicroservice &&
            currentMicroservice.live &&
            currentMicroservice.live.images &&
            currentMicroservice.live.images[0] &&
            currentMicroservice.live.images[0].image &&
            currentMicroservice.live.images[0].image === '453e04a74f9d42f2b36cd51fa2c83fa3.azurecr.io/dolittle/platform/platform-api:dev-x'
        ) {
            kind = 'raw-data-log-ingestor';
        }


    }

    switch (kind) {
        case 'simple':
            return (
                <>
                    <BaseView applicationId={applicationId} environment={environment} microserviceId={microserviceId} podsData={podsData} />
                </>
            );

        case 'business-moments-adaptor':
            return (
                <>
                    <BusinessMomentsAdaptorView applicationId={applicationId} environment={environment} microserviceId={microserviceId} podsData={podsData} />
                </>
            );
        case 'raw-data-log-ingestor':
            return (
                <>
                    <RawDataLogView applicationId={applicationId} environment={environment} microserviceId={microserviceId} podsData={podsData} />
                </>
            );
        default:
            return (
                <>
                    <h1>Not supported</h1>
                </>
            );
    }

};
