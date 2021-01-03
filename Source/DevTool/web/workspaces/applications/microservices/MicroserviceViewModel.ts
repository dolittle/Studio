// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { FeatureNavigationDefinition, ToolbarItems } from '../../../components';
import { injectable } from 'tsyringe';
import { Globals } from '../../../Globals';

@injectable()
export class MicroserviceViewModel {
    baseUrl: string = '';

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

            this._navigation.setLinks([
                { name: 'Overview', link: `${this.baseUrl}/overview`},
                { name: 'GraphQL', link: `${this.baseUrl}/graphql`},
                { name: 'Swagger', link: `${this.baseUrl}/swagger`},
                { name: 'Runtime', link: `${this.baseUrl}/runtime`},
                { name: 'Backend', link: `${this.baseUrl}/backend`},
                { name: 'Web', link: `${this.baseUrl}/web`}
            ]);
        }
    }
}
