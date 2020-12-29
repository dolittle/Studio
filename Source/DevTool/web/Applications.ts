// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Application } from '@dolittle/vanir-common';
import { singleton } from 'tsyringe';

import { BehaviorSubject } from 'rxjs';
import { Guid } from '@dolittle/rudiments';

const NotSet = {
    id: Guid.empty.toString(),
    name: 'Not Set'
} as Application;

@singleton()
export class Applications {
    _current?: Application;
    readonly current: BehaviorSubject<Application> = new BehaviorSubject(NotSet);

    constructor() {
        this.current.subscribe(_ => this._current = _);
    }

    setCurrent(application: Application) {
        if (this._current !== application) {
            this.current.next(application);
        }
    }
}