// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Bindings as NavigationBindings } from '@dolittle/vanir-web/dist/navigation/Bindings';
import { Bindings as ActionBarBindings } from './actionbar/Bindings';
export class Bindings {
    static initialize() {
        NavigationBindings.initialize();
        ActionBarBindings.initialize();
    }
}
