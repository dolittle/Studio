// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Application, IApplications } from '@shared/platform';
import { ToolbarItem, ToolbarItems } from '@shared/portal';
import { injectable } from 'tsyringe';

@injectable()
export class SampleViewModel {
    constructor(private readonly _applications: IApplications, private readonly _toolbarItems: ToolbarItems) {
        _toolbarItems.setItems([
            new ToolbarItem('Create application', 'Add', () => alert('Lets create'))
        ]);
    }

    async create() {
        const result = await this._applications.create(new Application());
        console.log(`Result : ${result.message}`);
    }
}
