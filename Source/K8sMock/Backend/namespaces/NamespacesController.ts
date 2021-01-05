// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Controller, Get, Route, Tags, Query } from 'tsoa';
import { V1NamespaceList, V1ListMeta, V1Namespace, V1ObjectMeta, V1NamespaceSpec, V1NamespaceStatus } from '@kubernetes/client-node';

import { Guid } from '@dolittle/rudiments';

@Route('api/v1/namespaces')
@Tags('core_v1')
export class NamespacesController extends Controller {
    private readonly _namespaces: V1NamespaceList;

    constructor() {
        super();
        this._namespaces = this.createNamespaceList();
    }

    @Get()
    async getNamespaces(@Query() watch?: boolean): Promise<V1NamespaceList> {
        if (watch) {
            await new Promise(_ => {});
        }
        return this._namespaces;
    }

    private createNamespaceList(): V1NamespaceList {
        const list = new V1NamespaceList();
        list.apiVersion = 'v1';
        list.kind = 'NamespaceList';

        const metadata = list.metadata = new V1ListMeta();
        metadata.selfLink = '/api/v1/namespaces';
        metadata.resourceVersion = `${Math.ceil(Math.random() * 1e6)}`;

        list.items = [];

        list.items.push(this.createNamespace(
            'application-853ebea1-1e6b-4fee-9855-10d1df5cad1e',
            {
                'tenant': 'Dolittle',
                'application': 'Studio',
                'tenant-id': '508c1745-5f2a-4b4c-b7a5-2fbb1484346d',
            }));

        list.items.push(this.createNamespace(
            'application-a7e5065c-11a7-4e14-b281-c86bcf2dbd5c',
            {
                'tenant': 'Dolittle',
                'application': 'Lunch App',
                'tenant-id': '508c1745-5f2a-4b4c-b7a5-2fbb1484346d',
            }));

        list.items.push(this.createNamespace(
            'application-17e4f11e-4cf9-49a6-af0d-b69be8af1e63',
            {
                'tenant': 'Dolittle-Truck-Service',
                'application': 'trucker',
                'tenant-id': 'afffe616-9797-489e-af2d-eccb09a96020'
            }));

        list.items.push(this.createNamespace(
            'kube-system',
            {
                'control-plane': 'true',
                'kubernetes.io/cluster-service': 'true'
            }));

        list.items.push(this.createNamespace(
            'system-auth',
            {}));

        return list;
    }

    private createNamespace(name: string, labels: { [key: string]: string; }): V1Namespace {
        const namespace = new V1Namespace();

        const metadata = namespace.metadata = new V1ObjectMeta();
        metadata.name = name;
        metadata.labels = labels;
        metadata.uid = Guid.create().toString();
        metadata.selfLink = `/api/v1/namespaces/${name}`;
        metadata.resourceVersion = `${Math.ceil(Math.random() * 1e6)}`;
        metadata.creationTimestamp = new Date(Date.now() - Math.random()*100*24*3600*1000);

        const spec = namespace.spec = new V1NamespaceSpec();
        spec.finalizers = [ 'kubernetes' ];

        const status = namespace.status = new V1NamespaceStatus();
        status.phase = 'Active';

        return namespace;
    }
}
