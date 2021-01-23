// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { injectable } from 'tsyringe';
import { KubeConfig, AppsV1Api} from '@kubernetes/client-node';

import { Configuration, ILogger } from '@dolittle/vanir-backend';
import { Context } from '@dolittle/vanir-backend/dist/web';

import { IMicroserviceResources } from './IMicroserviceResources';

@injectable()
export class MicroserviceResources extends IMicroserviceResources {
    private config: KubeConfig;
    private appsV1Api: AppsV1Api;

    constructor(configuration: Configuration, private readonly _logger: ILogger) {
        super();
        this.config = this.getKubernetesConfig(configuration);
        this.appsV1Api = this.config.makeApiClient(AppsV1Api);
    }

    getDeployments = async (namespace: string, ctx: Context) => {
        const { body } = await this.appsV1Api.listNamespacedDeployment(
            namespace,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            this.makeHeaders(ctx));
        return body.items;
    };

    getDeployment = async (namespace: string, deployment: string, ctx: Context) => {
        const { body } = await this.appsV1Api.readNamespacedDeployment(
            deployment,
            namespace,
            undefined,
            undefined,
            undefined,
            this.makeHeaders(ctx));
        return body;
    };

    private getKubernetesConfig(configuration: Configuration): KubeConfig {
        const config = new KubeConfig();
        if (configuration.isDevelopment) {
            config.loadFromClusterAndUser({
                name: 'mock',
                server: 'http://localhost:9000',
                skipTLSVerify: true,
            }, {
                name: 'noone',
            });
        } else {
            config.loadFromClusterAndUser({
                name: 'studio',
                server: this.apiserverProxyURL,
                skipTLSVerify: true,
            }, {
                name: 'noone',
            });
        }
        return config;
    }

    private get apiserverProxyURL(): string {
        return process.env.APISERVER_PROXY_URL ?? '';
    }

    private makeHeaders(ctx: Context) {
        return { headers: { 'User-ID': ctx.userId, 'Tenant-ID': ctx.tenantId, }};
    }
}
