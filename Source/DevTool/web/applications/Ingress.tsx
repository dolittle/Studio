// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { RunningInstanceType } from '../../common/applications/index';
import { LogOutput } from '../components/LogOutput/LogOutput';

export const Ingress = () => {
    return (
        <>
            <LogOutput instance={RunningInstanceType.Ingress} />
        </>
    );
};
