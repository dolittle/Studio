// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { INavigator } from './INavigator';
import { injectable } from 'tsyringe';
import { IMessenger } from '@shared/mvvm';
import { NavigatedTo  } from './NavigatedTo';

@injectable()
export class Navigator implements INavigator {
    constructor(private readonly _messenger: IMessenger, private readonly _history: History) {
    }

    navigateTo(path: string): void {
        this._messenger.publish(new NavigatedTo(path));
        this._history.pushState({}, '', path);
    }
}
