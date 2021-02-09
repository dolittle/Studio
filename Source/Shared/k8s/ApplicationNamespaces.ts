// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { injectable } from 'tsyringe';
import { KubeConfig, ListWatch, Watch, CoreV1Api, V1Namespace } from '@kubernetes/client-node';

import { Configuration, ILogger } from '@dolittle/vanir-backend';

import { IApplicationNamespaces } from './IApplicationNamespaces';

@injectable()
export class ApplicationNamespaces extends IApplicationNamespaces {
    private config: KubeConfig;
    private namespaces?: ListWatch<V1Namespace>;

    constructor(configuration: Configuration, private readonly _logger: ILogger) {
        super();
        this.config = this.getKubernetesConfig(configuration);
        this.startListWatcherLoop();
    }

    getNamespacesForTenant = (tenantId: string) => {
        if (!this.namespaces) return [];
        return this.namespaces.list().filter(_ => _.metadata?.labels !== undefined && _.metadata?.annotations['dolittle.io/tenant-id'] === tenantId);
    };

    private async startListWatcherLoop() {
        while (true) {
            try {
                const coreV1 = this.config.makeApiClient(CoreV1Api);
                const watcher = new ListWatch('/api/v1/namespaces', new Watch(this.config), () => coreV1.listNamespace(), false);
                const restartOnError = () => {
                    watcher.off('error', restartOnError);
                    this.namespaces = undefined;
                    this.startListWatcherLoop();
                };
                watcher.on('error', restartOnError);
                await watcher.start();
                this.namespaces = watcher;
                break;
            } catch (ex) {
                this._logger.error(`Could not start kubernetes watcher ${ex}`);
            }
            await new Promise(resolve => global.setTimeout(resolve, 5000));
        }
    }

    private getKubernetesConfig(configuration: Configuration): KubeConfig {
        const config = new KubeConfig();
        if (configuration.isDevelopment) {
            this._logger.info('Running development');
            config.loadFromClusterAndUser({
                name: 'mock',
                server: 'http://localhost:9000',
                skipTLSVerify: true,
            }, {
                name: 'noone',
            });
        } else {
            this._logger.info('Running production');
            config.loadFromDefault();
        }
        return config;
    }
}
