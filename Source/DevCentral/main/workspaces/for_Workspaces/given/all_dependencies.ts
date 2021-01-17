// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import sinon from 'sinon';
import { IFileSystem, FakeLogger } from '../../../infrastructure';
import { ILogger } from '@dolittle/vanir-backend';
import { CreateFakeFileSystem } from '../../../infrastructure/FakeFileSystem';

export class all_dependencies {
    fileSystem: sinon.SinonStubbedInstance<IFileSystem>;
    logger: ILogger;
    workspaceConverter = {
        fromFile: sinon.stub(),
        toFile: sinon.stub()
    };
    workspaceRenderer = {
        render: sinon.stub()
    };
    filesAndFolders = {
        root: '',
        workspaces: '',
        applicationFile: 'application.json',
        microserviceFile: 'microservice.json',
        workspaceFile: 'workspace.json',
        dolittleFolder: '.dolittle'
    };
    applicationLoader = {
        existsInFolder: sinon.stub(),
        loadFromFolder: sinon.stub()
    };
    microserviceLoader = {
        existsInFolder: sinon.stub(),
        loadFromFolder: sinon.stub()
    };
    microservicePortsAllocator = {
        allocateFor: sinon.stub()
    };

    constructor() {
        this.fileSystem = CreateFakeFileSystem();
        this.logger = FakeLogger;
    }
}
