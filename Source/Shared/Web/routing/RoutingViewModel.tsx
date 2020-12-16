// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { MicroserviceConfiguration } from '@shared/web/MicroserviceConfiguration';
import { IMessenger } from '@shared/MVVM';
import { injectable } from 'tsyringe';
import { NavigatedTo } from './NavigatedTo';

@injectable()
export class RoutingViewModel {
    currentPath: string;

    navigated!: (path: string) => void;

    constructor(readonly microserviceConfiguration: MicroserviceConfiguration, private readonly _messenger: IMessenger) {
        this.currentPath = microserviceConfiguration.prefix;
        _messenger.subscribeTo(NavigatedTo, _ => {
            const actualPath = `/_${_.path}`;
            console.log(`Navigated to ${actualPath}`);
            this.navigated?.(actualPath);
        });
    }

    activate() {

    }
}
