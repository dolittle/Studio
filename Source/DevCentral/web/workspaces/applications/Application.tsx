// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Route, useRouteMatch } from 'react-router-dom';
import { Overview } from './Overview';
import { withViewModel } from '@dolittle/vanir-react';
import { ApplicationViewModel } from './ApplicationViewModel';
import { Mongo } from './Mongo';
import { Ingress } from './Ingress';
import { ApplicationProps } from './ApplicationProps';
import { Microservice } from './microservices/Microservice';

export const Application = withViewModel<ApplicationViewModel, ApplicationProps>(ApplicationViewModel, ({ viewModel, props }) => {
    const { path } = useRouteMatch();

    return (
        <>
            <Route exact path={`${path}`}>
                <Overview workspace={props.workspace} application={props.workspace.application} />
            </Route>
            <Route exact path={`${path}/overview`}>
                <Overview workspace={props.workspace} application={props.workspace.application} />
            </Route>
            <Route exact path={`${path}/mongo`}>
                <Mongo />
            </Route>
            <Route exact path={`${path}/ingress`}>
                <Ingress />
            </Route>
            <Route path={`${path}/microservice/:microserviceId`}>
                <Microservice workspace={props.workspace} application={props.workspace.application} />
            </Route>
        </>
    );
});
