// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Application } from '@dolittle/vanir-common';
import { IFileSystem, IWellKnownFilesAndFolders } from '../infrastructure';
import * as path from 'path';
import { IApplicationLoader } from './IApplicationLoader';
import { ILogger } from '@dolittle/vanir-backend';
import { injectable } from 'tsyringe';

@injectable()
export class ApplicationLoader implements IApplicationLoader {
    constructor(
        private readonly _fileSystem: IFileSystem,
        private readonly _filesAndFolders: IWellKnownFilesAndFolders,
        private readonly _logger: ILogger) {
    }

    existsInFolder(folder: string): boolean {
        const applicationPath = this.getApplicationPathFor(folder);
        return this._fileSystem.exists(applicationPath);
    }

    async loadFromFolder(folder: string): Promise<Application> {
        const applicationPath = this.getApplicationPathFor(folder);
        this._logger.info(`Load application from '${applicationPath}'`);
        const buffer = await this._fileSystem.readFile(applicationPath);
        const application = JSON.parse(buffer.toString()) as Application;
        this._logger.info(`Application with id '${application.id}' is loaded`);
        return application;
    }

    private getApplicationPathFor(folder: string) {
        return path.join(folder, this._filesAndFolders.applicationFile);
    }
}
