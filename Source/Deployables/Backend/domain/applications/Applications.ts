// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { AggregateRoot, aggregateRoot, on } from '@dolittle/sdk.aggregates';
import { EventSourceId } from '@dolittle/sdk.events';
import { Guid } from '@dolittle/rudiments';
import { ApplicationCreated } from '../../events/applications/ApplicationCreated';
import { BrokenRule } from '@dolittle/vanir-backend';

const ApplicationWithNameAlreadyExists =
    BrokenRule.create('ApplicationWithNameAlreadyExists', 'Application with name "{name}" already exists');

@aggregateRoot('9a487521-12ff-41d4-98cb-c70b961d95df')
export class Applications extends AggregateRoot {

    static readonly global = Guid.parse('ff7a06a5-6165-4be3-8623-75841196e4c8');

    _existingApplications: string[] = [];

    constructor(eventSourceId: EventSourceId) {
        super(eventSourceId);
    }

    createApplication(applicationId: Guid, name: string): void {
        this.failIfApplicationWithNameAlreadyExists(name);
        this.apply(new ApplicationCreated(applicationId.toString(), name));
    }

    @on(ApplicationCreated)
    onApplicationCreated(event: ApplicationCreated) {
        this._existingApplications.push(event.name);
    }

    private failIfApplicationWithNameAlreadyExists(name: string) {
        if (this._existingApplications.some(_ => _ == name)) {
            this.fail(ApplicationWithNameAlreadyExists, { name });
        }
    }
}
