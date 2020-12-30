// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import fs from 'fs';
import path from 'path';
import { IWorkspaces, Workspace } from '../../common/workspaces';
import { injectable } from 'tsyringe';
import { Application, Microservice } from '@dolittle/vanir-common';
import { homedir } from 'os';
import { createApplication } from 'create-dolittle-app/dist/creation';

export type WorkspaceFile = {
    path: string;
};

const DOLITTLE_ROOT = '.dolittle';
const WORKSPACES_FILE = 'workspaces.json';

@injectable()
export class Workspaces implements IWorkspaces {
    private _workspaces: Workspace[] = [];

    constructor() {
    }

    async addFromPath(source: string): Promise<void> {
        await this.loadFromPath(source);
        await this.save();
    }

    async populateMicroservicesFor(workspace: Workspace, paths: string[]) {
        for (const relativePath of paths) {
            const microservicePath = path.join(workspace.path, relativePath, 'microservice.json');
            const buffer = await fs.promises.readFile(microservicePath);
            const microservice = JSON.parse(buffer.toString()) as Microservice;
            workspace.microservices.push(microservice);
        }
    }

    async getAll(): Promise<Workspace[]> {
        if (this._workspaces.length === 0) {
            await this.load();
        }
        return this._workspaces;
    }

    async create(path: string, name: string, tenant: string, license: string, containerRegistry: string, portal: boolean): Promise<void> {
        createApplication({
            name,
            tenant,
            license,
            containerRegistry,
            portal,
            targetDirectory: path
        });
    }

    async createMicroservice(workspace: Workspace, name: string, addWebFrontend: boolean): Promise<void> {
        throw new Error('Method not implemented.');
    }

    private async loadFromPath(source: string) {
        const applicationPath = path.join(source, 'application.json');
        if (fs.existsSync(applicationPath)) {
            const buffer = await fs.promises.readFile(applicationPath);
            const application = JSON.parse(buffer.toString()) as Application;
            const workspace = new Workspace(source, application);
            this._workspaces.push(workspace);
            await this.populateMicroservicesFor(workspace, application.microservices);
        }
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

    private async load() {
        const file = this.getWorkspaceFilePath();
        if (fs.existsSync(file)) {
            const buffer = await fs.promises.readFile(file);
            const workspaces = JSON.parse(buffer.toString()) as WorkspaceFile[];
            for (const workspace of workspaces) {
                await this.loadFromPath(workspace.path);
            }
        }
    }

    private async save() {
        const file = this.getWorkspaceFilePath();
        const workspaces = this._workspaces.map(_ => { return { path: _.path } as WorkspaceFile; });
        const serialized = JSON.stringify(workspaces);
        await fs.promises.writeFile(file, serialized);
    }
}