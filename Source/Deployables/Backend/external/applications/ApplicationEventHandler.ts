// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { EventContext } from '@dolittle/sdk.events';
import { eventHandler, handles } from '@dolittle/sdk.events.handling';
import { IEventStore } from '@dolittle/vanir-backend';
import { ApplicationCreated } from '../../events/applications/ApplicationCreated';
import { injectable } from 'tsyringe';

@eventHandler('3ab5b650-0c6f-4606-8fd6-9386334b576a')
@injectable()
export class ApplicationEventHandler {

    constructor(private readonly _eventStore: IEventStore) {
    }

    @handles(ApplicationCreated)
    async applicationCreated(event: ApplicationCreated, eventContext: EventContext): Promise<void> {
    }
}
