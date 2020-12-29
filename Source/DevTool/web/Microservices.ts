// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Microservice } from '@dolittle/vanir-common';
import { singleton } from 'tsyringe';

import { BehaviorSubject } from 'rxjs';
import { Guid } from '@dolittle/rudiments';

const NotSet = {
    id: Guid.empty.toString(),
    name: 'Not Set'
} as Microservice;

@singleton()
export class Microservices {
    _current?: Microservice;
    readonly current: BehaviorSubject<Microservice> = new BehaviorSubject(NotSet);

    constructor() {
        this.current.subscribe(_ => this._current = _);
    }

    setCurrent(microservice: Microservice) {
        if (this._current !== microservice) {
            this.current.next(microservice);
        }
    }
}