// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IMessenger } from '@shared/mvvm';
import { NavigatedTo } from '@shared/web';
import { injectable } from 'tsyringe';
import { BeforeNavigation } from './BeforeNavigation';

@injectable()
export class TopLevelMenuViewModel {
    constructor(private readonly _messenger: IMessenger) {
    }

    doMagic() {
        this._messenger.publish(new NavigatedTo('/_/applications/something'));
    }

    beforeNavigating() {
        this._messenger.publish(new BeforeNavigation());
    }
}
