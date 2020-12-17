// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Controller, Get, Route, Tags } from 'tsoa';
import { V1DeploymentList, V1ListMeta, V1Deployment, V1ObjectMeta, V1DeploymentSpec, V1PodTemplateSpec, V1PodSpec, V1Container, V1LabelSelector, V1DeploymentStrategy, V1RollingUpdateDeployment, V1PodSecurityContext, V1Volume, V1DeploymentStatus } from '@kubernetes/client-node';

import { Guid } from '@dolittle/rudiments';

@Route('apis/apps/v1/namespaces')
@Tags('core_v1')
export class DeploymentsController extends Controller {
    private readonly _deployments: V1Deployment[] = [];

    constructor() {
        super();

        {
            {
                this._deployments.push(this.createDeployment(
                    'studio-dev-applications',
                    'application-853ebea1-1e6b-4fee-9855-10d1df5cad1e',
                    {
                        tenant: 'Dolittle',
                        application: 'Studio-Dev',
                        microservice: 'Applications',
                    },
                    'dolittle/studio/applications:1.0.0-development.8',
                    'dolittle/runtime:5.1.2'
                    ));
                this._deployments.push(this.createDeployment(
                    'studio-dev-portal',
                    'application-853ebea1-1e6b-4fee-9855-10d1df5cad1e',
                    {
                        tenant: 'Dolittle',
                        application: 'Studio-Dev',
                        microservice: 'Events',
                    },
                    'dolittle/studio/events:1.0.0-development.10',
                    'dolittle/runtime:5.1.4'
                    ));
                this._deployments.push(this.createDeployment(
                    'studio-dev-portal',
                    'application-853ebea1-1e6b-4fee-9855-10d1df5cad1e',
                    {
                        tenant: 'Dolittle',
                        application: 'Studio-Dev',
                        microservice: 'Portal',
                    },
                    'dolittle/studio/portal:1.0.0-development.10',
                    'dolittle/runtime:5.1.4'
                    ));
            }
            {
                this._deployments.push(this.createDeployment(
                    'studio-dev-applications',
                    'application-853ebea1-1e6b-4fee-9855-10d1df5cad1e',
                    {
                        tenant: 'Dolittle',
                        application: 'Studio-Prod',
                        microservice: 'Applications',
                    },
                    'dolittle/studio/applications:0.0.0',
                    'dolittle/runtime:5.1.2'
                    ));
                this._deployments.push(this.createDeployment(
                    'studio-dev-portal',
                    'application-853ebea1-1e6b-4fee-9855-10d1df5cad1e',
                    {
                        tenant: 'Dolittle',
                        application: 'Studio-Prod',
                        microservice: 'Events',
                    },
                    'dolittle/studio/events:0.0.0',
                    'dolittle/runtime:5.1.2'
                    ));
                this._deployments.push(this.createDeployment(
                    'studio-dev-portal',
                    'application-853ebea1-1e6b-4fee-9855-10d1df5cad1e',
                    {
                        tenant: 'Dolittle',
                        application: 'Studio-Prod',
                        microservice: 'Portal',
                    },
                    'dolittle/studio/portal:0.0.0',
                    'dolittle/runtime:5.1.2'
                    ));
            }
        }
        {
            {
                this._deployments.push(this.createDeployment(
                    'office-lunch-prod-order',
                    'application-a7e5065c-11a7-4e14-b281-c86bcf2dbd5c',
                    {
                        tenant: 'Dolittle',
                        application: 'Office-Lunch-Prod',
                        microservice: 'Order',
                    },
                    'dolittle/office-lunch/order:0.0.9',
                    'dolittle/runtime:5.1.4'
                    ));
            }
        }
        {
            {
                this._deployments.push(this.createDeployment(
                    'trucker',
                    'application-17e4f11e-4cf9-49a6-af0d-b69be8af1e63',
                    {
                        tenant: 'Dolittle-Truck-Service',
                        application: 'Trucker-Dev',
                        microservice: 'Big-Hot-Wheels'
                    },
                    'dolittle-trucker/big-hot-wheels:1.0.0',
                    'dolittle/runtime:6.9'
                    ));
            }
            {
                this._deployments.push(this.createDeployment(
                    'trucker',
                    'application-17e4f11e-4cf9-49a6-af0d-b69be8af1e63',
                    {
                        tenant: 'Dolittle-Truck-Service',
                        application: 'Trucker-Test',
                        microservice: 'Big-Hot-Wheels'
                    },
                    'dolittle-trucker/big-hot-wheels:1.0.0',
                    'dolittle/runtime:6.9'
                    ));
            }
            {
                this._deployments.push(this.createDeployment(
                    'trucker',
                    'application-17e4f11e-4cf9-49a6-af0d-b69be8af1e63',
                    {
                        tenant: 'Dolittle-Truck-Service',
                        application: 'Trucker-Prod',
                        microservice: 'Big-Hot-Wheels'
                    },
                    'dolittle-trucker/big-hot-wheels:0.1.0',
                    'dolittle/runtime:6.9'
                    ));
            }
        }
    }

    @Get('{namespace}/deployments')
    getDeploymentsForNamespace(namespace: string): V1DeploymentList {
        const list = new V1DeploymentList();
        list.apiVersion = 'apps/v1';
        list.kind = 'DeploymentList';

        const metadata = list.metadata = new V1ListMeta();
        metadata.selfLink = `/apis/apps/v1/namespaces/${namespace}/deployments`;
        metadata.resourceVersion = `${Math.ceil(Math.random() * 1e6)}`;

        list.items = this._deployments.filter(_ => _.metadata?.namespace === namespace);
        return list;
    }

    @Get('{namespace}/deployments/{deployment}')
    getDeployment(namespace: string, deployment: string): V1Deployment | null {
        const found = this._deployments.find(_ => _.metadata?.namespace === namespace && _.metadata.name === deployment);
        if (found) {
            const deployment = new V1Deployment();
            deployment.apiVersion = 'apps/v1';
            deployment.kind = 'Deployment';
            deployment.metadata = found.metadata;
            deployment.spec = found.spec;
            deployment.status = found.status;
            return deployment;
        }
        this.setStatus(404);
        return null;
    }

    private createDeployment(name: string, namespace: string, labels: { [key: string]: string; }, headImage: string, runtimeImage: string): V1Deployment {
        const deployment = new V1Deployment();

        const metadata = deployment.metadata = new V1ObjectMeta();
        metadata.name = name;
        metadata.namespace = namespace;
        metadata.labels = labels;
        metadata.uid = Guid.create().toString();
        metadata.selfLink = `/api/v1/namespaces/${name}`;
        metadata.resourceVersion = `${Math.ceil(Math.random() * 1e6)}`;
        metadata.creationTimestamp = new Date(Date.now() - Math.random()*100*24*3600*1000);

        const spec = deployment.spec = new V1DeploymentSpec();
        spec.replicas = 1;
        {
            const selector = spec.selector = new V1LabelSelector();
            selector.matchLabels = labels;
        }
        {
            const strategy = spec.strategy = new V1DeploymentStrategy();
            strategy.type = 'RollingUpdate';
            const update = strategy.rollingUpdate = new V1RollingUpdateDeployment();
            update.maxSurge = '25%' as Object;
            update.maxUnavailable = '25%' as Object;
        }

        const template = spec.template = new V1PodTemplateSpec();
        {
            const metadata = template.metadata = new V1ObjectMeta();
            metadata.labels = labels;

            const spec = template.spec = new V1PodSpec();
            spec.containers = [];
            {
                const head = new V1Container();
                head.name = 'head';
                head.image = headImage;
                spec.containers.push(head);
            }
            {
                const runtime = new V1Container();
                runtime.name = 'runtime';
                runtime.image = runtimeImage;
                spec.containers.push(runtime);
            }
            spec.dnsPolicy = 'ClusterFirst';
            spec.restartPolicy = 'Always';
            spec.schedulerName = 'default-scheduler';
            spec.securityContext = new V1PodSecurityContext();
            spec.terminationGracePeriodSeconds = 30;

            const volumes = spec.volumes = [] as V1Volume[];
        }

        const status = deployment.status = new V1DeploymentStatus();
        status.availableReplicas = 1;
        status.readyReplicas = 1;
        status.replicas = 1;
        status.updatedReplicas = 1;

        return deployment;
    }
}
