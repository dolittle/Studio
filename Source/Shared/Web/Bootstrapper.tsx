// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { initializeFrontend } from './index';
import { VersionInfo } from './VersionInfo';

export interface BootstrapperProps {
    name: string;
    prefix: string;
    version: VersionInfo;
    children?: React.ReactNode;
}

export const Bootstrapper = (props: BootstrapperProps) => {
    initializeFrontend({
        name: props.name,
        prefix: props.prefix,
        versionInfo: props.version
    });

    return (<>{props.children}</>);
};