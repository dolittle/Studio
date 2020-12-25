// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { injectable } from 'tsyringe';
import { filter } from 'rxjs/operators';
import {
    ActionBar,
    ActionBarAction,
    ActionBarActionForMessage,
    ActionBarActionWasTriggered,
    ActionBarStructureChanged,
} from '@shared/portal';
import { IMessenger } from '@dolittle/vanir-react';

@injectable()
export class ActionBarViewModel {
    actionBar?: ActionBar;

    constructor(private readonly _messenger: IMessenger) {}
    activate() {
        this._messenger
            .observe(ActionBarStructureChanged)
            .pipe(filter((_) => _.actionBar.button !== ActionBarActionForMessage.EMPTY))
            .subscribe((_) => {
                const actionBar = {
                    placement: _.actionBar.placement,
                    button: new ActionBarAction(
                        _.actionBar.button.text,
                        _.actionBar.button.icon,
                        this._publishActionTriggered.bind(this),
                        _.actionBar.button.id
                    ),
                } as ActionBar;
                this.actionBar = actionBar;
            });
    }

    private _publishActionTriggered() {
        this._messenger.publish(new ActionBarActionWasTriggered());
    }
}
