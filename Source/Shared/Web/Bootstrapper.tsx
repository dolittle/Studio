// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { initializeFrontend } from './index';
import { VersionInfo } from './VersionInfo';
import { MicroserviceContext } from './MicroserviceContext';
import { container } from 'tsyringe';
import { MicroserviceConfiguration } from './MicroserviceConfiguration';
import { BrowserRouter as Router } from 'react-router-dom';

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

    const configuration = new MicroserviceConfiguration(props.name, props.prefix, props.version);
    container.registerInstance(MicroserviceConfiguration, configuration);

    return (
        <>
            <Router>
                <MicroserviceContext.Provider value={configuration}>
                    {props.children}
                </MicroserviceContext.Provider>
            </Router>
        </>
    );
};