// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Application, Microservice } from '@dolittle/vanir-common';
import { singleton } from 'tsyringe';

import { BehaviorSubject, Observable, Subject, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { Guid } from '@dolittle/rudiments';
import { Workspace } from '../common/workspaces';
import { ApplicationState, RunState } from '../common/applications';

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
    readonly applicationsState: BehaviorSubject<ApplicationState[]> = new BehaviorSubject<ApplicationState[]>([]);
    readonly applicationState: Subject<ApplicationState> = new Subject<ApplicationState>();

    constructor() {
        this.applicationState.subscribe(_ => this.handleApplicationState(_));
    }

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

    setApplicationState(applicationState: ApplicationState) {
        this.applicationState.next(applicationState);
    }

    applicationStateFor(application: Application): Observable<ApplicationState> {
        const unknown = { id: '', state: RunState.unknown };
        return this.applicationsState.pipe(map(_ => _.find(a => a.id === application?.id) || unknown));
    }

    private handleApplicationState(applicationState: ApplicationState) {
        const current = this.applicationsState.value;

        const existing = current.find(_ => _.id === applicationState.id);
        if (existing) {
            const index = current.indexOf(existing);
            current[index] = applicationState;
        } else {
            current.push(applicationState);
        }
        console.log(current);
        this.applicationsState.next(current);
    }
}
