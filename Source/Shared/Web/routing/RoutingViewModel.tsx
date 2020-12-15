// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { MicroserviceConfiguration } from '@shared/web/MicroserviceConfiguration';
import { IMessenger } from '@shared/MVVM';
import { injectable } from 'tsyringe';
import { NavigatedTo } from './NavigatedTo';

@injectable()
export class RoutingViewModel {
    currentPath: string;

    callback!: (path: string) => void;

    constructor(readonly microserviceConfiguration: MicroserviceConfiguration, private readonly _messenger: IMessenger) {
        this.currentPath = microserviceConfiguration.prefix;
        _messenger.subscribeTo(NavigatedTo, _ => {
            console.log(`Navigated to ${_.path}`);
            this.callback?.(_.path);
            //this.currentPath = _.path;
        });
    }

    activate() {

    }
}
