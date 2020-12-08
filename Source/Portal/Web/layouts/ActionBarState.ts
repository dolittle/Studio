// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ReplaySubject } from 'rxjs';
import { IMessenger } from '@shared/mvvm';
import {
    ActionBarStructureChanged,
    ActionBar,
    ActionButtonWasTriggered,
} from '@shared/portal';
import { singleton, injectable } from 'tsyringe';

@singleton()
@injectable()
export class ActionBarState {
    current: ReplaySubject<ActionBar | undefined> = new ReplaySubject();

    constructor(private readonly _messenger: IMessenger) {
        _messenger
            .observe(ActionBarStructureChanged)
            .subscribe((_) => {
                this.current.next(_.actionBar as ActionBar | undefined);
            });
    }

    reset() {
        this.current.next(undefined);
    }

    actionButtonTriggered() {
        this._messenger.publish(new ActionButtonWasTriggered());
    }
}
