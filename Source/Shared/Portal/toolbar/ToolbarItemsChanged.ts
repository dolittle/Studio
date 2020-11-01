// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ToolbarItemForMessage } from './ToolbarItemForMessage';

export class ToolbarItemsChanged {
    constructor(readonly items: ToolbarItemForMessage[]) {
    }
}