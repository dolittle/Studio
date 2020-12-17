// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

export class Configuration {
    get isDevelopment(): boolean {
        return process.env.NODE_ENV?.toLowerCase() === 'development';
    }

    get apiserverProxyURL(): string {
        return process.env.APISERVER_PROXY_URL ?? '';
    }
}
