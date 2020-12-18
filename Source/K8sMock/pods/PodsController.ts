// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Controller, Get, Route, Tags } from 'tsoa';
import { V1ConfigMapEnvSource, V1ConfigMapVolumeSource, V1Container, V1EnvFromSource, V1ListMeta, V1ObjectMeta, V1Pod, V1PodList, V1PodSecurityContext, V1PodSpec, V1PodStatus, V1Volume, V1VolumeMount } from '@kubernetes/client-node';

import { Guid } from '@dolittle/rudiments';



@Route('api/v1/namespaces')
@Tags('core_v1')
export class PodsController extends Controller {
    private static readonly _pods: V1Pod[] =
    [
        PodsController.createPod(
            'studio-dev-applications',
            'application-853ebea1-1e6b-4fee-9855-10d1df5cad1e',
            {
                tenant: 'Dolittle',
                application: 'Studio',
                environment: 'Dev',
                microservice: 'Applications',
            },
            'dolittle/studio/applications:1.0.0-development.8',
            'dolittle/runtime:5.1.2'
            ),
        PodsController.createPod(
            'studio-dev-events',
            'application-853ebea1-1e6b-4fee-9855-10d1df5cad1e',
            {
                tenant: 'Dolittle',
                application: 'Studio',
                environment: 'Dev',
                microservice: 'Events',
            },
            'dolittle/studio/events:1.0.0-development.10',
            'dolittle/runtime:5.1.4'
            ),
        PodsController.createPod(
            'studio-dev-portal',
            'application-853ebea1-1e6b-4fee-9855-10d1df5cad1e',
            {
                tenant: 'Dolittle',
                application: 'Studio',
                environment: 'Dev',
                microservice: 'Portal',
            },
            'dolittle/studio/portal:1.0.0-development.10',
            'dolittle/runtime:5.1.4'
            ),

        PodsController.createPod(
            'studio-prod-applications',
            'application-853ebea1-1e6b-4fee-9855-10d1df5cad1e',
            {
                tenant: 'Dolittle',
                application: 'Studio',
                environment: 'Prod',
                microservice: 'Applications',
            },
            'dolittle/studio/applications:0.0.0',
            'dolittle/runtime:5.1.2'
            ),
        PodsController.createPod(
            'studio-prod-events',
            'application-853ebea1-1e6b-4fee-9855-10d1df5cad1e',
            {
                tenant: 'Dolittle',
                application: 'Studio',
                environment: 'Prod',
                microservice: 'Events',
            },
            'dolittle/studio/events:0.0.0',
            'dolittle/runtime:5.1.2'
            ),
        PodsController.createPod(
            'studio-prod-portal',
            'application-853ebea1-1e6b-4fee-9855-10d1df5cad1e',
            {
                tenant: 'Dolittle',
                application: 'Studio',
                environment: 'Prod',
                microservice: 'Portal',
            },
            'dolittle/studio/portal:0.0.0',
            'dolittle/runtime:5.1.2'
            ),

        PodsController.createPod(
            'office-lunch-prod-order',
            'application-a7e5065c-11a7-4e14-b281-c86bcf2dbd5c',
            {
                tenant: 'Dolittle',
                application: 'Office-Lunch',
                environment: 'Prod',
                microservice: 'Order',
            },
            'dolittle/office-lunch/order:0.0.9',
            'dolittle/runtime:5.1.4'
            ),

        PodsController.createPod(
            'trucker-dev',
            'application-17e4f11e-4cf9-49a6-af0d-b69be8af1e63',
            {
                tenant: 'Dolittle-Truck-Service',
                application: 'Trucker',
                environment: 'Dev',
                microservice: 'Big-Hot-Wheels'
            },
            'dolittle-trucker/big-hot-wheels:1.0.0',
            'dolittle/runtime:6.9'
            ),
        PodsController.createPod(
            'trucker-test',
            'application-17e4f11e-4cf9-49a6-af0d-b69be8af1e63',
            {
                tenant: 'Dolittle-Truck-Service',
                application: 'Trucker',
                environment: 'Test',
                microservice: 'Big-Hot-Wheels'
            },
            'dolittle-trucker/big-hot-wheels:1.0.0',
            'dolittle/runtime:6.9'
            ),
        PodsController.createPod(
            'trucker-prod',
            'application-17e4f11e-4cf9-49a6-af0d-b69be8af1e63',
            {
                tenant: 'Dolittle-Truck-Service',
                application: 'Trucker',
                environment: 'Prod',
                microservice: 'Big-Hot-Wheels'
            },
            'dolittle-trucker/big-hot-wheels:0.1.0',
            'dolittle/runtime:6.9'
            ),
    ];

    constructor() {
        super();
    }

    @Get('{namespace}/pods')
    getPodsForNamespace(namespace: string): V1PodList {
        const list = new V1PodList();
        list.apiVersion = 'v1';
        list.kind = 'List';

        const metadata = list.metadata = new V1ListMeta();
        metadata.selfLink = `/api/v1/namespaces/${namespace}/pods`;
        metadata.resourceVersion = `${Math.ceil(Math.random() * 1e6)}`;

        list.items = PodsController._pods.filter(_ => _.metadata?.namespace === namespace);
        return list;
    }

    @Get('{namespace}/pods/{pod}')
    getPod(namespace: string, pod: string): V1Pod | null {
        const found = PodsController._pods.find(_ => _.metadata?.namespace === namespace && _.metadata.name === pod);
        if (found) {
            const pod = new V1Pod();
            pod.apiVersion = 'v1';
            pod.kind = 'Pod';
            pod.metadata = found.metadata;
            pod.spec = found.spec;
            pod.status = found.status;
            return pod;
        }
        this.setStatus(404);
        return null;
    }

    private static createPod(name: string, namespace: string, labels: { [key: string]: string; }, headImage: string, runtimeImage: string): V1Pod {
        const pod = new V1Pod();
        const podName = `${name}-${this.generateRandomString(9)}-${this.generateRandomString(5)}`;

        const metadata = pod.metadata = new V1ObjectMeta();
        metadata.name = podName;
        metadata.namespace = namespace;
        metadata.labels = labels;
        metadata.uid = Guid.create().toString();
        metadata.selfLink = `/api/v1/namespaces/${namespace}/pods/${podName}`;
        metadata.resourceVersion = `${Math.ceil(Math.random() * 1e6)}`;
        metadata.creationTimestamp = new Date(Date.now() - Math.random()*100*24*3600*1000);

        const spec = pod.spec = new V1PodSpec();
        spec.containers = [];
        {
            const head = new V1Container();
            head.name = 'head';
            head.image = headImage;
            {
                const envConfigMap = new V1EnvFromSource();
                const configMapRef = envConfigMap.configMapRef = new V1ConfigMapEnvSource();
                configMapRef.name = `${name}-env-variables`;
                head.envFrom = [ envConfigMap ];
            }
            {
                const mountConfigMap = new V1VolumeMount();
                mountConfigMap.mountPath = '/app/data';
                mountConfigMap.name = 'config-files';
                head.volumeMounts = [ mountConfigMap ];
            }
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
        spec.serviceAccount = 'default';
        spec.serviceAccountName = 'default';
        {
            const volumeConfigMap = new V1Volume();
            volumeConfigMap.name = 'config-files';
            const sourceConfigMap = volumeConfigMap.configMap = new V1ConfigMapVolumeSource();
            sourceConfigMap.defaultMode = 420;
            sourceConfigMap.name = `${name}-config-files`;
            spec.volumes = [ volumeConfigMap ];
        }

        const status = pod.status = new V1PodStatus();
        status.hostIP = `10.0.0.${Math.floor(Math.random()*255)}`;
        status.phase = 'Running';
        status.podIP = `10.2.0.${Math.floor(Math.random()*255)}`;
        status.qosClass = 'BestEffort';
        status.startTime = new Date(Date.now() - Math.random()*5*24*3600*1000);

        return pod;
    }

    private static generateRandomString(length: number): string {
        const characters = 'abcdefghijklmonpqrstuvxyz0123456789';
        return new Array(length).fill(0).map(_ => Math.floor(Math.random()*characters.length)).map(_ => characters[_]).join('');
    }
}
