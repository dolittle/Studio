// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ActionBarForMessage } from './ActionBarForMessage';
import { ActionBarActionForMessage } from './ActionBarActionForMessage';

export class ActionBarStructureChanged {
    actionBar: ActionBarForMessage = {
        placement: 'bottom',
        button: ActionBarActionForMessage.EMPTY,
    };
}
