// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import fs from 'fs';
import path from 'path';
import { IWorkspaces, Workspace } from '../../common/workspaces';
import { injectable } from 'tsyringe';
import { Application, Microservice } from '@dolittle/vanir-common';
import { homedir } from 'os';
import { createApplication } from 'create-dolittle-app/dist/creation';
import { createMicroservice } from 'create-dolittle-microservice/dist/creation';
import { MicroservicePorts } from '../../common/workspaces/MicroservicePorts';
import { WorkspaceRenderer } from './WorkspaceRenderer';
import { ILogger } from '@dolittle/vanir-backend';
import { Guid } from '@dolittle/rudiments';

export type WorkspaceFile = {
    path: string;
    ports: MicroservicePorts[];
};

const DOLITTLE_ROOT = '.dolittle';
const WORKSPACES_FILE = 'workspaces.json';

@injectable()
export class Workspaces implements IWorkspaces {
    private _workspaces: Workspace[] = [];

    constructor(private readonly _renderer: WorkspaceRenderer, private readonly _logger: ILogger) {
        this.makeSureRootExists();
    }

    async addFromPath(source: string): Promise<void> {
        await this.loadFromPath(source);
        await this.save();
    }

    async populateMicroservicesFor(workspace: Workspace, paths: string[]) {
        this._logger.info(`Populate microservices for workspace at ${workspace.path}`);
        workspace.clear();
        for (const relativePath of paths) {
            const microservicePath = path.join(workspace.path, relativePath, 'microservice.json');
            this._logger.info(`Load microservice information from ${microservicePath}`);
            if (fs.existsSync(microservicePath)) {
                this._logger.info(`Microservice exists`);
                const buffer = await fs.promises.readFile(microservicePath);
                const microservice = JSON.parse(buffer.toString()) as Microservice;
                this._logger.info(`Microservice with id '${microservice.id}' is loaded`);
                workspace.microservices.push(microservice);
            } else {
                this._logger.info(`Microservice does not exist`);
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
        await this.loadFromPath(path);
    }

    async remove(path: string): Promise<void> {
        this._workspaces = this._workspaces.filter(_ => _.path !== path);
        await this.save();
    }

    private async loadFromPath(source: string): Promise<boolean> {
        const applicationPath = path.join(source, 'application.json');
        this._logger.info(`Load application from ${applicationPath}`);
        if (fs.existsSync(applicationPath)) {
            const buffer = await fs.promises.readFile(applicationPath);
            const application = JSON.parse(buffer.toString()) as Application;
            const workspaceId = Guid.create().toString();
            let workspace = new Workspace(workspaceId, source, application);
            const existing = this._workspaces.find(_ => _.path === source);
            if (!existing) {
                this._logger.info(`Workspace is new`);
                this._workspaces.push(workspace);
            } else {
                this._logger.info(`Workspace already exists`);
                workspace = existing;
            }
            await this.populateMicroservicesFor(workspace, application.microservices);
            this.setupMicroservicePortsFor(workspace);
            await this._renderer.render(workspace);
            return true;
        }

        return false;
    }

    private getWorkspaceFilePath() {
        return path.join(this.getRoot(), WORKSPACES_FILE);
    }

    private getRoot() {
        return path.join(homedir(), DOLITTLE_ROOT);
    }

    private makeSureRootExists() {
        const root = this.getRoot();
        if (!fs.existsSync(root)) {
            fs.mkdirSync(root);
        }
    }

    private setupMicroservicePortsFor(workspace: Workspace) {
        const microservices: Microservice[] = [];

        const portal = workspace.microservices.find(_ => _.id === workspace.application.portal.id);
        if (portal) {
            microservices.push(portal);
        }
        microservices.push(...workspace.microservices.filter(_ => _.id !== workspace.application.portal.id));

        workspace.microservicePorts = microservices.map((_, index) => new MicroservicePorts(
            _.id,
            3001 + index,
            9001 + index,
            50052 + (index * 2),
            9701 + index));
    }

    async load() {
        const file = this.getWorkspaceFilePath();
        this._logger.info(`Load registered workspaces`);
        if (fs.existsSync(file)) {
            let missingWorkspaces = false;
            const buffer = await fs.promises.readFile(file);
            const workspaces = JSON.parse(buffer.toString()) as WorkspaceFile[];
            for (const workspace of workspaces) {
                this._logger.info(`Load workspace located at ${workspace.path}`);
                const exists = await this.loadFromPath(workspace.path);
                if (!exists) {
                    this._logger.info(`Workspace is missing`);
                    missingWorkspaces = true;
                } else {
                    const loaded = this._workspaces.find(_ => _.path === workspace.path);
                    if (loaded) {
                        loaded.microservicePorts = workspace.ports;
                    }
                }
            }

            if (missingWorkspaces) {
                this._logger.info(`Workspaces are missing - update the file by saving it`);
                await this.save();
            }
        }
    }

    private async save() {
        const file = this.getWorkspaceFilePath();
        const workspaces = this._workspaces.map(_ => {
            return {
                id: _.id,
                path: _.path,
                ports: _.microservicePorts
            } as WorkspaceFile;
        });
        const serialized = JSON.stringify(workspaces, null, 4);
        await fs.promises.writeFile(file, serialized);
    }
}
