// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useHistory, Route } from 'react-router-dom';
import {
    Link,
} from '@fluentui/react';

import { HttpResponseApplication } from '../api/application';
import { RuntimeV1Stats } from './runtimeStatsV1/runtimeV1Stats';
import { Typography } from '@mui/material';

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
                <Typography variant='h2' my={2}>Explore application: {application.name}</Typography>

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
                <Typography variant='h1' my={2}>Runtime Insights</Typography>
                <Typography variant='h2' my={2}>Useful for debugging</Typography>
                <RuntimeV1Stats application={application} environment={environment} />
            </Route>
        </>
    );
};
