// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import path from 'path';
import { IWorkspaces, Workspace } from '../../common/workspaces';
import { injectable } from 'tsyringe';
import { Application, Microservice } from '@dolittle/vanir-common';
import { createApplication } from 'create-dolittle-app/dist/creation';
import { createMicroservice } from 'create-dolittle-microservice/dist/creation';
import { ILogger } from '@dolittle/vanir-backend';
import { Guid } from '@dolittle/rudiments';
import { IWorkspaceConverter } from './IWorkspaceConverter';
import { IWorkspaceRenderer } from './rendering/IWorkspaceRenderer';
import { IFileSystem, IWellKnownFilesAndFolders } from '../infrastructure';
import { WorkspacesFile } from './WorkspacesFile';
import { WorkspaceFile } from './WorkspaceFile';
import { IApplicationLoader } from './IApplicationLoader';
import { IMicroserviceLoader } from './IMicroserviceLoader';
import { IMicroservicePortsAllocator } from './IMicroservicePortsAllocator';

@injectable()
export class Workspaces implements IWorkspaces {
    private _workspaces: Workspace[] = [];

    constructor(
        private readonly _converter: IWorkspaceConverter,
        private readonly _renderer: IWorkspaceRenderer,
        private readonly _filesAndFolders: IWellKnownFilesAndFolders,
        private readonly _fileSystem: IFileSystem,
        private readonly _applicationLoader: IApplicationLoader,
        private readonly _microserviceLoader: IMicroserviceLoader,
        private readonly _microservicePortsAllocator: IMicroservicePortsAllocator,
        private readonly _logger: ILogger) {
        this.makeSureRootExists();
    }

    async addFromPath(source: string): Promise<void> {
        await this.loadFromFolder(source);
        await this.save();
    }

    async populateMicroservicesFor(workspace: Workspace, paths: string[]) {
        this._logger.info(`Populate microservices for workspace at ${workspace.path}`);
        workspace.clear();

        for (const relativePath of paths) {
            const microserviceFolder = path.join(workspace.path, relativePath);
            if (this._microserviceLoader.existsInFolder(microserviceFolder)) {
                const microservice = await this._microserviceLoader.loadFromFolder(microserviceFolder);
                workspace.microservices.push(microservice);
            } else {
                this._logger.info(`Microservice defined in relative path '${relativePath}' inside workspace located at '${workspace.path}' does not exist`);
            }
        }
    }

    async getById(id: string): Promise<Workspace> {
        const workspace = this._workspaces.find(_ => _.id === id);
        if (!workspace) {
            throw new Error(`Missing workspace for with id '${id}'`);
        }
        return workspace;
    }

    async getFor(application: Application): Promise<Workspace> {
        const workspace = this._workspaces.find(_ => _.application.id === application.id);
        if (!workspace) {
            throw new Error(`Missing workspace for application '${application.name}' with id '${application.id}'`);
        }
        return workspace;
    }

    async getAll(): Promise<Workspace[]> {
        if (this._workspaces.length === 0) {
            await this.load();
        }
        return this._workspaces;
    }

    async create(path: string, name: string, tenant: string, license: string, containerRegistry: string, portal: boolean): Promise<void> {
        await createApplication({
            name,
            tenant,
            license,
            containerRegistry,
            portal,
            targetDirectory: path
        });
    }

    async createMicroservice(path: string, name: string, addWebFrontend: boolean): Promise<void> {
        await createMicroservice({
            name,
            ui: addWebFrontend,
            targetDirectory: path
        });
        await this.loadFromFolder(path);
    }

    async remove(path: string): Promise<void> {
        this._workspaces = this._workspaces.filter(_ => _.path !== path);
        await this.save();
    }

    async load() {
        const file = this._filesAndFolders.workspaces;
        this._logger.info(`Load registered workspaces from '${file}'`);
        if (this._fileSystem.exists(file)) {
            let missingWorkspaces = false;
            const buffer = await this._fileSystem.readFile(file);
            const workspacesFile = JSON.parse(buffer.toString()) as WorkspacesFile;

            for (const workspaceFolder of workspacesFile.workspaces) {
                if (!this._applicationLoader.existsInFolder(workspaceFolder)) {
                    missingWorkspaces = true;
                } else {
                    await this.loadFromFolder(workspaceFolder);
                }
            }
            if (missingWorkspaces) {
                this._logger.info(`Workspaces are missing - update the file by saving it`);
                await this.save();
            }
        }
    }

    private async loadFromFolder(folder: string): Promise<Workspace> {
        const application = await this._applicationLoader.loadFromFolder(folder);

        let workspace: Workspace;
        const workspaceFilePath = path.join(folder, this._filesAndFolders.dolittleFolder, this._filesAndFolders.workspaceFile);
        if (this._fileSystem.exists(workspaceFilePath)) {
            const workspaceFile = await this.loadWorkspaceFromFile(workspaceFilePath);
            workspace = new Workspace(workspaceFile.id, folder, application);
        } else {
            const workspaceId = Guid.create().toString();
            workspace = new Workspace(workspaceId, folder, application);
        }
        this.addOrUpdateExistingInList(folder, workspace);

        await this.populateMicroservicesFor(workspace, application.microservices);
        workspace.microservicePorts = this._microservicePortsAllocator.allocateFor(workspace);
        await this._renderer.render(workspace);
        this.saveWorkspace(workspaceFilePath, workspace);

        return workspace;
    }

    private addOrUpdateExistingInList(folder: string, workspace: Workspace) {
        const existing = this._workspaces.find(_ => _.path === folder);
        if (!existing) {
            this._logger.info(`Workspace is new`);
            this._workspaces.push(workspace);
        } else {
            this._logger.info(`Workspace already exists`);
            workspace = existing;
        }
    }

    private async loadWorkspaceFromFile(file: string): Promise<WorkspaceFile> {
        const buffer = await this._fileSystem.readFile(file);
        return JSON.parse(buffer.toString()) as WorkspaceFile;
    }

    private async saveWorkspace(file: string, workspace: Workspace) {
        const workspaceFile = this._converter.toFile(workspace);
        const workspaceFileAsJSON = JSON.stringify(workspaceFile, null, 4);
        this._logger.info(`Saving workspace '${file}'`);
        await this._fileSystem.writeFile(file, workspaceFileAsJSON);
    }

    private makeSureRootExists() {
        const root = this._filesAndFolders.root;
        if (!this._fileSystem.exists(root)) {
            this._fileSystem.mkdir(root);
        }
    }

    private async save() {
        const file = this._filesAndFolders.workspaces;
        const workspacesFile: WorkspacesFile = {
            workspaces: this._workspaces.map(_ => _.path)
        };
        const serialized = JSON.stringify(workspacesFile, null, 4);
        await this._fileSystem.writeFile(file, serialized);
    }
}

