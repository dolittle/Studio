// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { withViewModel } from '@dolittle/vanir-react';
import { ToolbarViewModel } from './ToolbarViewModel';
import { ToolbarProps } from './ToolbarProps';

export const Toolbar = withViewModel<ToolbarViewModel, ToolbarProps>(ToolbarViewModel, ({ viewModel, props }) => {
    return (<></>)
});

