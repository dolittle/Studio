// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as Handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';
import { Workspace } from '../../common/workspaces';
import { injectable } from 'tsyringe';
import { MicroservicePorts } from '../../common/workspaces/MicroservicePorts';
import { ILogger } from '@dolittle/vanir-backend';

export type MicroservicePortsForRendering = {
    backend: number;
    web: number;
    runtime: number;
    metrics: number;
};

export type ApplicationForRendering = {
    id: string;
    name: string;
};

export type MicroserviceForRendering = {
    id: string;
    name: string;
    applicationName: string;
    portal: boolean;
    ports: MicroservicePortsForRendering
};

export type WorkspaceForRendering = {
    path: string;
    application: ApplicationForRendering;
    microservices: MicroserviceForRendering[];
};


const toPascalCase = function (input: string): string {
    return input.replace(/(\w)(\w*)/g,
        function (g0, g1, g2) { return g1.toUpperCase() + g2.toLowerCase(); });
};


@injectable()
export class WorkspaceRenderer {

    constructor(private readonly _logger: ILogger) {
        Handlebars.registerHelper('lowerCase', (value: string) => value.toLowerCase());
        Handlebars.registerHelper('upperCase', (value: string) => value.toUpperCase());
        Handlebars.registerHelper('pascalCase', (value: string) => toPascalCase(value));
        Handlebars.registerHelper('inc', (value: string) => parseInt(value) + 1);
    }

    async render(workspace: Workspace): Promise<void> {
        this._logger.info(`Render workspace at '${workspace.path}'`);
        const templatesRoot = path.join(require.main!.path, '..', '..', 'templates');
        const applicationTemplates = path.join(templatesRoot, 'application');
        const microserviceTemplates = path.join(templatesRoot, 'microservice');

        const dolittleFolder = path.join(workspace.path, '.dolittle');

        const workspaceForRendering = {
            path: workspace.path,
            application: {
                id: workspace.application.id,
                name: workspace.application.name
            },
            microservices: workspace.microservices.map(_ => {
                const ports = workspace.microservicePorts.find(p => p.id === _.id) || MicroservicePorts.default;
                return {
                    id: _.id,
                    name: _.name,
                    portal: workspace.application.portal.id === _.id,
                    applicationName: workspace.application.name,
                    ports: {
                        backend: ports.backend,
                        web: ports.web,
                        runtime: ports.runtime,
                        metrics: ports.metrics
                    }
                };
            })
        } as WorkspaceForRendering;

        this._logger.info(workspaceForRendering);

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
        if (!fs.existsSync(targetDirectory)) {
            fs.mkdirSync(targetDirectory);
        }
        const pattern = path.join(source, '**/*');
        const files = await this.glob(pattern);
        this._logger.info(`Render files from '${pattern}' into ${targetDirectory}`);
        for (const file of files) {
            const buffer = await fs.promises.readFile(file, 'utf8');
            const content = buffer.toString();

            const template = Handlebars.compile(content);
            const result = template(context);
            const relativePath = file.substr(source.length);
            let targetPath = path.join(targetDirectory, relativePath);
            if (targetPath.endsWith('.hbs')) {
                targetPath = targetPath.substr(0, targetPath.length - 4);
            }

            this._logger.info(` -> ${targetPath}`);
            await fs.promises.writeFile(targetPath, result);
        }
    }
}
