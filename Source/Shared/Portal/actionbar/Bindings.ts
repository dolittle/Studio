// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { container } from 'tsyringe';
import { ActionBarBroker } from './ActionBarBroker';

export class Bindings {
    static initialize() {
        container.registerSingleton(ActionBarBroker);
    }
}