// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { container } from 'tsyringe';
import { IFileSystem } from './IFileSystem';
import { FileSystem } from './FileSystem';
import { constructor } from '@dolittle/vanir-dependency-inversion';

export class Bindings {
    static initialize() {
        container.registerSingleton(IFileSystem as constructor<IFileSystem>, FileSystem);
    }
}
