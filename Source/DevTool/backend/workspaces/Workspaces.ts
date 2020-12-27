// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import fs from 'fs';
import path from 'path';
import { IWorkspaces, Workspace } from '../../common/workspaces';
import { injectable } from 'tsyringe';

export type Application = {
    name: string;
};

@injectable()
export class Workspaces implements IWorkspaces {
    private _workspaces: Workspace[] = [];

    constructor() {
    }

    async addFromPath(source: string): Promise<void> {
        const applicationPath = path.join(source, 'application.json');
        if (fs.existsSync(applicationPath)) {
            const buffer = await fs.promises.readFile(applicationPath);
            const application = JSON.parse(buffer.toString()) as Application;
            this._workspaces.push(new Workspace(application.name, source));
        }
    }

    async getAll(): Promise<Workspace[]> {
        return this._workspaces;
    }
}