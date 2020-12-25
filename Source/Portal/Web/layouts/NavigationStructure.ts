// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ReplaySubject } from 'rxjs';
import { IMessenger } from '@dolittle/vanir-react';
import { NavigationStructureChanged, NavigationGroup } from '@shared/portal';
import { singleton, injectable } from 'tsyringe';

@singleton()
@injectable()
export class NavigationStructure {
    groups: ReplaySubject<NavigationGroup[]> = new ReplaySubject();

    constructor(private readonly _messenger: IMessenger) {
        _messenger.observe(NavigationStructureChanged).subscribe((_) => {
            this.groups.next(_.groups);
        });
    }

    reset() {
        this.groups.next([]);
    }
}
