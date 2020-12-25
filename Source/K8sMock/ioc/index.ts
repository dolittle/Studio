// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IocContainer } from 'tsoa';
import { constructor } from '@dolittle/vanir-dependency-inversion';
import { container } from 'tsyringe';

class Container implements IocContainer {
    get<T>(controller: { prototype: T }): T {
        return container.resolve(controller as constructor<T>);
    }
}

const iocContainer = new Container();
export { iocContainer };
