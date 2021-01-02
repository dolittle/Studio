// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { singleton } from 'tsyringe';

import { BehaviorSubject } from 'rxjs';
import { Workspace } from '../common/workspaces';

const NotSet = {
    path: ''
} as Workspace;

@singleton()
export class Workspaces {
    _current?: Workspace;
    readonly current: BehaviorSubject<Workspace> = new BehaviorSubject(NotSet);

    constructor() {
        this.current.subscribe(_ => this._current = _);
    }

    setCurrent(workspace: Workspace) {
        if (this._current !== workspace) {
            this.current.next(workspace);
        }
    }
}
