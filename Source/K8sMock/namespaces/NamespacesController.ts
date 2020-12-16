// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Controller, Get, Route, Tags, Query } from 'tsoa';
import { V1NamespaceList, V1ListMeta, V1Namespace, V1ObjectMeta, V1NamespaceSpec, V1NamespaceStatus } from '@kubernetes/client-node';

@Route('api/v1/namespaces')
@Tags('core_v1')
export class NamespacesController extends Controller {

    @Get()
    async getNamespaces(@Query() watch?: boolean): Promise<V1NamespaceList> {
        if (watch) {
            await new Promise(_ => {});
        }
        const list = new V1NamespaceList();
        list.apiVersion = 'v1';
        list.kind = 'NamespaceList';
        list.metadata = new V1ListMeta();

        const objectMeta = new V1ObjectMeta();
        objectMeta.name = 'application-fe7736bb-57fc-4166-bb91-6954f4dd4eb7';
        objectMeta.labels = {
            'tenant': 'Dolittle',
            'application': 'Studio',
            'tenant-id': '508c1745-5f2a-4b4c-b7a5-2fbb1484346d',
        };
        const studioNamespace = this.createNamespace(
            'application-fe7736bb-57fc-4166-bb91-6954f4dd4eb7',
            {
                'tenant': 'Dolittle',
                'application': 'Studio',
                'tenant-id': '508c1745-5f2a-4b4c-b7a5-2fbb1484346d',
            });
        const truckNamespace = this.createNamespace(
            'application-17e4f11e-4cf9-49a6-af0d-b69be8af1e63',
            {
                'tenant': 'Dolittle-Truck-Service',
                'application': 'trucker',
                'tenant-id': 'afffe616-9797-489e-af2d-eccb09a96020'
            });

        const labellessNamespace = this.createNamespace(
            'labelless',
            {});

        const ingressNamespace = this.createNamespace(
            'ingress',
            {
                'certmanager.k8s.io/disable-validation': 'true'
            });
        list.items = [studioNamespace, truckNamespace, labellessNamespace, ingressNamespace];

        return list;
    }

    private createNamespace(name: string, labels: { [key: string]: string; }): V1Namespace {
        const objectMeta = new V1ObjectMeta();
        objectMeta.name = name;
        objectMeta.labels = labels;

        const namespace = new V1Namespace();
        namespace.metadata = objectMeta;
        namespace.spec = new V1NamespaceSpec();

        return namespace;
    }
}
