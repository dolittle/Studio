// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { ConsumeDataRestAPIIndex } from './consumeDataRestAPI';
import { ConsumeDataEventStreamsIndex } from './consumeDataEventStreams';

export const ConsumeDataView = () =>
    <>
        <ConsumeDataRestAPIIndex />
        <ConsumeDataEventStreamsIndex />
    </>;
