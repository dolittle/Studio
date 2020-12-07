// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Bindings as AppBindings} from './Bindings';
import { Bindings as PortalBindings } from '@shared/portal';
import { Bindings as MVVMBindings } from '@shared/mvvm';
import { Bindings as PlatformBindings } from '@shared/platform';
import React from 'react';

export const Bootstrapped: React.FC = ({children}: {children?: React.ReactNode}) => {
    AppBindings.initialize();
    MVVMBindings.initialize();
    PortalBindings.initialize();
    PlatformBindings.initialize();

    return(<>{children}</>);
};