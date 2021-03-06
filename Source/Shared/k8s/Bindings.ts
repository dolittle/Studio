// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { container } from 'tsyringe';
import { constructor } from '@dolittle/vanir-dependency-inversion';

import { IApplicationNamespaces } from './IApplicationNamespaces';
import { ApplicationNamespaces } from './ApplicationNamespaces';
import { IMicroserviceResources } from './IMicroserviceResources';
import { MicroserviceResources } from './MicroserviceResources';

export class Bindings {
    static initialize() {
        container.registerSingleton(IApplicationNamespaces as constructor<IApplicationNamespaces>, ApplicationNamespaces);
        container.registerSingleton(IMicroserviceResources as constructor<IMicroserviceResources>, MicroserviceResources);

        // By instantiating this, it will start watching for the data
        container.resolve(IApplicationNamespaces as constructor<IApplicationNamespaces>);
    }
}
