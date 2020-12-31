// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import Docker from 'dockerode';

import { ApplicationRunState, ApplicationStatus, IApplications } from '../../common/applications';
import { injectable } from 'tsyringe';

@injectable()
export class Applications implements IApplications {

    constructor(private readonly _docker: Docker) {

    }

    async getStatusFor(id: string): Promise<ApplicationStatus> {
        const containers = await this._docker.listContainers({
            filters: {
                label: [`dolittle=\"${id}\"`]
            }
        });

        return {
            runState: ApplicationRunState.stopped,
            containers
        };
    }
}