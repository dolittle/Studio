// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { LogOutput } from '../../../components/LogOutput/LogOutput';
import { RunningInstanceType } from '../../../../common/applications/index';

export const Runtime = () =>{
    return (
        <LogOutput instance={RunningInstanceType.Runtime} />
    );
};
