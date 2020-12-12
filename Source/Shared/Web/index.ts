// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Bindings } from './Bindings';
import { Bindings as PortalBindings } from '@shared/portal';
import { Bindings as MVVMBindings } from '@shared/mvvm';
import { Bindings as PlatformBindings } from '@shared/platform';
import { Configuration } from './Configuration';

export * from './Bootstraper';

export * from './DataSource';
export * from './VersionInfo';

export function initializeFrontend(configuration: Configuration) {
    Bindings.initialize(configuration);
    MVVMBindings.initialize();
    PortalBindings.initialize();
    PlatformBindings.initialize();
}