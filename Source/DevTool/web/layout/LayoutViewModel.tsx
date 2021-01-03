// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { injectable } from 'tsyringe';
import { Globals } from '../Globals';

@injectable()
export class LayoutViewModel {
    title: string = '';

    constructor(globals: Globals) {
        globals.title.subscribe(_ => this.title = _);
    }
}
