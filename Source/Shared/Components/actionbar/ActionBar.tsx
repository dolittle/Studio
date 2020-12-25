// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { ActionBarViewModel } from './ActionBarViewModel';
import { withViewModel } from '@dolittle/vanir-react';
import { ActionBarProps } from './ActionBarProps';

export const ActionBar = withViewModel<ActionBarViewModel, ActionBarProps>(ActionBarViewModel, ({ viewModel, props }) => {
    return (<></>)
});

