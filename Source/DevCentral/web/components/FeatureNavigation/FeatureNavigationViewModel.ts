// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { injectable } from 'tsyringe';
import { Link } from './Link';
import { FeatureNavigationDefinition } from './FeatureNavigationDefinition';

@injectable()
export class FeatureNavigationViewModel {
    links: Link[] = [];

    constructor(definition: FeatureNavigationDefinition) {
        definition.current.subscribe(_ => this.links = _);
    }
}
