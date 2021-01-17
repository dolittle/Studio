// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ILogger } from '@dolittle/vanir-backend';
import sinon from 'sinon';

export const FakeLogger: ILogger = {
    error: sinon.fake(),
    warn: sinon.fake(),
    help: sinon.fake(),
    data: sinon.fake(),
    info: sinon.fake(),
    debug: sinon.fake(),
    prompt: sinon.fake(),
    http: sinon.fake(),
    verbose: sinon.fake(),
    input: sinon.fake(),
    silly: sinon.fake()
};
