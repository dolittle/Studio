// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Route, useParams, useRouteMatch } from 'react-router-dom';
import { Overview } from './overview';
import { Runtime } from './Runtime';
import { Backend } from './Backend';
import { Web } from './Web';
import { GraphQL } from './GraphQL';
import { Swagger } from './Swagger';
import { MicroserviceProps } from './MicroserviceProps';
import { withViewModel } from '@dolittle/vanir-react';
import { MicroserviceViewModel } from './MicroserviceViewModel';



export const Microservice = withViewModel<MicroserviceViewModel, MicroserviceProps>(MicroserviceViewModel, ({ viewModel, props }) => {
    if (!viewModel.microservice) return (<></>);

    const { path } = useRouteMatch();

    return (
        <>
            <Route exact path={`${path}`}>
                <Overview workspace={props.workspace} application={props.application} microservice={viewModel.microservice} />
            </Route>
            <Route path={`${path}/overview`}>
                <Overview workspace={props.workspace} application={props.application} microservice={viewModel.microservice} />
            </Route>
            <Route path={`${path}/graphql`}>
                <GraphQL application={props.application} microservice={viewModel.microservice} />
            </Route>
            <Route path={`${path}/swagger`}>
                <Swagger application={props.application} microservice={viewModel.microservice} />
            </Route>
            <Route path={`${path}/runtime`}>
                <Runtime />
            </Route>
            <Route path={`${path}/backend`}>
                <Backend />
            </Route>
            <Route path={`${path}/web`}>
                <Web />
            </Route>
        </>
    );
});
