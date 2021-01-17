// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Microservice } from '@dolittle/vanir-common';
import { IFileSystem, IWellKnownFilesAndFolders } from '../infrastructure';
import { IMicroserviceLoader } from './IMicroserviceLoader';
import { ILogger } from '@dolittle/vanir-backend';
import * as path from 'path';
import { injectable } from 'tsyringe';

@injectable()
export class MicroserviceLoader implements IMicroserviceLoader {
    constructor(
        private readonly _fileSystem: IFileSystem,
        private readonly _filesAndFolders: IWellKnownFilesAndFolders,
        private readonly _logger: ILogger) {
    }

    existsInFolder(folder: string): boolean {
        const microservicePath = this.getMicroservicePathFor(folder);
        return this._fileSystem.exists(microservicePath);
    }

    async loadFromFolder(folder: string): Promise<Microservice> {
        const microservicePath = this.getMicroservicePathFor(folder);
        this._logger.info(`Load microservice from '${microservicePath}`);
        const buffer = await this._fileSystem.readFile(microservicePath);
        const microservice = JSON.parse(buffer.toString()) as Microservice;
        this._logger.info(`Microservice with id '${microservice.id}' is loaded${microservice.web ? ' - web is enabled' : ''}`);
        return microservice;
    }

    private getMicroservicePathFor(folder: string) {
        return path.join(folder, this._filesAndFolders.microserviceFile);
    }

}
