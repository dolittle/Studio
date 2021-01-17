// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import sinon from 'sinon';
import { IFileSystem } from './IFileSystem';

export function CreateFakeFileSystem(): sinon.SinonStubbedInstance<IFileSystem> {
    return {
        exists: sinon.stub(),
        mkdir: sinon.stub(),
        readFile: sinon.stub(),
        writeFile: sinon.stub()
    };
}
