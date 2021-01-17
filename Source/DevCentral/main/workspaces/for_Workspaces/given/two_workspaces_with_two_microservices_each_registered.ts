// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { two_workspaces_registered } from './two_workspaces_registered';
import * as path from 'path';

export class two_workspaces_with_two_microservices_each_registered extends two_workspaces_registered {

    firstApplicationFirstMicroservicePath = 'first/app/first/microservice';
    firstApplicationSecondMicroservicePath = 'first/app/second/microservice';
    secondApplicationFirstMicroservicePath = 'second/app/first/microservice';
    secondApplicationSecondMicroservicePath = 'second/app/second/microservice';

    firstApplicationFirstMicroservice: any = { id: 'cdb97df2-6547-453c-b81d-6dbe4e7833c8' };
    firstApplicationSecondMicroservice: any = { id: '54f8f703-efc9-4b6f-a1a2-e04efe8fe249' };
    secondApplicationFirstMicroservice: any = { id: '849e179e-e794-485b-938f-773b07d3eb18' };
    secondApplicationSecondMicroservice: any = { id: 'c19894f1-a77c-4603-b179-66586256e0db' };

    constructor() {
        super();

        this.firstApplication.microservices = [
            this.firstApplicationFirstMicroservicePath,
            this.firstApplicationSecondMicroservicePath
        ];

        this.secondApplication.microservices = [
            this.secondApplicationFirstMicroservicePath,
            this.secondApplicationSecondMicroservicePath
        ];

        const firstAppFirstMSPath = path.join(this.workspacesFileContent.workspaces[0], this.firstApplicationFirstMicroservicePath);
        this.microserviceLoader.existsInFolder.withArgs(firstAppFirstMSPath).returns(true);
        this.microserviceLoader.loadFromFolder.withArgs(firstAppFirstMSPath).returns(this.firstApplicationFirstMicroservice);

        const firstAppSecondMSPath = path.join(this.workspacesFileContent.workspaces[0], this.firstApplicationSecondMicroservicePath);
        this.microserviceLoader.existsInFolder.withArgs(firstAppSecondMSPath).returns(true);
        this.microserviceLoader.loadFromFolder.withArgs(firstAppSecondMSPath).returns(this.firstApplicationSecondMicroservice);

        const secondAppFirstMSPath = path.join(this.workspacesFileContent.workspaces[1], this.secondApplicationFirstMicroservicePath);
        this.microserviceLoader.existsInFolder.withArgs(secondAppFirstMSPath).returns(true);
        this.microserviceLoader.loadFromFolder.withArgs(secondAppFirstMSPath).returns(this.secondApplicationFirstMicroservice);

        const secondAppSecondMSPath = path.join(this.workspacesFileContent.workspaces[1], this.secondApplicationSecondMicroservicePath);
        this.microserviceLoader.existsInFolder.withArgs(secondAppSecondMSPath).returns(true);
        this.microserviceLoader.loadFromFolder.withArgs(secondAppSecondMSPath).returns(this.secondApplicationSecondMicroservice);
    }
}
