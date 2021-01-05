// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Controller, Get, Route, Tags } from 'tsoa';
import { V1ConfigMap, V1ConfigMapList, V1ListMeta, V1ObjectMeta } from '@kubernetes/client-node';

import { Guid } from '@dolittle/rudiments';

@Route('api/v1/namespaces')
@Tags('core_v1')
export class ConfigmapsController extends Controller {
    private readonly _configmaps: V1ConfigMap[] = [];

    constructor() {
        super();

        {
            {
                {
                    this._configmaps.push(this.createConfigMap(
                        'studio-dev-applications-env-variables',
                        'application-853ebea1-1e6b-4fee-9855-10d1df5cad1e',
                        {
                            tenant: 'Dolittle',
                            application: 'Studio',
                            environment: 'Dev',
                            microservice: 'Applications',
                        },
                        {
                        }
                        ));
                    this._configmaps.push(this.createConfigMap(
                        'studio-dev-applications-config-files',
                        'application-853ebea1-1e6b-4fee-9855-10d1df5cad1e',
                        {
                            tenant: 'Dolittle',
                            application: 'Studio',
                            environment: 'Dev',
                            microservice: 'Applications',
                        },
                        {
                        }
                        ));
                }
                {
                    this._configmaps.push(this.createConfigMap(
                        'studio-dev-events-env-variables',
                        'application-853ebea1-1e6b-4fee-9855-10d1df5cad1e',
                        {
                            tenant: 'Dolittle',
                            application: 'Studio',
                            environment: 'Dev',
                            microservice: 'Events',
                        },
                        {
                        }
                        ));
                    this._configmaps.push(this.createConfigMap(
                        'studio-dev-events-config-files',
                        'application-853ebea1-1e6b-4fee-9855-10d1df5cad1e',
                        {
                            tenant: 'Dolittle',
                            application: 'Studio',
                            environment: 'Dev',
                            microservice: 'Events',
                        },
                        {
                        }
                        ));
                }
                {
                    this._configmaps.push(this.createConfigMap(
                        'studio-dev-portal-env-variables',
                        'application-853ebea1-1e6b-4fee-9855-10d1df5cad1e',
                        {
                            tenant: 'Dolittle',
                            application: 'Studio',
                            environment: 'Dev',
                            microservice: 'Portal',
                        },
                        {
                        }
                        ));
                    this._configmaps.push(this.createConfigMap(
                        'studio-dev-portal-config-files',
                        'application-853ebea1-1e6b-4fee-9855-10d1df5cad1e',
                        {
                            tenant: 'Dolittle',
                            application: 'Studio',
                            environment: 'Dev',
                            microservice: 'Portal',
                        },
                        {
                        }
                        ));
                }
            }
            {
                {
                    this._configmaps.push(this.createConfigMap(
                        'studio-prod-applications-env-variables',
                        'application-853ebea1-1e6b-4fee-9855-10d1df5cad1e',
                        {
                            tenant: 'Dolittle',
                            application: 'Studio',
                            environment: 'Prod',
                            microservice: 'Applications',
                        },
                        {
                        }
                        ));
                    this._configmaps.push(this.createConfigMap(
                        'studio-prod-applications-config-files',
                        'application-853ebea1-1e6b-4fee-9855-10d1df5cad1e',
                        {
                            tenant: 'Dolittle',
                            application: 'Studio',
                            environment: 'Prod',
                            microservice: 'Applications',
                        },
                        {
                        }
                        ));
                }
                {
                    this._configmaps.push(this.createConfigMap(
                        'studio-prod-events-env-variables',
                        'application-853ebea1-1e6b-4fee-9855-10d1df5cad1e',
                        {
                            tenant: 'Dolittle',
                            application: 'Studio',
                            environment: 'Prod',
                            microservice: 'Events',
                        },
                        {
                        }
                        ));
                    this._configmaps.push(this.createConfigMap(
                        'studio-prod-events-config-files',
                        'application-853ebea1-1e6b-4fee-9855-10d1df5cad1e',
                        {
                            tenant: 'Dolittle',
                            application: 'Studio',
                            environment: 'Prod',
                            microservice: 'Events',
                        },
                        {
                        }
                        ));
                }
                {
                    this._configmaps.push(this.createConfigMap(
                        'studio-prod-portal-env-variables',
                        'application-853ebea1-1e6b-4fee-9855-10d1df5cad1e',
                        {
                            tenant: 'Dolittle',
                            application: 'Studio',
                            environment: 'Prod',
                            microservice: 'Portal',
                        },
                        {
                        }
                        ));
                    this._configmaps.push(this.createConfigMap(
                        'studio-prod-portal-config-files',
                        'application-853ebea1-1e6b-4fee-9855-10d1df5cad1e',
                        {
                            tenant: 'Dolittle',
                            application: 'Studio',
                            environment: 'Prod',
                            microservice: 'Portal',
                        },
                        {
                        }
                        ));
                }
            }
        }
        {
            {
                {
                    this._configmaps.push(this.createConfigMap(
                        'office-lunch-prod-order-env-variables',
                        'application-a7e5065c-11a7-4e14-b281-c86bcf2dbd5c',
                        {
                            tenant: 'Dolittle',
                            application: 'Office-Lunch',
                            environment: 'Prod',
                            microservice: 'Order',
                        },
                        {
                        }
                        ));
                    this._configmaps.push(this.createConfigMap(
                        'office-lunch-prod-order-config-files',
                        'application-a7e5065c-11a7-4e14-b281-c86bcf2dbd5c',
                        {
                            tenant: 'Dolittle',
                            application: 'Office-Lunch',
                            environment: 'Prod',
                            microservice: 'Order',
                        },
                        {
                        }
                        ));
                }
            }
        }
        {
            {
                {
                    this._configmaps.push(this.createConfigMap(
                        'trucker-dev-env-variables',
                        'application-17e4f11e-4cf9-49a6-af0d-b69be8af1e63',
                        {
                            tenant: 'Dolittle-Truck-Service',
                            application: 'Trucker',
                            environment: 'Dev',
                            microservice: 'Big-Hot-Wheels'
                        },
                        {
                        }
                        ));
                    this._configmaps.push(this.createConfigMap(
                        'trucker-dev-order-config-files',
                        'application-17e4f11e-4cf9-49a6-af0d-b69be8af1e63',
                        {
                            tenant: 'Dolittle-Truck-Service',
                            application: 'Trucker',
                            environment: 'Dev',
                            microservice: 'Big-Hot-Wheels'
                        },
                        {
                        }
                        ));
                }
            }
            {
                {
                    this._configmaps.push(this.createConfigMap(
                        'trucker-test-env-variables',
                        'application-17e4f11e-4cf9-49a6-af0d-b69be8af1e63',
                        {
                            tenant: 'Dolittle-Truck-Service',
                            application: 'Trucker',
                            environment: 'Test',
                            microservice: 'Big-Hot-Wheels'
                        },
                        {
                        }
                        ));
                    this._configmaps.push(this.createConfigMap(
                        'trucker-test-order-config-files',
                        'application-17e4f11e-4cf9-49a6-af0d-b69be8af1e63',
                        {
                            tenant: 'Dolittle-Truck-Service',
                            application: 'Trucker',
                            environment: 'Test',
                            microservice: 'Big-Hot-Wheels'
                        },
                        {
                        }
                        ));
                }
            }
            {
                {
                    this._configmaps.push(this.createConfigMap(
                        'trucker-prod-env-variables',
                        'application-17e4f11e-4cf9-49a6-af0d-b69be8af1e63',
                        {
                            tenant: 'Dolittle-Truck-Service',
                            application: 'Trucker',
                            environment: 'Prod',
                            microservice: 'Big-Hot-Wheels'
                        },
                        {
                        }
                        ));
                    this._configmaps.push(this.createConfigMap(
                        'trucker-prod-order-config-files',
                        'application-17e4f11e-4cf9-49a6-af0d-b69be8af1e63',
                        {
                            tenant: 'Dolittle-Truck-Service',
                            application: 'Trucker',
                            environment: 'Prod',
                            microservice: 'Big-Hot-Wheels'
                        },
                        {
                        }
                        ));
                }
            }
        }
    }

    @Get('{namespace}/configmaps')
    getConfigmapsForNamespace(namespace: string): V1ConfigMapList {
        const list = new V1ConfigMapList();
        list.apiVersion = 'v1';
        list.kind = 'List';

        const metadata = list.metadata = new V1ListMeta();
        metadata.selfLink = `/api/v1/namespaces/${namespace}/configmaps`;
        metadata.resourceVersion = `${Math.ceil(Math.random() * 1e6)}`;

        list.items = this._configmaps.filter(_ => _.metadata?.namespace === namespace);
        return list;
    }

    @Get('{namespace}/configmaps/{configmap}')
    getConfigmap(namespace: string, configmap: string): V1ConfigMap | null {
        const found = this._configmaps.find(_ => _.metadata?.namespace === namespace && _.metadata.name === configmap);
        if (found) {
            const configmap = new V1ConfigMap();
            configmap.apiVersion = 'v1';
            configmap.kind = 'Configmap';
            configmap.metadata = found.metadata;
            configmap.data = found.data;
            return configmap;
        }
        this.setStatus(404);
        return null;
    }

    private createConfigMap(name: string, namespace: string, labels: { [key: string]: string; }, data: { [key: string]: string; }): V1ConfigMap {
        const configmap = new V1ConfigMap();

        const metadata = configmap.metadata = new V1ObjectMeta();
        metadata.name = name;
        metadata.namespace = namespace;
        metadata.labels = labels;
        metadata.uid = Guid.create().toString();
        metadata.selfLink = `/api/v1/namespaces/${namespace}/configmaps/${name}`;
        metadata.resourceVersion = `${Math.ceil(Math.random() * 1e6)}`;
        metadata.creationTimestamp = new Date(Date.now() - Math.random()*100*24*3600*1000);

        configmap.data = data;

        return configmap;
    }
}