// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { RestApiContainer } from './RestAPI';
import { AsyncApiContainer } from './asyncApi';

export const ConsumeDataView = () =>
    <>
        <RestApiContainer />
        <AsyncApiContainer />
    </>;
