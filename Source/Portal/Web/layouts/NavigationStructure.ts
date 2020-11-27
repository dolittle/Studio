// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IMessenger } from '@shared/mvvm';
import {
    NavigationStructureChanged,
    NavigationButton,
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
            .pipe(
                map((_) =>
                    _.actionBar
                        ? {
                              groups: _.groups,
                              actionBar: {
                                  placement: _.actionBar?.placement,
                                  button: new NavigationButton(
                                      _.actionBar?.button.text,
                                      _.actionBar?.button.icon,
                                      () => {},
                                      _.actionBar?.button.id
                                  ),
                              } as NavigationActionBar,
                          }
                        : _
                )
            )
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
