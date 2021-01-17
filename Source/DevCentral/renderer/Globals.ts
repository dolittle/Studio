// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Application, Microservice } from '@dolittle/vanir-common';
import { singleton } from 'tsyringe';

import { BehaviorSubject, Observable, Subject, pipe } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Guid } from '@dolittle/rudiments';
import { Workspace } from '../common/workspaces';
import { ApplicationState, InstanceState, RunState } from '../common/applications';
import { ApplicationInstances } from './ApplicationInstances';
import { ApplicationWithMicroservicesState } from './ApplicationWithMicroservicesState';
import { MicroserviceState } from '../common/applications/MicroserviceState';

const NotSetApplication = {
    id: Guid.empty.toString(),
    name: '',
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
    name: '',
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
    readonly applicationInstances: BehaviorSubject<ApplicationInstances[]> = new BehaviorSubject<ApplicationInstances[]>([]);
    readonly microserviceStatesPerApplication: BehaviorSubject<ApplicationWithMicroservicesState[]> = new BehaviorSubject<ApplicationWithMicroservicesState[]>([]);

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

    setMicroserviceState(applicationId: string, state: MicroserviceState) {
        const current = this.microserviceStatesPerApplication.value;

        let applicationMicroservicesState = current.find(_ => _.applicationId === applicationId);
        if (!applicationMicroservicesState) {
            applicationMicroservicesState = {
                applicationId,
                microservices: [state]
            };
            current.push(applicationMicroservicesState);
        } else {
            const existing = applicationMicroservicesState.microservices.find(_ => _.id === state.id);
            if (existing) {
                const index = applicationMicroservicesState.microservices.indexOf(existing);
                applicationMicroservicesState.microservices[index] = state;
            } else {
                applicationMicroservicesState.microservices.push(state);
            }
        }

        this.microserviceStatesPerApplication.next(current);
    }

    reportInstanceStateFor(applicationId: string, instance: InstanceState) {
        const current = this.applicationInstances.value;

        let applicationInstanceState = current.find(_ => _.applicationId === applicationId);
        if (!applicationInstanceState) {
            applicationInstanceState = {
                applicationId,
                instances: [instance]
            };
            current.push(applicationInstanceState);
        } else {
            const existing = applicationInstanceState.instances.find(_ => _.id === instance.id);
            if (existing) {
                const index = applicationInstanceState.instances.indexOf(existing);
                applicationInstanceState.instances[index] = instance;
            } else {
                applicationInstanceState.instances.push(instance);
            }
        }

        this.applicationInstances.next(current);
    }

    removeInstanceFor(applicationId: string, instanceId: string) {
        const current = this.applicationInstances.value.find(_ => _.applicationId === applicationId);
        if (current) {
            current.instances = current.instances.filter(_ => _.id !== instanceId);
            this.applicationInstances.next(this.applicationInstances.value);
        }
    }

    removeAllInstancesFrom(applicationId: string) {
        const current = this.applicationInstances.value.find(_ => _.applicationId === applicationId);
        if (current) {
            current.instances = [];
            this.applicationInstances.next(this.applicationInstances.value);
        };
    }

    applicationStateFor(application: Application): Observable<ApplicationState> {
        const unknown = { id: '', state: RunState.unknown };
        return this.applicationsState.pipe(map(_ => _.find(a => a.id === application?.id) || unknown));
    }

    microserviceStateFor(application: Application, microservice: Microservice): Observable<MicroserviceState> {
        const unknownApp = { applicationId: '', microservices: [] };
        const unknown = { id: '', state: RunState.unknown };
        return this.microserviceStatesPerApplication.pipe(
            map(_ => _.find(m => m.applicationId === application.id) || unknownApp),
            map(_ => _!.microservices.find(m => m.id === microservice.id) || unknown)
        );
    }

    instanceStateFor(application: Application): Observable<InstanceState[]> {
        return this.applicationInstances.pipe(
            map(_ => _.find(i => i.applicationId === application.id)?.instances || [])
        );
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
        this.applicationsState.next(current);
    }
}
