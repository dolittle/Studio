// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IMessenger } from '@shared/mvvm';
import { injectable } from 'tsyringe';
import { Navigation, NavigationGroup, NavigationActionBarForMessage, NavigationButtonWasClicked } from '@shared/portal';

@injectable()
export class NavigationViewModel {
    groups: NavigationGroup[] = [];
    actionBar?: NavigationActionBarForMessage;

    constructor(
        private readonly _navigation: Navigation,
        private readonly _messenger: IMessenger
    ) {
        _navigation.onChanged(
            (groups: NavigationGroup[], actionBar?: NavigationActionBarForMessage) => {
                console.log('Portal/Web/NavigationViewModel: Handling NavigationChanged');
                this.groups = groups;
                this.actionBar = actionBar;
            }
        );
    }

    navActionButtonClicked() {
        console.log('Portal/Web/NavigationViewModel: Clicked');
        console.log('Portal/Web/NavigationViewModel: Publishing NavigationButtonWasClicked');
        this._messenger.publish(new NavigationButtonWasClicked());
    }

}
