// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { useHistory, useParams, Route } from 'react-router-dom';

import {
    Link,
} from '@fluentui/react';

import { HttpResponseApplications2 } from '../api/api';
import { RuntimeV1Stats } from './runtimeV1Stats';

type Props = {
    application: HttpResponseApplications2
};

export const InsightsContainerScreen: React.FunctionComponent<Props> = (props) => {
    const history = useHistory();
    const _props = props!;
    const application = _props.application;
    const { environment } = useParams() as any;

    return (
        <>


            <Route exact path="/application/:applicationId/:environment/insights/overview">
                <h1>Hello I am Insights</h1>
                <h2>Explore application: {application.name}</h2>

                <Link underline onClick={() => {
                    const href = `/application/${application.id}/${environment}/insights/runtime-v1`;
                    history.push(href);
                }}>
                    Runtime Stats
                </Link>

            </Route>

            <Route exact path="/application/:applicationId/:environment/insights/runtime-v1">
                <Link underline onClick={() => {
                    const href = `/application/${application.id}/${environment}/insights/overview`;
                    history.push(href);
                }}>
                    Back
                </Link>
                <h1>Runtime Insights</h1>
                <h2>Useful for debugging</h2>
                <RuntimeV1Stats application={application} />
            </Route>

        </>
    );
};
