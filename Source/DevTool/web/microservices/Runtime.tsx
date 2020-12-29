// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { LogOutput } from './LogOutput';
import { withViewModel } from '@dolittle/vanir-react';
import { RuntimeViewModel } from './RuntimeViewModel';


export const Runtime = withViewModel(RuntimeViewModel, ({ viewModel }) => {
    return (
        <LogOutput terminalReady={viewModel.terminalReady} />
    );
});