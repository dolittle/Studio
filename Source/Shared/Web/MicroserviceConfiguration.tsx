// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { VersionInfo } from './VersionInfo';

export class MicroserviceConfiguration {
    constructor(readonly name: string, readonly prefix: string, readonly version: VersionInfo) {
    }
}
