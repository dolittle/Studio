// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ActionBarActionTriggered } from '@shared/portal';

export interface ActionBarProps {
    title: string;
    icon?: string;
    onClick: ActionBarActionTriggered;
}
