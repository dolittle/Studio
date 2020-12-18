// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { container } from 'tsyringe';
import { constructor } from '@shared/dependencyinversion';

import { Configuration } from './Configuration';

export class Bindings {
    static initialize() {
        container.registerInstance(Configuration as constructor<Configuration>, new Configuration());
    }
}
