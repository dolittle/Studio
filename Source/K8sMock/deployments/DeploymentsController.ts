// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Controller, Get, Route, Tags } from 'tsoa';
import { V1DeploymentList, V1ListMeta, V1Deployment, V1ObjectMeta, V1DeploymentSpec, V1PodTemplateSpec, V1PodSpec, V1Container } from '@kubernetes/client-node';

@Route('apis/apps/v1/namespaces')
@Tags('core_v1')
export class DeploymentsController extends Controller {
    private readonly _deployments: V1Deployment[] = [];

    constructor() {
        super();

        this._deployments.push(this.createDeployment(
            'studio-dev-applications',
            'application-fe7736bb-57fc-4166-bb91-6954f4dd4eb7',
            'a48eeaa6-a359-4db9-92fb-a1ced80824bd',
            {
                tenant: 'Dolittle',
                application: 'Studio',
                microservice: 'Applications',
            },
            [
                {
                    name: 'head',
                    image: '93a59192635d4959-b6d8e24084624aac.azurecr.io/dolittle/studio/applications:1.0.0-development.10',
                },
                {
                    name: 'runtime',
                    image: 'dolittle/runtime:5.1.2'
                }
            ]));

        this._deployments.push(this.createDeployment(
            'studio-dev-portal',
            'application-fe7736bb-57fc-4166-bb91-6954f4dd4eb7',
            '85f1d6fe-0dab-4797-b468-94c94885e1e5',
            {
                tenant: 'Dolittle',
                application: 'Studio',
                microservice: 'Portal',
            },
            [
                {
                    name: 'head',
                    image: '93a59192635d4959-b6d8e24084624aac.azurecr.io/dolittle/studio/portal:1.0.0-development.10',
                },
            ]));

        this._deployments.push(this.createDeployment(
            'trucker',
            'application-17e4f11e-4cf9-49a6-af0d-b69be8af1e63',
            'a85ef34c-f3ff-4d96-bab8-c7cb7a20666a',
            {
                tenant: 'Dolittle-Truck-Service',
                application: 'Trucker',
                microservice: 'trucker'
            },
            [
                {
                    name: 'head',
                    image: '3d14734f868d40a29438ab6919cc2d93.azurecr.io/trucker/big-hot-wheels:1.0.0'
                },
                {
                    name: 'runtime',
                    image: 'dolittle/runtime:6.9'
                }
            ]));

        this._deployments.push(this.createDeployment(
            'empty',
            'emptiness',
            'a092ee7f-f883-4e1f-b187-3dfff0690066',
            {},
            []));
    }

    @Get('{namespace}/deployments')
    async getDeploymentsForNamespace(namespace: string): Promise<V1DeploymentList> {
        const deploymentList = new V1DeploymentList();
        deploymentList.apiVersion = 'v1';
        deploymentList.kind = 'DeploymentList';
        deploymentList.metadata = new V1ListMeta();
        deploymentList.items = this._deployments.filter(deployment => deployment.metadata?.namespace === namespace);
        return deploymentList;
    }

    private createDeployment(name: string, namespace: string, uid: string, labels: { [key: string]: string; }, containers: { name: string, image: string}[]): V1Deployment {
        const deployment = new V1Deployment();

        deployment.metadata = new V1ObjectMeta();
        deployment.metadata.name = name;
        deployment.metadata.namespace = namespace;
        deployment.metadata.uid = uid;
        deployment.metadata.labels = labels;

        deployment.spec = new V1DeploymentSpec();

        deployment.spec.template = new V1PodTemplateSpec();
        deployment.spec.template.metadata = new V1ObjectMeta();
        deployment.spec.template.metadata.labels = labels;

        deployment.spec.template.spec = new V1PodSpec();

        deployment.spec.template.spec.containers = containers.map(container => {
            const newContainer = new V1Container();
            newContainer.name = container.name;
            newContainer.image = container.image;
            return newContainer;
        });

        return deployment;
    }
}
