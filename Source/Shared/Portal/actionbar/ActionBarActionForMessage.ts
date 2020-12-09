// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { Guid } from '@dolittle/rudiments';

export class ActionBarActionForMessage {
    static readonly EMPTY: ActionBarActionForMessage = { id: Guid.empty.toString(), text: '', icon: '' };
    constructor(readonly id: string, readonly text: string, readonly icon: string) {}
}
