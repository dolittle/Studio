// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { FeatureNavigationDefinition, Link, ToolbarItems } from '../../../components';
import { injectable } from 'tsyringe';
import { Globals } from '../../../Globals';
import { Application, Microservice } from '@dolittle/vanir-common';
import { MicroserviceState, RunState } from '../../../../common/applications';

@injectable()
export class MicroserviceViewModel {
    baseUrl: string = '';
    microserviceState: MicroserviceState = { id: '', state: RunState.unknown };

    constructor(
        private readonly _navigation: FeatureNavigationDefinition,
        private readonly _toolbarItems: ToolbarItems,
        private readonly _globals: Globals) {
    }

    activate() {
        this._toolbarItems.setItems([]);
    }

    setTitle(title: string) {
        this._globals.setTitle(title);
    }

    setBaseURL(url: string) {
        if (url !== this.baseUrl) {
            this.baseUrl = url;
            this.setLinks();
        }
    }

    setMicroservice(application: Application, microservice: Microservice) {
        this._globals.microserviceStateFor(application, microservice).subscribe(_ => {
            this.microserviceState = _;
            this.setLinks();
        });
    }

    setLinks() {
        const links: Link[] = [];

        links.push({ name: 'Overview', link: `${this.baseUrl}/overview` });

        switch (this.microserviceState.state) {
            case RunState.starting:
            case RunState.running: {
                links.push({ name: 'GraphQL', link: `${this.baseUrl}/graphql` });
                links.push({ name: 'Swagger', link: `${this.baseUrl}/swagger` });
                links.push({ name: 'Runtime', link: `${this.baseUrl}/runtime` });
                links.push({ name: 'Backend', link: `${this.baseUrl}/backend` });
                links.push({ name: 'Web', link: `${this.baseUrl}/web` });
            } break;
        }

        this._navigation.setLinks(links);
    }
}
