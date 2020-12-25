// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IMessenger } from '@dolittle/vanir-web';
import { INavigator, NavigatedTo } from '@dolittle/vanir-web';
import { injectable } from 'tsyringe';
import { BeforeNavigation } from './BeforeNavigation';

@injectable()
export class TopLevelMenuViewModel {
    constructor(private readonly _navigator: INavigator, private readonly _messenger: IMessenger) {
    }


    beforeNavigating() {
        this._messenger.publish(new BeforeNavigation());
    }
}
