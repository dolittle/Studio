// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { constructor } from '@shared/dependencyinversion';
import { container } from 'tsyringe';
import { IMessenger } from './IMessenger';
import { Messenger } from './Messenger';

export class Bindings {
    static initialize() {
        container.registerSingleton(IMessenger as constructor<IMessenger>, Messenger);
    }
}