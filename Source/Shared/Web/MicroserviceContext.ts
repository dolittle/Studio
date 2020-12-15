// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { BootstrapperProps } from './Bootstrapper';
import React from 'react';

export const MicroserviceContext = React.createContext<BootstrapperProps>({
    name: 'unknown',
    prefix: '',
    version: {
        version: '1.0.0',
        commit: '',
        built: ''
    }
});
