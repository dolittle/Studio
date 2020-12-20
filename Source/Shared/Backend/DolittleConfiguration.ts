// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { RuntimeConfiguration } from './RuntimeConfiguration';

export class DolittleConfiguration {
    runtime: RuntimeConfiguration;

    constructor() {
        this.runtime = new RuntimeConfiguration();
    }
}
