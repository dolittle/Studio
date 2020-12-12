// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { ToolbarViewModel } from '@shared/components/Toolbar/ToolbarViewModel';
import { withViewModel } from '@shared/mvvm';
import { ToolbarProps } from './ToolbarProps';

export const Toolbar = withViewModel<ToolbarViewModel, ToolbarProps>(ToolbarViewModel, ({ viewModel, props }) => {
    return (<></>)
});

