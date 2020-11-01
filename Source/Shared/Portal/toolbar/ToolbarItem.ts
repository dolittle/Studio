// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';
import { BehaviorSubject } from 'rxjs';

export type ToolbarItemClicked = () => void;

export class ToolbarItem {
    readonly enabled: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    readonly id: string;

    constructor(readonly text: string, readonly icon?: string, readonly click?: ToolbarItemClicked, id?: string) {
        this.id = id || Guid.create().toString();
    }
}