// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Application } from '@dolittle/vanir-common';
import { injectable } from 'tsyringe';
import { Applications } from '../Applications';

@injectable()
export class ApplicationViewModel {
    application: Application;

    constructor(applications: Applications) {
        applications.current.subscribe(_ => this.application = _);
    }
}