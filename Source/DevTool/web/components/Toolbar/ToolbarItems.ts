// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { singleton, injectable } from 'tsyringe';
import { BehaviorSubject } from 'rxjs';
import { ToolbarItem } from './ToolbarItem';


@singleton()
@injectable()
export class ToolbarItems {
    readonly current: BehaviorSubject<ToolbarItem[]> = new BehaviorSubject<ToolbarItem[]>([]);

    setItems(items: ToolbarItem[]) {
        this.current.next(items);
    }
}
