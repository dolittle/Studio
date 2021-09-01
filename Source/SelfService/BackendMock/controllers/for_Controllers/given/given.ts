// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as sinon from 'ts-sinon';
import { Logger } from 'winston';
import { Controllers } from '../../Controllers';
import { IController } from '../../IController';


export default {
    a_controller: (baseRoute: string): IController => {
        return {
            baseRoute,
            registerRoutes: sinon.default.stub()
        }
    },
    controllers: (...controllers: IController[]) => new Controllers(controllers, sinon.stubInterface<Logger>()),
    no_controllers: () => new Controllers([], sinon.stubInterface<Logger>()),
};
