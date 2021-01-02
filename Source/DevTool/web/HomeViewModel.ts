// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { injectable, inject } from 'tsyringe';
import { IApplicationLog, IApplicationLogToken } from '../common';
import { FeatureNavigationDefinition, ToolbarItems } from './components';

@injectable()
export class HomeViewModel {

    constructor(@inject(IApplicationLogToken) private readonly _applicationLog: IApplicationLog,
        private readonly _navigation: FeatureNavigationDefinition,
        private readonly _toolbarItems: ToolbarItems) { }

    activate() {
        this._navigation.setLinks([]);
        this._toolbarItems.setItems([]);
    }

    start() {
        this._applicationLog.start();
    }

    stop() {
        this._applicationLog.stop();
    }
}
