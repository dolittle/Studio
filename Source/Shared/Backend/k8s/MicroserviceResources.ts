// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { injectable } from 'tsyringe';
import { KubeConfig, AppsV1Api} from '@kubernetes/client-node';

import { Configuration } from '@shared/backend/configuration/Configuration';
import { ILogger } from '@shared/backend/logging';

import { IMicroserviceResources } from './IMicroserviceResources';

@injectable()
export class MicroserviceResources extends IMicroserviceResources {
    private config: KubeConfig;
    private appsV1Api: AppsV1Api;

    constructor(configuration: Configuration, private logger: ILogger) {
        super();
        this.config = this.getKubernetesConfig(configuration);
        this.appsV1Api = this.config.makeApiClient(AppsV1Api);
    }

    getDeployments = async (namespace: string) => {
        const { body } = await this.appsV1Api.listNamespacedDeployment(namespace);
        return body.items;
    };

    private getKubernetesConfig(configuration: Configuration): KubeConfig {
        const config = new KubeConfig();
        if (configuration.isDevelopment) {
            config.loadFromClusterAndUser({
                name: 'mock',
                server: 'http://localhost:3001',
                skipTLSVerify: true,
            }, {
                name: 'noone',
            });
        } else {
            config.loadFromClusterAndUser({
                name: 'studio',
                server: 'https://dev.dolittle.studio/api',
                skipTLSVerify: false,
            }, {
                name: 'noone',
            });
        }
        return config;
    }
}
