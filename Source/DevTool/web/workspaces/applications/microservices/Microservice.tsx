// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Route, useParams, useRouteMatch } from 'react-router-dom';
import { Overview } from './Overview';
import { Runtime } from './Runtime';
import { Backend } from './Backend';
import { Web } from './Web';
import { GraphQL } from './GraphQL';
import { Swagger } from './Swagger';
import { MicroserviceProps } from './MicroserviceProps';
import { withViewModel } from '@dolittle/vanir-react';
import { MicroserviceViewModel } from './MicroserviceViewModel';

type MicroserviceRouteParams = {
    microserviceId: string;
};

const NotSet = { id: '', name: 'NotSet', version: '', commit: '', built: '' };

export const Microservice = withViewModel<MicroserviceViewModel, MicroserviceProps>(MicroserviceViewModel, ({ viewModel, props }) => {
    const { path, url } = useRouteMatch();
    const params = useParams<MicroserviceRouteParams>();
    const microservice = props.workspace.microservices.find(_ => _.id === params.microserviceId) || NotSet;
    viewModel.setBaseURL(url);

    return (
        <>
            <Route exact path={`${path}`}>
                <Overview workspace={props.workspace} application={props.application} microservice={microservice} />
            </Route>
            <Route path={`${path}/overview`}>
                <Overview workspace={props.workspace} application={props.application} microservice={microservice} />
            </Route>
            <Route path={`${path}/graphql`}>
                <GraphQL application={props.application} microservice={microservice} />
            </Route>
            <Route path={`${path}/swagger`}>
                <Swagger application={props.application} microservice={microservice} />
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
