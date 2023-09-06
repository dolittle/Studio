// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { } from 'react';
import { SetupContainer } from './setup/SetupContainer';
import { ConfigurationContainer } from './configuration/ConfigurationContainer';
import { DataSyncConfigurationContainer } from './realtimeUpdates/DataSyncConfigurationContainer';

export const ConfigurationView = () => {

    return (
        <>
            <SetupContainer />
            {/* TODO: Only show configuration section after the deployment type is set ? */}
            <ConfigurationContainer />
            <DataSyncConfigurationContainer />
        </>
    );
};
