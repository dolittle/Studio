// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { Guid } from '@dolittle/rudiments';
import { ApplicationModel } from './ApplicationModel';

export class OverviewViewModel {
    items: ApplicationModel[] = [];

    activate() {
        this.items = [
            {
                id: Guid.create().toString(),
                name: 'My application',
            },
            {
                id: Guid.create().toString(),
                name: 'My  other application',
            },
        ];
    }
}
