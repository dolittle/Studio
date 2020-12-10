// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Bindings as AppBindings } from './Bindings';
import React from 'react';

import { initializeFrontend, VersionInfo } from '@shared/web';

const versionInfo = require('../version.json') as VersionInfo;

export const Bootstrapped: React.FC = ({ children }: { children?: React.ReactNode }) => {
    initializeFrontend({
        name: 'Applications',
        prefix: '/_/applications',
        versionInfo
    });

    AppBindings.initialize();

    return (<>{children}</>);
};