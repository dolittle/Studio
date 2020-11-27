// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ReplaySubject } from 'rxjs';
import { IMessenger } from '@shared/mvvm';
import {
    NavigationStructureChanged,
    NavigationActionBar,
    NavigationGroup,
    NavigationButtonWasClicked,
} from '@shared/portal';
import { singleton, injectable } from 'tsyringe';

@singleton()
@injectable()
export class NavigationStructure {
    groups: ReplaySubject<NavigationGroup[]> = new ReplaySubject();
    actionBar: ReplaySubject<NavigationActionBar | undefined> = new ReplaySubject();

    constructor(private readonly _messenger: IMessenger) {
        _messenger
            .observe(NavigationStructureChanged)
            .subscribe((_) => {
                this.groups.next(_.groups);
                this.actionBar.next(_.actionBar as NavigationActionBar | undefined);
            });
    }

    reset() {
        this.groups.next([]);
        this.actionBar.next(undefined);
    }

    navigationActionButtonClicked() {
        this._messenger.publish(new NavigationButtonWasClicked());
    }
}
