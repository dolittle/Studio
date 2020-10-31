// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { container } from 'tsyringe';

import { IContainer } from './IContainer';

export class Container implements IContainer {
    get<T>(source: Function & { prototype: T; }): T {
        return container.resolve<T>(source as any);
    }
}