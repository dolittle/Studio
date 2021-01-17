// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as Handlebars from 'handlebars';
import * as path from 'path';
import { glob } from 'glob';
import { Workspace } from '../../../common/workspaces';
import { injectable } from 'tsyringe';
import { ILogger } from '@dolittle/vanir-backend';
import { app } from 'electron';
import { IFileSystem } from '../../infrastructure/IFileSystem';
import { IWorkspaceRenderer } from './IWorkspaceRenderer';
import { IWorkspaceForRenderingConverter } from './IWorkspaceForRenderingConverter';

@injectable()
export class WorkspaceRenderer implements IWorkspaceRenderer {

    constructor(
        private readonly _fileSystem: IFileSystem,
        private readonly _converter: IWorkspaceForRenderingConverter,
        private readonly _logger: ILogger) {
    }

    async render(workspace: Workspace): Promise<void> {
        this._logger.info(`Render workspace at '${workspace.path}'`);
        let templatesRoot = '';
        if (require.main?.path) {
            templatesRoot = path.join(require.main!.path, '..', '..', 'templates');
        } else {
            templatesRoot = path.resolve(path.join(app.getAppPath(),'templates', 'workspace'));
        }

        const applicationTemplates = path.join(templatesRoot, 'application');
        const microserviceTemplates = path.join(templatesRoot, 'microservice');

        const dolittleFolder = path.join(workspace.path, '.dolittle');

        const workspaceForRendering = this._converter.convert(workspace);

        await this.renderTemplatesFrom(workspace, workspaceForRendering, applicationTemplates, dolittleFolder);
        for (const microservice of workspaceForRendering.microservices) {
            const microserviceFolder = path.join(dolittleFolder, microservice.name);
            await this.renderTemplatesFrom(workspace, microservice, microserviceTemplates, microserviceFolder);
        }
    }

    private async glob(pattern: string): Promise<string[]> {
        return new Promise((resolve, reject) => {
            glob(pattern, (err, files) => err === null ? resolve(files) : reject(err));
        });
    }

    private async renderTemplatesFrom(workspace: Workspace, context: any, source: string, targetDirectory: string): Promise<void> {
        if (!this._fileSystem.exists(targetDirectory)) {
            this._fileSystem.mkdir(targetDirectory);
        }
        const pattern = path.join(source, '**/*');
        const files = await this.glob(pattern);
        this._logger.info(`Render files from '${pattern}' into ${targetDirectory}`);
        for (const file of files) {
            const buffer = await this._fileSystem.readFile(file, 'utf8');
            const content = buffer.toString();

            const template = Handlebars.compile(content);
            const result = template(context);
            const relativePath = file.substr(source.length);
            let targetPath = path.join(targetDirectory, relativePath);
            if (targetPath.endsWith('.hbs')) {
                targetPath = targetPath.substr(0, targetPath.length - 4);
            }

            this._logger.info(` -> ${targetPath}`);
            await this._fileSystem.writeFile(targetPath, result);
        }
    }
}
