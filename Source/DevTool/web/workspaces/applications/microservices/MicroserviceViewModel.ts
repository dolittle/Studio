// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { FeatureNavigationDefinition, Link, ToolbarItems } from '../../../components';
import { injectable } from 'tsyringe';
import { Globals } from '../../../Globals';
import { Application, Microservice } from '@dolittle/vanir-common';
import { MicroserviceState, RunState } from '../../../../common/applications';
import { MicroserviceProps } from './MicroserviceProps';
import { Workspace } from '../../../../common/workspaces';
import { RouteInfo } from '@dolittle/vanir-react';

const NotSet: Microservice = { id: '', name: 'NotSet', version: '', commit: '', built: '', web: true };

type MicroserviceRouteParams = {
    microserviceId: string;
};


@injectable()
export class MicroserviceViewModel {
    microserviceState: MicroserviceState = { id: '', state: RunState.unknown };
    private _workspace: Workspace;
    private _application: Application;
    microservice?: Microservice;

    constructor(
        private readonly _navigation: FeatureNavigationDefinition,
        private readonly _toolbarItems: ToolbarItems,
        private readonly _globals: Globals) {
    }

    attached() {
        this._toolbarItems.setItems([]);
    }

    propsChanged(props: MicroserviceProps) {
        this._workspace = props.workspace;
        this._application = props.application;
    }

    paramsChanged(params: MicroserviceRouteParams, routeInfo: RouteInfo) {
        this.microservice = this._workspace.microservices.find(_ => _.id === params.microserviceId) || NotSet;
        this._globals.setTitle(`${this._application.name} / ${this.microservice.name}`);
        this._globals.microserviceStateFor(this._application, this.microservice).subscribe(_ => {
            this.microserviceState = _;
            this.setLinks(routeInfo.url);
        });
    }

    setLinks(baseUrl: string) {
        const links: Link[] = [];

        links.push({ name: 'Overview', link: `${baseUrl}/overview` });

        switch (this.microserviceState.state) {
            case RunState.starting:
            case RunState.running: {
                links.push({ name: 'GraphQL', link: `${baseUrl}/graphql` });
                links.push({ name: 'Swagger', link: `${baseUrl}/swagger` });
                links.push({ name: 'Runtime', link: `${baseUrl}/runtime` });
                links.push({ name: 'Backend', link: `${baseUrl}/backend` });
                links.push({ name: 'Web', link: `${baseUrl}/web` });
            } break;
        }

        this._navigation.setLinks(links);
    }
}
