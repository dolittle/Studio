// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Application } from '@dolittle/vanir-common';
export abstract class IApplicationLoader {
    abstract existsInFolder(folder: string): boolean;
    abstract loadFromFolder(folder: string): Promise<Application>;
}


