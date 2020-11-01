// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToolbarItem } from '@shared/portal/toolbar';
import { IMessenger } from '@shared/mvvm';
import { injectable, singleton } from 'tsyringe';
import { ToolbarItemsChanged } from '@shared/portal/toolbar/ToolbarItemsChanged';

@singleton()
@injectable()
export class ToolbarItems {
    readonly items: ReplaySubject<ToolbarItem[]> = new ReplaySubject();

    constructor(private readonly _messenger: IMessenger) {
        _messenger.observe(ToolbarItemsChanged).pipe(
            map(_ => _.items.map(i => new ToolbarItem(i.text, i.icon, () => {}, i.id))
        )).subscribe(_ => this.items.next(_));
    }

    reset() {
        this.items.next([]);
    }
}
