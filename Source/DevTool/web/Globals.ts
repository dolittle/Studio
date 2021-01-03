// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Application, Microservice } from '@dolittle/vanir-common';
import { singleton } from 'tsyringe';

import { BehaviorSubject } from 'rxjs';
import { Guid } from '@dolittle/rudiments';
import { Workspace } from '../common/workspaces';

const NotSetApplication = {
    id: Guid.empty.toString(),
    name: 'Not Set',
    tenant: '',
    license: '',
    containerRegistry: '',
    portal: {
        enabled: true,
        id: ''
    },
    microservices: []
} as Application;

const NotSetMicroservice = {
    id: Guid.empty.toString(),
    name: 'Not Set',
    version: '',
    commit: '',
    built: ''
} as Microservice;

const NotSetWorkspace = new Workspace(Guid.empty.toString(), '', NotSetApplication);

@singleton()
export class Globals {
    readonly title: BehaviorSubject<string> = new BehaviorSubject('');
    readonly application: BehaviorSubject<Application> = new BehaviorSubject(NotSetApplication);
    readonly microservice: BehaviorSubject<Microservice> = new BehaviorSubject(NotSetMicroservice);
    readonly workspace: BehaviorSubject<Workspace> = new BehaviorSubject(NotSetWorkspace);

    setTitle(title: string) {
        if (this.title.value !== title) {
            this.title.next(title);
        }
    }

    setApplication(application: Application) {
        if (this.application.value.id !== application.id) {
            this.application.next(application);
        }
    }

    setMicroservice(microservice: Microservice) {
        if (this.microservice.value.id !== microservice.id) {
            this.microservice.next(microservice);
        }
    }

    setWorkspace(workspace: Workspace) {
        if (this.workspace.value.id !== workspace.id) {
            this.workspace.next(workspace);
        }
    }
}
