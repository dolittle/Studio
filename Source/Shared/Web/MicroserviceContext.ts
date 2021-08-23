// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { MicroserviceConfiguration } from './MicroserviceConfiguration';

export const MicroserviceContext = React.createContext<MicroserviceConfiguration>({
    name: 'unknown',
    prefix: '',
    version: {
        version: '1.0.0',
        commit: '',
        built: ''
    }
});
