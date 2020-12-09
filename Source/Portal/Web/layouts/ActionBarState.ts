// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ReplaySubject } from 'rxjs';
import { IMessenger } from '@shared/mvvm';
import {
    ActionBarStructureChanged,
    ActionBar,
    ActionBarActionWasTriggered,
    ActionBarActionForMessage,
    ActionBarAction,
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

                if(_.actionBar.button != ActionBarActionForMessage.EMPTY) {
                    const actionBar = {
                        placement: _.actionBar.placement,
                        button: new ActionBarAction(
                            _.actionBar.button.text,
                            _.actionBar.button.icon,
                            this._publishActionTriggered.bind(this),
                            _.actionBar.button.id,
                            )
                    } as ActionBar;
                    this.current.next(actionBar);
                }
            });
    }

    reset() {
        this.current.next(undefined);
    }

    private _publishActionTriggered() {
        this._messenger.publish(new ActionBarActionWasTriggered());
    }
}
