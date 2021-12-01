// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useHistory, useParams, Route } from 'react-router-dom';
import {
    Link,
} from '@fluentui/react';

import { HttpResponseApplication } from '../api/api';
import { RuntimeV1Stats } from './runtimeStatsV1/runtimeV1Stats';

type Props = {
    application: HttpResponseApplication
    environment: string
};

export const InsightsContainerScreen: React.FunctionComponent<Props> = (props) => {
    const history = useHistory();
    const _props = props!;
    const application = _props.application;
    const environment = _props.environment;

    return (
        <>
            <Route exact path="/insights/application/:applicationId/:environment/overview">
                <h2>Explore application: {application.name}</h2>

                <Link underline onClick={() => {
                    const href = `/insights/application/${application.id}/${environment}/runtime-v1`;
                    history.push(href);
                }}>
                    Runtime Stats
                </Link>
            </Route>
            <Route exact path="/insights/application/:applicationId/:environment/runtime-v1">
                <Link underline onClick={() => {
                    const href = `/insights/application/${application.id}/${environment}/overview`;
                    history.push(href);
                }}>
                    Back
                </Link>
                <h1>Runtime Insights</h1>
                <h2>Useful for debugging</h2>
                <RuntimeV1Stats application={application} environment={environment} />
            </Route>
        </>
    );
};
