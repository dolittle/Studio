// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { injectable } from 'tsyringe';
import { FeatureNavigationDefinition } from './FeatureNavigationDefinition';

@injectable()
export class FeatureNavigationLinksViewModel {

    constructor(readonly definition: FeatureNavigationDefinition) {
    }

}
