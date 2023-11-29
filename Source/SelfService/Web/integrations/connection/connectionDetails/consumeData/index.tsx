// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { ConsumeDataRestAPIView } from './consumeDataRestAPI';
import { ConsumeDataEventStreamsView } from './consumeDataEventStreams';

export const ConsumeDataView = () =>
    <>
        <ConsumeDataRestAPIView />
        <ConsumeDataEventStreamsView />
    </>;
