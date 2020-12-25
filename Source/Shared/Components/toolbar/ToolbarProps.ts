// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { ToolbarItemProps } from './ToolbarItemProps';

export interface ToolbarProps {
    children?: React.ReactElement<ToolbarItemProps>[] | React.ReactElement<ToolbarItemProps>;
}
